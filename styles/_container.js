import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({

    containerthis:{
      flex: 1,
      backgroundColor: '#ffff',
    },

    containerSub1:{    
      marginTop:0,         
    },

    container2:{
      marginTop:20,
      marginLeft:16,
      marginRight:30
    },

    container3:{
      alignItems:'center',
      marginBottom:75,
  
    },

    containerSub2:{
      marginTop:20,
      height:300,
      width:360,
      backgroundColor:'white',
      borderRadius:10,
      borderWidth:2,
      borderColor:'#F6CF3F',
      shadowColor: '#AAAAAA',
      shadowOffset: { width: 3, height: 3 },
      shadowOpacity: 1.0,
      shadowRadius: 5,
      elevation: 5,
    },
    
    containerSub2_1:{
      flexDirection:'row',
      alignItems:'center',
      paddingLeft:60,
  
    },

    containerSub2_2:{
      flexDirection:'column',
      backgroundColor:'#F6CF3F',
      borderRadius:10,
      height:"55%",
      width:"95%",  
      alignItems:'center',
      position:'relative',
      marginLeft:'2.5%',
      marginTop:'2%'
    },
    
    containerSub3:{
      flexDirection:'row',
      marginTop:30,
      height:275,
      width:360,
      backgroundColor:'white',
      borderRadius:10,
      borderWidth:2,
      borderColor:'#F6CF3F',
      shadowColor: '#AAAAAA',
      shadowOffset: { width: 3, height: 3 },
      shadowOpacity: 1.0,
      shadowRadius: 5,
      elevation: 5,
    },

    infoBox:{
      flexDirection:'column',
      marginRight:20
    },

    infoBox2:{
      flexDirection:'column',
      alignItems:'center'
    },

    infoBox3:{
      flexDirection:'column',
      alignContent:'center',
      marginStart:100
    },

    infoBox4:{
      flexDirection:'column'
    },

    buttomButtons:{
      alignContent:'center',
      flexDirection:"row",
      flex:0,
      width:'100%',
      justifyContent:'center'
    },

    buttomSubButtons:{
      flex:0,
      width:'50%'
    },

    buttomSubButtons2:{
      flex:0,
      width:'40%'
    },

    buttomSubButtons3:{
    width:'10%'
    },
    
    containerBookButton: {
      position:'absolute',
      bottom:0,
      alignSelf:'center',
      width:'100%',
      height:'8%',
      backgroundColor: 'pink',
      alignItems: 'center',
      justifyContent: 'center',
    },

    containerTimer:{
      height:'25%',
      width:'90%',
      alignSelf:'center',
      justifyContent:'center',
      flexDirection:'column'
    },

    timerSubCont1:{
      width:'100%',
      height:'65%',
      flexDirection:'row',
      justifyContent:'center'

    },

    timerSubCont2:{
      width:'100%',
      height:'25%',
      flexDirection:'row',
      justifyContent:'center'
    },

    timeCounter:{
      justifyContent:'center',
      height:'95%',
      width:'65%',
      backgroundColor:'white',
      borderWidth:1,
      borderColor:'#F6CF3E',
      borderRadius:3,
      flexDirection:'column',
      alignItems:'center'
    },

    timeCounterCont:{
      width:'60%',
      alignItems:'center'
    },

    timerCountHeader:{
      justifyContent:'center',
      fontSize:15,
      fontWeight:'900'
    },

    timeCounterParent:{
      flexDirection:'row'
    },

    timeCounterSub:{
      flexDirection:'column',
      width:'40%'
    },

    blankColTimer:{
      height:'95%',
      width:'3%'
    },

    blankTimerRow:{
      width:'100%',
      height:'5%'
    },

    timerInfoBooking:{
      height:'95%',
      width:'32%',
      backgroundColor:'white',
      borderWidth:1,
      borderColor:'#F6CF3E',
      borderRadius:3,
      flexDirection:'column',
      justifyContent:'center'
    },

    timerInfoBookingSub1:{
      flexDirection:'column',
      height:'45%',
      width:'90%',
      alignSelf:'center',
      borderBottomWidth:1,
      borderBottomColor:'gray'
    },

    timerInfoBookingSub2:{
      flexDirection:'column',
      height:'45%',
      width:'90%',
      alignSelf:'center',
    },

    timerInfoButton:{
      justifyContent:'center',
      height:'95%',
      width:'65%',
      borderWidth:1,
      borderColor:'#F6CF3E',
      borderRadius:5,
      backgroundColor:'#F6CF3E'
    },

})