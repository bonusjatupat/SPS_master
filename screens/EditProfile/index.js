import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    StatusBar,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import { BoxShadow } from 'react-native-shadow';
import { ImagePicker } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import { DefaultButton } from '../../components/Button';

import styles from '../../styles';

import { NavBackButton, NavEditButton, NavBackButton_Pure } from '../../components/Button';

const GLOBAL_SHADOW_SETTING = {
    color: '#000000',
    border: 10,
    opacity: 0.05,
    x: 0,
    y: 4
};
class EditProfileScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Profile',
        headerStyle: styles.navbar.white_noborder,
        headerTitleStyle: styles.navbar.white__title,
        headerLeft: <NavBackButton_Pure title="BACK" onPress={() => navigation.navigate('Home')} />
    });

    constructor(props) {
        super(props);
        this.state = {
            nameTxt: '',
            emailTxt: '',
            nameTxt__wrong: null,
            emailTxt__wrong: null,
            internalProfileImagePath: '',
            errorVisible: false,
            errorMessage: ''
        }

        this.inputs = {};

        this.focusNextField = this.focusNextField.bind(this);
        this._renderUserProfileImage = this._renderUserProfileImage.bind(this);

        this.onPressPickImage = this.onPressPickImage.bind(this);
        this.onPressSaveChanges = this.onPressSaveChanges.bind(this);
        this.onPressFacebookButton = this.onPressFacebookButton.bind(this);
        this.onPressGoogleButton = this.onPressGoogleButton.bind(this);

        this.syncWithFacebook = this.syncWithFacebook.bind(this);
        this.syncWithGoogle = this.syncWithGoogle.bind(this);
    }

    componentDidMount() {
        if (Object.keys(this.props.userAccount.data).length != 0) {
            if (this.props.userAccount.data.local) {
                this.setState({
                    nameTxt: this.props.userAccount.data.personalInfo.name,
                    emailTxt: this.props.userAccount.data.local.email
                });
            }
        }
    }

    focusNextField(id) {
        this.inputs[id].focus();
    }

    _renderUserProfileImage() {
        return (
            <BoxShadow setting={{
                width: 80,
                height: 80,
                radius: 40,
                ...GLOBAL_SHADOW_SETTING
            }}>
                <TouchableOpacity style={styles.global.editProfileImage} onPress={this.onPressProfile}>
                    {this.props.userAccount.data.personalInfo.photo ? (
                        <Image source={{ uri: this.props.userAccount.data.personalInfo.photo }} style={styles.global.editProfileImage__image} resizeMode="cover" />
                    ) : (
                        <Image source={require('../../assets/person.jpg')} style={styles.global.editProfileImage__image} resizeMode="cover" />
                    )}
                    <TouchableOpacity style={styles.global.editProfileImage__changeBtn} onPress={this.onPressPickImage}>
                        <Ionicons name="md-camera" size={12} color="#FFFFFF" />
                    </TouchableOpacity>
                </TouchableOpacity>
            </BoxShadow>
        );
    }

    async onPressPickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1]
        });

        console.log(result);

        if(!result.cancelled) {
            this.setState({ internalProfileImagePath: result.uri });
        }
    }

    onPressSaveChanges() {
        // Submit edit profile
    }

    onPressFacebookButton() {
        if (this.props.userAccount.data.facebook) {
            // Disconnect with Facebook
        } else {
            // Connect with Facebook
        }
    }

    onPressGoogleButton() {
        if (this.props.userAccount.data.google) {
            // Disconnect with Google
        } else {
            // Connect with Google
        }
    }

    async syncWithFacebook() {
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1929478230416328', {
            permissions: ['email', 'public_profile']
        });
        if (type === 'success') {
            const response = await fetch(`https://graph.facebook.com/me?fields=id,first_name,last_name,picture,email&access_token=${token}`);
            const fbData = await response.json();

            this.props.dispatch(facebookLogIn({
                id: fbData.id,
                token: token,
                name: fbData.first_name + ' ' + fbData.last_name,
                email: fbData.email,
                photo: fbData.picture.data.url
            }));
            Alert.alert('Connect Successfully', 'Hello, ' + fbData.first_name + ' ' + fbData.last_name, [
                { text: 'OK', onPress: () => { this.props.dispatch({ type: 'CLOSE_AUTHEN_MODAL' }); } }
            ]);
        }
    }

    async syncWithGoogle() {
        try {
            this.props.dispatch({ type: 'CLOSE_AUTHEN_MODAL' });
            const result = await Expo.Google.logInAsync({
                androidClientId: '846026777877-6e2no8btb5re76j5v7frr1lo7k33ja8r.apps.googleusercontent.com',
                iosClientId: '846026777877-ta5vtn679arjh5v35gb6gc3lf38kfkmo.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                this.props.dispatch({ type: 'OPEN_AUTHEN_MODAL' });
                let response = await fetch(`https://www.googleapis.com/userinfo/v2/me`, {
                    headers: { Authorization: `Bearer ${result.accessToken}` }
                });
                const ggData = await response.json();
                this.props.dispatch(googleLogIn({
                    id: ggData.id,
                    token: result.accessToken,
                    name: ggData.given_name + ' ' + ggData.family_name,
                    email: ggData.email,
                    photo: ggData.picture
                }));
                Alert.alert('Connect Successfully', 'Hello, ' + ggData.given_name + ' ' + ggData.family_name, [
                    { text: 'OK', onPress: () => { this.props.dispatch({ type: 'CLOSE_AUTHEN_MODAL' }); } }
                ]);
            }
        } catch(e) {
            Alert.alert('Error', `Failed while login with google.`);
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        
        return (
            <KeyboardAvoidingView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={[styles.global.whiteScreen, { flex: 0, flexDirection: 'column' }]}>
                        <ScrollView style={{ flex: 1, width: '100%' }}>
                            <View style={{ paddingVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                                {this._renderUserProfileImage()}
                            </View>
                            <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
                                <TextInput 
                                    style={[styles.form.defaultInput, { marginBottom: 15 }, this.state.nameTxt__wrong]} 
                                    placeholder="Full name"
                                    placeholderTextColor="#515151"
                                    keyboardType="default"
                                    value={this.state.nameTxt}
                                    underlineColorAndroid="transparent"
                                    blurOnSubmit={false}
                                    returnKeyType={'next'}
                                    ref={(input) => { this.inputs['name'] = input; }}
                                    onSubmitEditing={() => { this.focusNextField('email'); }}
                                    onChangeText={(text) => { this.setState({ nameTxt: text }); }} />
                                <TextInput 
                                    style={[styles.form.defaultInput, this.state.emailTxt__wrong]} 
                                    placeholder="Email address"
                                    placeholderTextColor="#515151"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={this.state.emailTxt}
                                    secureTextEntry={false}
                                    underlineColorAndroid="transparent"
                                    blurOnSubmit={false}
                                    returnKeyType={'next'}
                                    ref={(input) => { this.inputs['email'] = input; }}
                                    onSubmitEditing={() => {  }}
                                    onChangeText={(text) => { this.setState({ emailTxt: text }); }} />
                                <View style={{ paddingVertical: 20 }}>
                                    <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => { navigate('ChangePassword'); }}>
                                        <Text style={styles.button.orangeLink__text}>Change your password</Text>
                                    </TouchableOpacity>
                                </View>
                                <DefaultButton style={{ backgroundColor: '#3B5998', marginBottom: 15 }} onPress={this.onPressFacebookButton}>
                                    <Ionicons style={{ position: 'absolute', left: 25 }} name="logo-facebook" size={20} color="#FFFFFF" />
                                    {this.props.userAccount.data.facebook ? (
                                        <Text style={styles.button.defaultButton__text}>Disconnect with Facebook</Text>
                                    ) : (
                                        <Text style={styles.button.defaultButton__text}>Connect with Facebook</Text>
                                    )}
                                </DefaultButton>
                                <DefaultButton style={{ backgroundColor: '#D34836' }} onPress={this.onPressGoogleButton}>
                                    <Ionicons style={{ position: 'absolute', left: 25 }} name="logo-google" size={20} color="#FFFFFF" />
                                    {this.props.userAccount.data.google ? (
                                        <Text style={styles.button.defaultButton__text}>Disconnect with Google</Text>
                                    ) : (
                                        <Text style={styles.button.defaultButton__text}>Connect with Google</Text>
                                    )}
                                </DefaultButton>
                            </View>
                        </ScrollView>
                        <View style={{ flex: 0, width: '100%', padding: 20 }}>
                            <DefaultButton onPress={this.onPressSaveChanges}>
                                <Ionicons style={{ position: 'absolute', left: 25 }} name="ios-checkmark" size={20} color="#FFFFFF" />
                                <Text style={styles.button.defaultButton__text}>Save changes</Text>
                            </DefaultButton>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = (state) => {
	return {
        userAccount: state.userAccount
	}
}
export default connect(mapStateToProps)(EditProfileScreen);