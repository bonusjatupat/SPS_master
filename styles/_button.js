import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    gold: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#F6CF3F',
        borderWidth: 1
    },
    gold__text: {
        fontFamily: Platform.OS == 'ios' ? 'Avenir' : '',
        fontSize: 13,
        fontWeight: '900',
        textAlign: 'center',
        color: '#F6CF3F',
        backgroundColor: 'transparent'
    },
    fb: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#3b5998"
    },
    fb__text: {
        fontFamily: Platform.OS == 'ios' ? 'Avenir' : '',
        fontSize: 13,
        fontWeight: '900',
        textAlign: 'center',
        color: '#FFFFFF'
    },
    gl: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#f44336"
    },
    gl__text: {
        fontFamily: Platform.OS == 'ios' ? 'Avenir' : '',
        fontSize: 13,
        fontWeight: '900',
        textAlign: 'center',
        color: '#FFFFFF'
    },
    gold_inline__text: {
        fontFamily: Platform.OS == 'ios' ? 'Avenir' : '',
        color: '#F6CF3F',
        fontWeight: '900',
        backgroundColor: 'transparent'
    },
    modalSubmit: {
        height: 50,
        backgroundColor: '#ACACAC'
    },
    modalSubmit__placeholder: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalSubmit__text: {
        fontFamily: Platform.OS == 'ios' ? 'Avenir' : '',
        fontWeight: '900',
        fontSize: 15,
        color: '#FFFFFF',
        textAlign: 'center',
        backgroundColor: 'transparent'
    },
    modalLogOut: {
        height: 50,
        backgroundColor: '#FFFFFF'
    },
    modalLogOut__placeholder: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalLogOut__text: {
        fontFamily: Platform.OS == 'ios' ? 'Avenir' : '',
        fontWeight: '900',
        fontSize: 15,
        color: '#FF0000',
        textAlign: 'center',
        backgroundColor: 'transparent'
    },
    modalExit: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 99
    },
    parkingSuggest: {
        width: '100%',
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        position: 'absolute',
        bottom: 0,
        zIndex: 90,
        shadowOffset: { width: 0, height: -4 },
        shadowColor: '#000000',
        shadowOpacity: 0.15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    parkingSuggest__text: {
        marginTop: 10,
        color: '#4A4A4A',
        fontWeight: 'bold'
    },
    parkingSuggest__closeBtn: {
        width: 50,
        height: 50,
        borderColor: '#FFFFFF',
        borderWidth: 2,
        borderRadius: 25,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    parkingDetails__detailButton: {
        backgroundColor: '#417505',
        borderRadius: 5,
        padding: 8,
        alignItems: 'center'
    },
    parkingDetails__detailButton_text: {
        color: '#FFFFFF',
        fontSize: 9,
        fontWeight: 'bold',
        backgroundColor: 'transparent'
    },
    locateButton: {
        width: 40,
        height: 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 10,
        bottom: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        shadowOffset: { width: 0, height: 0 },
        shadowColor: '#000000',
        shadowOpacity: 0.15,
    },
    mapCtrlGroup: {
        width: 40,
        height: 100,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        alignItems: 'center'
    },
    mapCtrlGroup__traffic: {
        width: 40,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mapCtrlGroup__locate: {
        width: 40,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    whiteShadowButton: {
        height: 40,
        paddingHorizontal: 20, 
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        shadowOffset: { width: 0, height: 5 },
        shadowColor: '#000000',
        shadowOpacity: 0.05,
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    whiteShadowButton__text: {
        color: '#9B9B9B',
        fontSize: 14,
        fontWeight: 'bold'
    },
    defaultButton: {
        height: 50,
        paddingHorizontal: 20,
        backgroundColor: '#F5A623',
        borderRadius: 25,
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    defaultButton__text: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold'
    },
    orangeLink__text: {
        fontWeight: 'bold',
        color: '#F5A623'
    }
});