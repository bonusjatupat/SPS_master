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

import { AlertBox } from '../../components/AlertBox';
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
        title: 'Change Password',
        headerStyle: styles.navbar.white_noborder,
        headerTitleStyle: styles.navbar.white__title,
        headerLeft: <NavBackButton_Pure title="BACK" onPress={() => { navigation.goBack() } } />
    });

    constructor(props) {
        super(props);
        this.state = {
            oldPasswordTxt: '',
            newPasswordTxt: '',
            confirmNewPasswordTxt: '',
            oldPasswordTxt__wrong: null,
            newPasswordTxt__wrong: null,
            confirmNewPasswordTxt__wrong: null,
            errorVisible: false,
            errorMessage: ''
        }

        this.inputs = {};

        this.focusNextField = this.focusNextField.bind(this);
        this.onPressSaveChanges = this.onPressSaveChanges.bind(this);
        this._renderErrorMessage = this._renderErrorMessage.bind(this);
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

    onPressSaveChanges() {
        var error = 0;

        // Email Validate
        if (this.state.oldPasswordTxt.trim() == '') {
            this.setState({ oldPasswordTxt__wrong: styles.form.defaultInput__danger });
            error++;
        } else {
            this.setState({ oldPasswordTxt__wrong: null });
        }

        // Password Validate
        if (this.state.newPasswordTxt.trim() == '') {
            this.setState({ newPasswordTxt__wrong: styles.form.defaultInput__danger });
            error++;
        } else {
            this.setState({ newPasswordTxt__wrong: null });
        }

        if (this.state.confirmNewPasswordTxt.trim() == '') {
            this.setState({ confirmNewPasswordTxt__wrong: styles.form.defaultInput__danger });
            error++;
        } else {
            this.setState({ confirmNewPasswordTxt__wrong: null });
        }

        if (error < 1) {
            // Submit
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
        return (
            <KeyboardAvoidingView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={[styles.global.whiteScreen, { flex: 0, flexDirection: 'column' }]}>
                        <ScrollView style={{ flex: 1, width: '100%' }}>
                            <View style={{ padding: 20 }}>
                                <TextInput 
                                    style={[styles.form.defaultInput, { marginBottom: 15 }, this.state.oldPasswordTxt__wrong]} 
                                    placeholder="Current password"
                                    placeholderTextColor="#515151"
                                    keyboardType="visible-password"
                                    autoCapitalize="none"
                                    value={this.state.oldPasswordTxt}
                                    secureTextEntry={true}
                                    underlineColorAndroid="transparent"
                                    blurOnSubmit={false}
                                    returnKeyType={'next'}
                                    ref={(input) => { this.inputs['currentPassword'] = input; }}
                                    onSubmitEditing={() => { this.focusNextField('newPassword'); }}
                                    onChangeText={(text) => { this.setState({ oldPasswordTxt: text }); }} />
                                <TextInput 
                                    style={[styles.form.defaultInput, { marginBottom: 15 }, this.state.newPasswordTxt__wrong]} 
                                    placeholder="New password"
                                    placeholderTextColor="#515151"
                                    keyboardType="visible-password"
                                    autoCapitalize="none"
                                    value={this.state.newPasswordTxt}
                                    secureTextEntry={true}
                                    underlineColorAndroid="transparent"
                                    blurOnSubmit={false}
                                    returnKeyType={'next'}
                                    ref={(input) => { this.inputs['newPassword'] = input; }}
                                    onSubmitEditing={() => { this.focusNextField('confirmNewPassword'); }}
                                    onChangeText={(text) => { this.setState({ newPasswordTxt: text }); }} />
                                <TextInput 
                                    style={[styles.form.defaultInput, this.state.confirmNewPasswordTxt__wrong]} 
                                    placeholder="Confirm new password"
                                    placeholderTextColor="#515151"
                                    keyboardType="visible-password"
                                    autoCapitalize="none"
                                    value={this.state.confirmNewPasswordTxt}
                                    secureTextEntry={true}
                                    underlineColorAndroid="transparent"
                                    blurOnSubmit={false}
                                    returnKeyType={'done'}
                                    ref={(input) => { this.inputs['confirmNewPassword'] = input; }}
                                    onSubmitEditing={() => { this.onPressSaveChanges(); }}
                                    onChangeText={(text) => { this.setState({ confirmNewPasswordTxt: text }); }} />
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