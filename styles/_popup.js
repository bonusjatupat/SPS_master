import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    parkingDetails: {
        width: 200,
        flex: 1,
        position: 'relative'
    },

    parkingDetails__box: {
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        shadowOffset: { width: 0, height: 3 },
        shadowColor: '#000000',
        shadowOpacity: 0.1,
    },

    parkingDetails__header: {
        width: '100%',
        borderRadius: 5,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        overflow: 'hidden'
    },

    parkingDetails__header_text: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFFFFF',
        padding: 10,
        backgroundColor: 'transparent'
    },

    parkingDetails__info: {
        padding: 10
    },

    parkingDetails__info_title: {
        fontSize: 9,
        color: '#818181'
    },

    parkingDetails__info_value: {
        fontSize: 12,
        fontWeight: 'bold'
    },

    parentCont:{
        height:"30%",
        width:"90%",
        borderWidth:2,
        borderRadius:10,
        borderColor:'#f6ab05',

    },

    popupCont: {
        marginTop:20,
        height:200,
        width:360,
        flex:3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        borderColor:'#f6ab05',
        shadowColor: '#000',
    },     
         
    closeButton: {
        color:'green',
        textAlign:'center',
        height:30,
        borderColor:'black'
    }      
});