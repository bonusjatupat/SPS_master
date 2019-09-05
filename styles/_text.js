import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({

    topicText: {
        fontSize: 18,
        textAlign: 'center',
        backgroundColor: 'transparent'
    },

    bookingID:{
        fontSize:15,
        marginLeft:10,
        color:'#c2c2c2'
    },

    userName:{
        fontSize:25,
        marginLeft:10,
        color:'#353535'
    },

    content:{
        fontSize:15,
        fontWeight:'bold',
        marginLeft:10,
        color:'#c2c2c2'
    },

    parkingLot:{
        fontSize:20,
        marginLeft:10,
        marginTop:15,
        color:'#c2c2c2'
    },

    spacePrice:{
        fontSize:35,
        color:'#f6ab05',
        marginTop:4,
        position:'absolute',
        alignSelf:'flex-end'
    },

    bookingTitle:{
        fontSize:15,
        marginLeft:10,
        marginTop:15,
        color:'#000000'
    },

    bookingTime:{
        fontSize:20,
        marginLeft:10,
        marginTop:5,
        color:'#000000'
    },

    arrivalTitle:{
        fontSize:15,
        marginLeft:10,
        marginTop:15,
        color:'#000000'
    },

    arrivalTime:{
        fontSize:20,
        marginLeft:10,
        marginTop:5,
        color:'#000000'
    },

    preLocation:{
        fontSize:13,
        position:'relative',
        marginLeft:10,
        marginTop:15,
        color:'#2f3231'
    },

    floorNumber:{
        fontSize:50,
        marginLeft:10,
        marginTop:15,
        color:'#000000'
    },

    floorLabel:{
        fontSize:20,
        marginRight:10,
        marginTop:10,
        color:'#000000'
    },

    bookButtonText:{
        color:'white',
        alignSelf:'center',
        fontSize:18,
        justifyContent:'center'
    },

    infoTimer:{
        alignSelf:'center',
        fontSize:20,
        fontWeight:'900'
    },

    infoTimerHeader:{
        marginLeft:5,
        fontSize:15,
        fontWeight:'900'
    },

    timerInfoButton:{
        alignSelf:'center',
        fontWeight:'900'
    },

    timerPlace:{
        color:'gray',
        alignSelf:'center',
        fontWeight:'900'
    },

    timerSpace:{
        width:'10%',
        textAlign:'center',
        fontSize:40,
        fontWeight:'900'
    },

    timerCount:{
        fontSize:40,
        fontWeight:'900',
        alignSelf:'center'
    },

    timerCountText:{
        fontSize:15,
        fontWeight:'900',
        alignSelf:'center'
    }
})