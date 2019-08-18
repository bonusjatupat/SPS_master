import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    locationListItem: {
        width: '100%',
        height: 70,
        flex: 0,
        flexDirection: 'row',
        marginBottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#F6F6F6'
    },
    locationListItem__details: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1
    },
    locationListItem__details_name: {
        width: '100%',
        fontWeight: 'bold',
        color: '#000000',
        fontSize: 15
    },
    locationListItem__details_address: {
        width: '100%',
        color: '#CBCBCB',
        fontSize: 10
    }
})