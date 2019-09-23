import _CONFIG from '../../misc/config';
import { validateEmail } from '../../misc/utils';

import React, { Component } from 'react';
import { 
    Animated,
    Alert,
    Text, 
    TextInput,
    View, 
    Image,
    Modal,
    ScrollView,
    SafeAreaView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Keyboard,
    KeyboardAvoidingView,
    Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import axios from 'axios';
import Expo from 'expo';

import { signInUser, facebookLogIn, googleLogIn } from '../../actions/userAccountAction';

import { DefaultButton } from '../../components/Button';
import { DefaultTextInput } from '../../components/TextField';
import { Seperator } from '../../components/General';
import { AlertBox } from '../../components/AlertBox';

import styles from '../../styles';

const screen = Dimensions.get("window");

class AuthenticationScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    constructor(props) {
        super(props);
        this.state = {
            emailTxt: '',
            passwordTxt: '',
            emailTxt__wrong: null,
            passwordTxt__wrong: null,
            errorVisible: false,
            errorMessage: '',
            socialLoginVisible: false
        }

        this.inputs = {};

        this.requestSignIn = this.requestSignIn.bind(this);
        this.focusNextField = this.focusNextField.bind(this);
        this._renderErrorMessage = this._renderErrorMessage.bind(this);
        this.onPressLocalLogin = this.onPressLocalLogin.bind(this);
        this.onPressFacebookLogin = this.onPressFacebookLogin.bind(this);
        this.onPressGoogleLogin = this.onPressGoogleLogin.bind(this);
    }

    onPressLocalLogin() {
        var error = 0;

        // Email Validate
        if (this.state.emailTxt.trim() == '') {
            this.setState({ emailTxt__wrong: styles.form.defaultInput__danger });
            error++;
        } else {
            if (!validateEmail(this.state.emailTxt.trim())) {
                this.setState({ emailTxt__wrong: styles.form.defaultInput__danger });
                error++;
            } else {
                this.setState({ emailTxt__wrong: null });
            }
        }

        // Password Validate
        if (this.state.passwordTxt.trim() == '') {
            this.setState({ passwordTxt__wrong: styles.form.defaultInput__danger });
            error++;
        } else {
            this.setState({ passwordTxt__wrong: null });
        }

        if (error < 1) {
            Keyboard.dismiss();
            this.requestSignIn();
        }
    }

    requestSignIn(){
        var data = {
            email: this.state.emailTxt.trim().toLowerCase(),
            password: this.state.passwordTxt
        }
        axios.get(`${_CONFIG.API_ENDPOINT_URL}/user/${data.email}/${data.password}/signInLocal`, null, null)
            .then((response) => {
                //console.log("response before if : "+ response.data.user.local.email);
                if (response.status == 200) {
                    if (response.data.user) {
                        this.props.dispatch({ type: 'FETCH_USER_ACCOUNT_FULFILLED', payload: response.data.user });
                        this.props.dispatch({ type: 'CLOSE_AUTHEN_MODAL' });
                    } else {
                        if (response.data.error) {
                            this.setState({ errorVisible: true, errorMessage: response.data.error.message });
                        } else {
                            this.setState({ errorVisible: true, errorMessage: 'Error while signing in.' });
                        }
                    }
                } else {
                    this.setState({ errorVisible: true, errorMessage: response.data.error });
                }
            })
            .catch((error) => {
                this.setState({ errorVisible: true, errorMessage: response.data.error });
            });
    }

/*   requestSignIn() {
        var data = {
            email: this.state.emailTxt.trim(),
            password: this.state.passwordTxt
        }
        axios.post(`${_CONFIG.API_ENDPOINT_URL}/authen/signin`, data, null)
            .then((response) => {
                if (response.status == 200) {
                    console.log(response.data);
                    if (response.data.user) {
                        this.props.dispatch({ type: 'FETCH_USER_ACCOUNT_FULFILLED', payload: response.data.user });
                        this.props.dispatch({ type: 'CLOSE_AUTHEN_MODAL' });
                    } else {
                        if (response.data.error) {
                            this.setState({ errorVisible: true, errorMessage: response.data.error.message });
                        } else {
                            this.setState({ errorVisible: true, errorMessage: 'Error while signing in.' });
                        }
                    }
                } else {
                    this.setState({ errorVisible: true, errorMessage: response.data.error });
                }
            })
            .catch((error) => {
                this.setState({ errorVisible: true, errorMessage: response.data.error });
            });
    }*/

    focusNextField(id) {
        this.inputs[id].focus();
    }

    async onPressFacebookLogin() {
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

    async onPressGoogleLogin() {
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

    _renderErrorMessage() {
        if (this.state.errorVisible) {
            return (
                <AlertBox type="danger" style={{ marginBottom: 15 }} closeBtn={true} onClosePress={() => { this.setState({ errorVisible: false }); }}>
                    <Text style={styles.alert.alert__body_text}>{this.state.errorMessage}</Text>
                </AlertBox>
            );
        }
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={{ backgroundColor: '#FFFFFF', flexDirection: 'column', height: '100%' }}>
                <SafeAreaView forceInset={{ top: 'always' }} />
                <View style={{ width: '100%', height: 50, flex: 0, flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20 }}></View>
                    <TouchableOpacity 
                        style={{ width: 50, height: 50, alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center', flex: 0 }}
                        onPress={() => {this.props.dispatch({ type: 'CLOSE_AUTHEN_MODAL' })}}>
                        <Ionicons name="ios-close" size={40} color="#000000" /> 
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', flex: 1 }}>
                    <KeyboardAvoidingView behavior="height">
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={{ width: '100%', height: '100%' }}>
                                <ScrollView style={{ width: '100%', height: screen.height - 50, padding: 20 }} keyboardShouldPersistTaps="always">
                                    <View style={{ width: '100%', marginBottom: 40, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={require('../../assets/logo_typo/logo_typo.png')} />
                                    </View>
                                    {this._renderErrorMessage()}
                                    <TextInput 
                                        style={[styles.form.defaultInput, { marginBottom: 15 }, this.state.emailTxt__wrong]} 
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
                                        onSubmitEditing={() => { this.focusNextField('password'); }}
                                        onChangeText={(text) => { this.setState({ emailTxt: text }); }} />
                                    <TextInput 
                                        style={[styles.form.defaultInput, this.state.passwordTxt__wrong]} 
                                        placeholder="Password"
                                        placeholderTextColor="#515151"
                                        keyboardType="visible-password"
                                        autoCapitalize="none"
                                        value={this.state.passwordTxt}
                                        secureTextEntry={true}
                                        underlineColorAndroid="transparent"
                                        blurOnSubmit={false}
                                        returnKeyType={'done'}
                                        ref={(input) => { this.inputs['password'] = input; }}
                                        onSubmitEditing={() => { this.onPressLocalLogin(); }}
                                        onChangeText={(text) => { this.setState({ passwordTxt: text }); }} />
                                    <View style={{ paddingVertical: 20 }}>
                                        <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => navigate('ForgotPassword')}>
                                            <Text style={styles.button.orangeLink__text}>Forgot Password?</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <DefaultButton onPress={this.onPressLocalLogin}>
                                        <Text style={styles.button.defaultButton__text}>Sign In</Text>
                                    </DefaultButton>
                                    {/*<Seperator style={{ marginVertical: 20 }} text="OR" />
                                    <DefaultButton style={{ backgroundColor: '#3B5998', marginBottom: 15 }} onPress={this.onPressFacebookLogin}>
                                        <Ionicons style={{ position: 'absolute', left: 25 }} name="logo-facebook" size={20} color="#FFFFFF" />
                                        <Text style={styles.button.defaultButton__text}>Connect with Facebook</Text>
                                    </DefaultButton>
                                    <DefaultButton style={{ backgroundColor: '#D34836' }} onPress={this.onPressGoogleLogin}>
                                        <Ionicons style={{ position: 'absolute', left: 25 }} name="logo-google" size={20} color="#FFFFFF" />
                                        <Text style={styles.button.defaultButton__text}>Connect with Google</Text>
                                    </DefaultButton>*/}
                                </ScrollView>
                                <View style={{ width: '100%', height: 50, flex: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderTopColor: '#E4E4E4', borderTopWidth: 1 }}>
                                    <Text style={{ color: '#9B9B9B' }}>Don't have an account? </Text>
                                    <TouchableOpacity onPress={() => navigate('AuthenticationSignUp')}>
                                        <Text style={styles.button.orangeLink__text}>Sign Up</Text>
                                    </TouchableOpacity>
                                </View>
                                <SafeAreaView forceInset={{ bottom: 'always' }} />
                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
	return {
        userAccount: state.userAccoun1t,
        authenModal: state.authenModal
	}
}
export default connect(mapStateToProps)(AuthenticationScreen);