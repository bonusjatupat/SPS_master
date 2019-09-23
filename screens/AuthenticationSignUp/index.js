import _CONFIG from '../../misc/config';
import { validateEmail } from '../../misc/utils';

import React, { Component } from 'react';
import { 
    Animated,
    Text, 
    View, 
    Image, 
    ScrollView,
    SafeAreaView,
    TextInput,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Keyboard,
    KeyboardAvoidingView
} from 'react-native';
import { Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import axios from 'axios';

import { DefaultButton } from '../../components/Button';
import { DefaultTextInput } from '../../components/TextField';
import { Seperator } from '../../components/General';
import { AlertBox } from '../../components/AlertBox';

import styles from '../../styles';
const screen = Dimensions.get("window");

class AuthenticationSignUpScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    constructor(props) {
        super(props);
        this.state = {
            emailTxt: '',
            emailTxt__wrong: null,
            errorVisible: false,
            errorMessage: ''
        }

        this._renderErrorMessage = this._renderErrorMessage.bind(this);
        this.onPressNext = this.onPressNext.bind(this);
    }

    onPressNext() {
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

        if (error < 1) {
            axios.post(`${_CONFIG.API_ENDPOINT_URL}/authen/signup/email_exists`, { email: this.state.emailTxt }, null)
                .then((response) => {
                    console.log(response.data.found);
                    if (response.data.found) {
                        this.setState({ errorVisible: true, errorMessage: 'This email is found in system.' });
                    } else {
                        this.props.navigation.navigate('AuthenticationSignUpFinal', { email: this.state.emailTxt });
                    }
                })
                .catch((error) => {
                    this.setState({ errorVisible: true, errorMessage: 'Failed while check email exists.' });
                });
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
        const { navigate, goBack } = this.props.navigation;

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
                    <KeyboardAvoidingView behavior="padding">
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={{ width: '100%', height: '100%' }}>
                                <ScrollView style={{ width: '100%', height: screen.height - 50, padding: 20 }} keyboardShouldPersistTaps="always">
                                    {this._renderErrorMessage()}
                                    <TextInput 
                                        style={[styles.form.defaultInput, { marginBottom: 20 }, this.state.emailTxt__wrong]} 
                                        placeholder="Email address"
                                        placeholderTextColor="#515151"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        value={this.state.emailTxt}
                                        secureTextEntry={false}
                                        underlineColorAndroid="transparent"
                                        blurOnSubmit={false}
                                        returnKeyType={'done'}
                                        onSubmitEditing={() => { this.onPressNext(); }}
                                        onChangeText={(text) => { this.setState({ emailTxt: text }); }} />
                                    <DefaultButton onPress={this.onPressNext}>
                                        <Text style={styles.button.defaultButton__text}>Next</Text>
                                    </DefaultButton>
                                </ScrollView>
                                <View style={{ width: '100%', height: 50, flex: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderTopColor: '#E4E4E4', borderTopWidth: 1 }}>
                                    <Text style={{ color: '#9B9B9B' }}>Already have an account? </Text>
                                    <TouchableOpacity onPress={() => goBack()}>
                                        <Text style={styles.button.orangeLink__text}>Sign In</Text>
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
        userAccount: state.userAccount,
        authenModal: state.authenModal
	}
}
export default connect(mapStateToProps)(AuthenticationSignUpScreen);