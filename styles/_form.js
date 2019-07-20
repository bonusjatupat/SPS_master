import { StyleSheet, Platform} from 'react-native';

export default StyleSheet.create({
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
    searchBox: {
        width: '100%',
        zIndex: 4,
        paddingBottom: 15,
        paddingHorizontal: 25
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
    searchBox__field_text: {
        flex: 1,
        paddingHorizontal: 15,
        color: '#989898',
        fontSize: 16,
        fontWeight: 'bold'
    },
    searchBox__focused: {
    },
    searchBox__focused_field: {
        height: 60,
        backgroundColor: '#FFFFFF'
    },
    searchBox__field_clear: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
})