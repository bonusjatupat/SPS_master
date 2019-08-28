import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    alert: {
        width: '100%',
        minHeight: 50,
        borderRadius: 25,
        overflow: 'hidden',
        justifyContent: 'center'
    },
    alertSuccess: {
        backgroundColor: '#417505',
        borderColor: '#305505'
    },
    alertWarning: {
        backgroundColor: '#4A90E2',
        borderColor: '#3081DF'
    },
    alertDanger: {
        backgroundColor: '#FF6D7E',
        borderColor: '#FF3951'
    },
    alertDefault: {
        backgroundColor: '#F5A623',
        borderColor: '#D38F1F'
    },
    alert__container: {
        flex: 0,
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    alert__body: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 16
    },
    alert__body_text: {
        backgroundColor: 'transparent',
        color: '#FFFFFF'
    },
    alert__close: {
        flex: 0,
        width: 50,
        height: 50
    },
    alert__closeBtn: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});