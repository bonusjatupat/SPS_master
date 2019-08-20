import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    signUp: {
        paddingTop: 70,
        alignItems: 'center'
    },
    signUp__profile: {
        width: 100,
        height: 100,
        borderRadius: 80,
        backgroundColor: '#ACACAC',
        borderColor: '#FFFFFF',
        borderWidth: 3,
        position: 'absolute',
        top: 20,
        overflow: 'hidden',
        zIndex: 98
    },
    signUp__profileChange_button: {
        width: 30,
        height: 30,
        backgroundColor: '#828282',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 85,
        right: '38%',
        zIndex: 99
    },
    signUp__wrapper: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        marginBottom: 50,
        flex: 0
    },
    bottomContent: {
        width: '100%', 
        position: 'absolute', 
        bottom: 0, 
        left: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        overflow: 'hidden'
    }
});