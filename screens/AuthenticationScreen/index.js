import React, { Component } from 'react';
import { Text, Input, TextInput,View, Image, ScrollView, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { DefaultButton } from "../../components/Button";
import styles from '../../styles';

class AuthenticationScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null
    })

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={{ backgroundColor: '#FFFFFF', flexDirection: 'column', height: '100%'}}>
                <SafeAreaView forceInset={{ top: 'always' }} />

                <View style={{ width: '100%', height: 50, flex: 0, flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20 }}></View>
                    <TouchableOpacity 
                        style={{ width: 50, height: 50, alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center', flex: 0 }}
                        //onPress={() => {this.props.dispatch({ type: 'CLOSE_AUTHEN_MODAL' })}}>
                    >
                        <Ionicons name="ios-close" size={40} color="#000000" /> 
                    </TouchableOpacity>
                </View>

                <View style={{ width: '100%', flex: 1 }}>
                    <KeyboardAvoidingView behavior="padding">
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={{ width: '100%', height: '100%' }}>
                                <ScrollView style={{ width: '100%', height: '100%' - 50, padding: 20 }} keyboardShouldPersistTaps="always">
                                    <View style={{ width: '100%', marginBottom: 40, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={require('../../assets/logo_typo/logo_typo.png')} />
                                    </View>

                                    <TextInput 
                                        style={[styles.form.defaultInput, { marginBottom: 15 }]} 
                                        placeholder="Email address"
                                        placeholderTextColor="#515151"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        //value={this.state.emailTxt}
                                        secureTextEntry={false}
                                        underlineColorAndroid="transparent"
                                        blurOnSubmit={false}
                                        returnKeyType={'next'}
                                        //ref={(input) => { this.inputs['email'] = input; }}
                                        //onSubmitEditing={() => { this.focusNextField('password'); }}
                                        //onChangeText={(text) => { this.setState({ emailTxt: text }); }} 
                                        />

                                    <TextInput 
                                        style={[styles.form.defaultInput]} 
                                        placeholder="Password"
                                        placeholderTextColor="#515151"
                                        keyboardType="visible-password"
                                        autoCapitalize="none"
                                        //value={this.state.passwordTxt}
                                        secureTextEntry={true}
                                        underlineColorAndroid="transparent"
                                        blurOnSubmit={false}
                                        returnKeyType={'done'}
                                        //ref={(input) => { this.inputs['password'] = input; }}
                                        //onSubmitEditing={() => { this.onPressLocalLogin(); }}
                                        //onChangeText={(text) => { this.setState({ passwordTxt: text }); }} />
                                        />

                                    <View style={{ paddingVertical: 20 }}>
                                        <TouchableOpacity style={{ alignSelf: 'flex-end' }} //onPress={() => navigate('ForgotPassword')}
                                        >
                                            <Text style={styles.button.orangeLink__text}>Forgot Password?</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <DefaultButton //onPress={this.onPressLocalLogin}
                                    >
                                        <Text style={styles.button.defaultButton__text}>Sign In</Text>
                                    </DefaultButton>

                                </ScrollView> 

                                <View style={{ width: '100%', height: 50, flex: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderTopColor: '#E4E4E4', borderTopWidth: 1 }}>
                                    <Text style={{ color: '#9B9B9B' }}>Don't have an account? </Text>
                                    <TouchableOpacity //onPress={() => navigate('AuthenticationSignUp')}
                                    >
                                        <Text style={styles.button.orangeLink__text}>Sign Up</Text>
                                    </TouchableOpacity>
                                </View>
                                <SafeAreaView forceInset={{ bottom: 'always' }} />
                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </View>
            </View>
        )
    }
}

export default AuthenticationScreen;