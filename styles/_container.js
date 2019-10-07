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
      marginTop:"3%",
      width:'95%',
      height:'10%',
      paddingLeft:'8%',
      flexDirection:'row'
    },

    container3:{
      alignItems:'center',
      marginBottom:"5%",  
    },

    containerSub2:{
      marginTop:20,
      height:300,
      width: Platform.OS == 'ios' ? '90%' : '85%',
      alignItems:'center',
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
      height:"25%",
      alignSelf:'center',
      justifyContent:'center',
    },

    containerSub2_2:{
      flexDirection:'column',
      backgroundColor:'#F6CF3F',
      borderRadius:10,
      height:"55%",
      width:"90%",  
      alignItems:'center',
      position:'relative',
      marginLeft:'2.5%',
      marginTop:'2%'
    },
    
    containerSub3:{
      flexDirection:'column',
      marginTop:30,
      height:300,
      width:Platform.OS == 'ios' ? '90%' : '85%',
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
      marginTop:'2%',
      flexDirection:'row',
      width:'85%',
      justifyContent:'center',
      borderBottomColor:'black',
      borderBottomWidth:1,
    },

    infoBox2:{
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',
      width:'35%',
      textAlign:'center',
      alignSelf:'center'
    },

    infoBox3:{
      flexDirection:'column',
      alignContent:'center',
      width:'48%',
      alignItems:'center',
      textAlign:'center'
    },

    infoBox4:{
      flexDirection:'column',
      width:'80%'
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
      alignItems: 'center',
      justifyContent: 'center',
    },

    containerTimer:{
      height:'25%',
      width:'75%',
      position:'absolute',
      top:Platform.OS == "ios" ? '25%' : '20%',
      left:'7%',
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
      width:'90%',
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
    }

})