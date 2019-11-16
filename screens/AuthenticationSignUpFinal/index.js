import _CONFIG from '../../misc/config';

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
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import axios from 'axios';

import { signUpUser } from '../../actions/userAccountAction';

import { DefaultButton } from '../../components/Button';
import { DefaultTextInput } from '../../components/TextField';
import { Seperator } from '../../components/General';
import { AlertBox } from '../../components/AlertBox';

import styles from '../../styles';

class AuthenticationSignUpFinalScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    constructor(props) {
        super(props);
        this.state = {
            email: this.props.navigation.state.params.email,
            nameTxt: '',
            passwordTxt: '',
            nameTxt__wrong: null,
            passwordTxt__wrong: null,
            errorVisible: false,
            errorMessage: ''
        };

        this.inputs = {};

        this.requestSignUp = this.requestSignUp.bind(this);
        this.focusNextField = this.focusNextField.bind(this);
        this._renderErrorMessage = this._renderErrorMessage.bind(this);
        this.onPressSignUp = this.onPressSignUp.bind(this);
    }

    onPressSignUp() {
        var error = 0;
        if (this.state.nameTxt.trim() == '') {
            this.setState({ nameTxt__wrong: styles.form.defaultInput__danger });
            error++;
        } else {
            this.setState({ nameTxt__wrong: null });
        }

        if (this.state.passwordTxt == '') {
            this.setState({ passwordTxt__wrong: styles.form.defaultInput__danger });
            error++;
        } else {
            this.setState({ passwordTxt__wrong: null });
        }

        if (error < 1) {
            this.requestSignUp();
        }
    }

    requestSignUp() {
        var data = {
            name: this.state.nameTxt.trim(),
            email: this.state.email.trim(),
            password: this.state.passwordTxt
        };
        axios.post(`${_CONFIG.API_ENDPOINT_URL}/user/signup`, data, null)
            .then((response) => {
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

    _renderErrorMessage() {
        if (this.state.errorVisible) {
            return (
                <AlertBox type="danger" style={{ marginBottom: 15 }} closeBtn={true} onClosePress={() => { this.setState({ errorVisible: false }); }}>
                    <Text style={styles.alert.alert__body_text}>{this.state.errorMessage}</Text>
                </AlertBox>
            );
        }
    }

    focusNextField(id) {
        this.inputs[id].focus();
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
                                <ScrollView style={{ width: '100%', height: '100%' - 50, padding: 20 }} keyboardShouldPersistTaps="always">
                                    <View style={{ width: '100%', paddingBottom: 40, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 18, marginBottom: 5 }}>Name and Password</Text>
                                        <Text style={{ fontSize: 14 }}>Add your name and password</Text>
                                    </View>
                                    {this._renderErrorMessage()}
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
                                        onSubmitEditing={() => { this.focusNextField('password'); }}
                                        onChangeText={(text) => { this.setState({ nameTxt: text }); }} />
                                    <TextInput 
                                        style={[styles.form.defaultInput, { marginBottom: 20 }, this.state.passwordTxt__wrong]} 
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
                                        onSubmitEditing={() => { this.onPressSignUp(); }}
                                        onChangeText={(text) => { this.setState({ passwordTxt: text }); }} />
                                    <DefaultButton onPress={() => this.onPressSignUp()}>
                                        <Text style={styles.button.defaultButton__text}>Next</Text>
                                    </DefaultButton>
                                </ScrollView>
                                <View style={{ width: '100%', height: 50, flex: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderTopColor: '#E4E4E4', borderTopWidth: 1 }}>
                                    <Text style={{ color: '#9B9B9B' }}>Already have an account? </Text>
                                    <TouchableOpacity onPress={() => navigate('Authentication')}>
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
export default connect(mapStateToProps)(AuthenticationSignUpFinalScreen);