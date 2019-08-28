import { StyleSheet, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
    light__input: {
        fontFamily: Platform.OS == 'ios' ? 'Avenir' : '',
        fontSize: 18,
        color: '#FFFFFF', 
        height: 50, 
        borderColor: '#FFFFFF', 
        borderBottomWidth: 1
    },
    default__row: {
        marginBottom: 20
    },
    default__label: {
        fontFamily: Platform.OS == 'ios' ? 'Avenir' : '',
        fontSize: 10,
        fontWeight: '800',
        color: '#6F6F6F',
        width: '100%'
    },
    default__input: {
        fontFamily: Platform.OS == 'ios' ? 'Avenir' : '',
        fontSize: 14,
        borderColor: '#BDBDBD',
        color: '#6F6F6F',
        borderWidth: 2,
        borderRadius: 3,
        padding: 10
    },
    default__static: {
        fontFamily: Platform.OS == 'ios' ? 'Avenir' : '',
        fontSize: 18,
        fontWeight: 'bold',
        borderColor: '#BDBDBD',
        color: '#000000'
    },
    default__checkbox: { 
        backgroundColor: 'transparent', 
        padding: 0,
        marginLeft: 0,
        marginRight: 0,
        paddingLeft: 0,
        paddingRight: 0,
        borderWidth: 0,
        width: '100%'
    },
    default__label_danger: {
        fontFamily: Platform.OS == 'ios' ? 'Avenir' : '',
        fontSize: 10,
        fontWeight: '800',
        color: '#FF0000',
        width: '100%'
    },
    searchBox: {
        width: '100%',
        zIndex: 4,
        paddingBottom: 15,
        paddingHorizontal: 25
    },
    searchBox__focused: {
    },
    searchBox__focused_field: {
        height: 60,
        backgroundColor: '#FFFFFF'
    },
    searchBox__field: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 55,
        paddingLeft: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
    },
    searchBox__field_back: {
        width: 40,
        paddingLeft: 10,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchBox__field_text: {
        flex: 1,
        paddingHorizontal: 15,
        color: '#989898',
        fontSize: 16,
        fontWeight: 'bold'
    },
    searchBox__field_button: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchBox__field_clear: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    defaultInput: {
        height: 50,
        fontSize: 14,
        color: '#4A4A4A',
        borderWidth: 1,
        borderColor: '#E4E4E4',
        borderRadius: 25,
        paddingHorizontal: 20,
        backgroundColor: '#F8F8F8'
    },
    defaultInput__danger: {
        borderColor: '#FF3951'
    },
    defaultSelector: {
        height: 50,
        borderWidth: 1,
        borderColor: '#E4E4E4',
        borderRadius: 25,
        paddingHorizontal: 20,
        backgroundColor: '#F8F8F8'
    },
    defaultSelector__text: {
        fontSize: 14,
        color: '#4A4A4A'
    }
});