import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    container: {
        height: '100%',
        margin: 0,
        backgroundColor: '#FFFFFF'
    },
    wrapper: {
        flex: 1,
        flexDirection: 'column'
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
        paddingBottom: 20,
        backgroundColor: '#F2F2F2'
    },
    header__profile: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center'
    },
    header__profile_image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden'
    },
    header__profile_name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
        backgroundColor: 'transparent',
    },
    header__profile_edit_button: {
        height: 25,
        justifyContent: 'center',
        borderRadius: 13,
        marginTop: 5,
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF'
    },
    menuItemStyle: {
        height: 40
    },
    menuLabelStyle: {
        fontSize: 17
    },
    menuList: {
        flex: 1,
        marginTop: 20
    },
    footer: {
        flex: 0
    },
    footer__text: {
        color: '#4A4A4A',
        fontSize: 10,
        margin: 15
    }
});