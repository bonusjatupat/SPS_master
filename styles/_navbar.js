import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    black: {
        backgroundColor: '#000000',
        shadowOffset:{  width: 0,  height: 3 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        borderBottomWidth: 0
    },
    black__title: {
        fontFamily: Platform.OS == 'ios' ? 'Avenir' : '',
        fontWeight: '800',
        fontSize: 18,
        color: '#F6A800'
    },
    black__button_left: {
        marginLeft: 3
    },
    black__button_left_text: {
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: Platform.OS == 'ios' ? 'Avenir' : '',
        fontWeight: '800',
    },
    black__button_right: {
        marginRight: 3
    },
    black__button_right_text: {
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: Platform.OS == 'ios' ? 'Avenir' : '',
        fontWeight: '800',
    },
    black__alpha: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        position: 'absolute',
        zIndex: 100,
        top: 0,
        left: 0,
        right: 0,
        shadowOffset:{  width: 0,  height: 3 },
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        borderBottomWidth: 0
    },
    black__alpha_logo: {
        top: Platform.OS == 'ios' ? 30 : 18,
        position: 'absolute'
    },
    black__left_burger_button: {
        height: 40,
        width: 40,
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    black__translucent: {
        backgroundColor: Platform.OS == 'ios' ? 'transparent' : 'rgba(0, 0, 0, 0.7)',
        position: 'absolute', 
        top: 0, 
        alignItems: 'center', 
        width: '100%', 
        height: Platform.OS == 'ios' ? 64 : 58,
        shadowOffset:{  width: 0,  height: 3 },
        shadowColor: '#000000',
        shadowOpacity: 0.3,
    },
    white: {
        backgroundColor: '#FFFFFF'
    },
    white_noborder: {
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 0
    },
    white__title: {
        fontSize: 18,
        fontWeight: '900',
        color: '#000000'
    },
    white__button_left: {
        marginLeft: 20
    },
    alpha: {
        backgroundColor: 'transparent',
        position: 'absolute',
        zIndex: 100,
        top: 0,
        left: 0,
        right: 0,
        borderBottomWidth: 0
    }
});