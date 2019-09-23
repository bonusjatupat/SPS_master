import React, { Component } from 'react';
import { 
    Animated,
    Text, 
    View, 
    Image, 
    ScrollView,
    SafeAreaView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Keyboard,
    KeyboardAvoidingView,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { DefaultButton } from '../../components/Button';
import { DefaultTextInput } from '../../components/TextField';
import { Seperator } from '../../components/General';

import styles from '../../styles';

const screen = Dimensions.get("window");
class ForgotPasswordScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null
    });

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
                            <View style={{ height: '100%' }}>
                                <ScrollView style={{ width: '100%', height: screen.height - 50, padding: 20 }}>
                                    <View style={{ width: '100%', paddingBottom: 40, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center' }}>
                                        <View style={{ width: 80, height: 80, marginBottom: 20, borderColor: '#000000', borderWidth: 2, borderRadius: 40, alignItems: 'center', justifyContent: 'center' }}>
                                            <Ionicons name="ios-lock" size={40} color="#000000" />
                                        </View>
                                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>Trouble logging in?</Text>
                                        <Text style={{ fontSize: 12, textAlign: 'center' }}>Enter your email and we’ll send you a link to get back into your account.</Text>
                                    </View>
                                    <DefaultTextInput style={{ marginBottom: 20 }} keyboardType="email-address" autoFocus={false} placeholder="Email address" />
                                    <DefaultButton>
                                        <Text style={styles.button.defaultButton__text}>Send Login Link</Text>
                                    </DefaultButton>
                                </ScrollView>
                                <View style={{ width: '100%', height: 50, flex: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderTopColor: '#E4E4E4', borderTopWidth: 1 }}>
                                    <TouchableOpacity onPress={() => goBack(null)}>
                                        <Text style={styles.button.orangeLink__text}>Back to Login</Text>
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
export default connect(mapStateToProps)(ForgotPasswordScreen);