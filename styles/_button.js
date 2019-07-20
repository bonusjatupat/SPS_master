import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    modalSubmit: {
        height: 50,
        backgroundColor: '#ACACAC',
        bottom: 0
    },
    modalSubmit__text: {
        //fontFamily: Platform.OS == 'ios' ? 'Avenir' : '',
        fontWeight: '900',
        fontSize: 15,
        color: '#FFFFFF',
        textAlign: 'center',
        backgroundColor: 'transparent'
    },
    modalSubmit__placeholder: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    orangeLink__text: {
        fontWeight: 'bold',
        color: '#F5A623'
    },
    defaultButton__text: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold'
    },
    floorButton: {
        width: 60,
        height: 60,
        borderRadius: 5,
        alignItems: 'center',
        left: 30,
        bottom: -30,
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: '#F6CF3F',
        //shadowOffset: { width: 0, height: 0 },
        //shadowColor: '#000000',
        //shadowOpacity: 0.15,
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
    }
    
})