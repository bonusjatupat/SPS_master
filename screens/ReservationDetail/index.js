import React, { Component } from 'react';                                                                 
import {AppRegistry,StyleSheet,Text,View,Image,ScrollView, Button, TouchableOpacity, SafeAreaView, StatusBar} from 'react-native';
import { CancelButton, ReserveButton,CancelPopup, ConfirmPopup} from "../../components/Button";
import Dialog, { SlideAnimation,ScaleAnimation, DialogContent, DialogFooter, DialogButton} from 'react-native-popup-dialog';
import { NavBackButton_Pure} from "../../components/Button";
import styles  from '../../styles';

import { connect } from "react-redux";
import { insertReservation } from "../../actions/reservationAction";

 class ReservationDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Reservation",
    headerStyle: styles.navbar.white,
    headerTitleStyle: styles.navbar.white__title,
    headerLeft: <NavBackButton_Pure title="BACK" onPress={() => navigation.goBack()} />
  });

  constructor(props) {
    super(props);
    this.state = {
      userName: this.props.userAccount.data.personalInfo.name,

      content: "Parkernel x Secure Parking System",
      parkingLot: this.props.currentParking.data.name,
      price: this.props.currentParking.data.price.paid.rate + "฿",//database
      location: this.props.currentParking.data.address.description,//--------pass address

      bookingID: this.props.reservation.data._id,//a random id not same as the previous in database
      floor: this.props.reservation.data.floor,//------pass floor num
      spaceNo: this.props.reservation.data.slotNumber,//database get random space
      bookingTime: this.props.reservation.data.reservationInfo.time,
      arrivalTime: this.props.reservation.data.arrivalTime,

      visible:false,
      isCanceled:false
    };

    this.confirmReservation = this.confirmReservation.bind(this);
    this.cancelReservation = this.cancelReservation.bind(this);
  }

  componentDidMount() {
    /*var that = this;
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    if(min==0 || min<10){
      that.setState({
        bookingTime:
          hours + ':0' + min ,
        arrivalTime:
          (hours+1) + ':0'+min
      });
    }
    else{
      that.setState({
        bookingTime:
          hours + ':' + min ,
        arrivalTime:
          (hours+1) + ':'+min
      });
    }*/
  }

  confirmReservation(){
    insertReservation(this.props.reservation.data);
    {console.log(this.props.currentParking.data.address.location.coordinates[0])}
    this.setState({ visible: false });
    this.props.navigation.navigate('MainMaps');
  }

  cancelReservation(){
    this.props.dispatch({ type: 'FETCH_RESERVATION_FULFILLED', payload: {} });

    this.setState({ isCanceled: false }); 
    this.props.navigation.navigate('ParkingDetail');
  }

  render() {
    return (
    <SafeAreaView
      forceInset={{ top: "always", bottom: "never" }}
      style={styles.global.whiteScreen}
    >
      <StatusBar barStyle={Platform.OS == "ios" ? "dark-content" : "light-content"} />
    
     <ScrollView>  
       <View> 

         <View style={styles.container.container2}>
                <Text style={styles.text.bookingID}>Booking ID: {this.state.bookingID}</Text>
                <Text style={styles.text.userName}>{this.state.userName}</Text>
                <Text style={styles.text.content}>{this.state.content}</Text>
                <Image style={styles.image.carIcon} source={require('../../assets/a/car.png')}/>
         </View>

        <View style={styles.container.container3}>
            <View style={styles.container.containerSub2}>

              <View style={styles.container.infoBox}>
                <Text style={styles.text.parkingLot}>{this.state.parkingLot}</Text>
                <Image style={{width: 38, height: 35, position:'absolute', marginTop:12, marginLeft:250, rotation:90}}source={require('../../assets/a/arrow.png')}/>
                <Image style={{marginTop:35,width: 330, height: 30, position:'absolute', alignSelf:'flex-end'}}source={require('../../assets/a/arrow.png')}/>
                <Text style={styles.text.spacePrice}>{this.state.price}</Text>
              </View>
                
              <View style={styles.container.containerSub2_1}>
                  <View style={styles.container.infoBox2}>
                    <Text style={styles.text.bookingTitle}>Booking Time</Text>
                    <Text style={styles.text.bookingTime}>{this.state.bookingTime}</Text>
                  </View>
                  <Image style={{marginTop:15,width: 20, height: 20, position:'relative',alignSelf:'center',marginStart:25,marginEnd:25}}source={require('../../assets/a/dot-and-circle.png')}/>
                  <View style={styles.container.infoBox2}>
                    <Text style={styles.text.arrivalTitle}>Arrival Time</Text>
                    <Text style={styles.text.arrivalTime}>{this.state.arrivalTime}</Text>
                  </View>
              </View>

              <View style={styles.container.containerSub2_2}>
                <Image style={{width: 40, height: 35, position:'absolute', marginTop:50, marginLeft:250, rotation:90}}source={require('../../assets/a/arrow.png')}/>
                <Image style={{width: 5, height: 5, position:'absolute', marginTop:100, marginLeft:250}}source={require('../../assets/a/dot.png')}/>
                <Image style={{width: 40, height: 35, position:'absolute', marginTop:120, marginLeft:250, rotation:90}}source={require('../../assets/a/arrow.png')}/>
                  <Text style={styles.text.preLocation}>Your space is located at</Text>
                  <View style={{flexDirection:'row'}}>
                    <View style={styles.container.infoBox2}> 
                      <Text style={styles.text.floorNumber}>{this.state.floor}</Text>
                      <Text style={styles.text.floorLabel}>Floor</Text>
                    </View>
                    <View style={styles.container.infoBox3}>
                      <Text style={{fontSize:50,marginLeft:10, marginTop:15, color:'#000000'}}>{this.state.spaceNo}</Text>
                      <Text style={{fontSize:20,marginLeft:10, marginTop:10, color:'#000000'}}>Space No.</Text>
                    </View>
                  </View>
              </View>

            </View>

            <View style={styles.container.containerSub3}>              
              <Image style={{marginTop:15,width: 70, height: 70, marginLeft:0}}source={require('../../assets/a/locationIcon.png')}/>
              <View style={styles.container.infoBox4}>
                <Text style={{flexDirection:'column',fontSize:15, marginTop:15, color:'#c2c2c2'}}>Location</Text>
                <Text style={{fontSize:17, marginTop:5, color:'#555555',maxWidth:275}}>{this.state.location}</Text>
              </View>
              <Image style={{width: '75%', height: '50%', position:'absolute',marginTop:'27%', marginLeft:'15%'}}source={require('../../assets/a/centralworld.png')}/>
            </View>

        </View>
      </View> 
    </ScrollView>

    <View style={styles.container.bottomButtons}>
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity style={styles.container.buttomSubButtons}>
          <ReserveButton style={{width:'100%'}}> 
            <Text onPress={() => {this.setState({ visible: true });}} style={styles.button.modalSubmit__text}>RESERVE</Text>
          </ReserveButton>
        </TouchableOpacity>

        <TouchableOpacity style={styles.container.buttomSubButtons}>
          <CancelButton style={{ width:'100%'}}> 
            <Text onPress={()=>{this.setState({isCanceled:true})}} style={styles.button.modalSubmit__text}>CANCEL</Text>
          </CancelButton>
        </TouchableOpacity>
        </View>
      </View>
      <Dialog visible={this.state.visible}
              dialogAnimation={new ScaleAnimation()}
              width='70%'
              footer={<View style={{alignSelf:'center', border:'hidden'}}>

                        <View  style={{alignContent:'center',flexDirection:"row",flex:0, justifyContent:'center'}}>

                          <View style={styles.container.buttomSubButtons2}>
                            <ConfirmPopup style={{borderRadius:10}}> 
                              <Text onPress={()=>{{this.confirmReservation()}}} style={styles.button.modalSubmit__text}>CONFIRM</Text>
                            </ConfirmPopup>
                          </View>

                          <View  style={styles.container.buttomSubButtons3}></View>

                          <View style={styles.container.buttomSubButtons2}>
                            <CancelPopup style={{borderRadius:10}}> 
                              <Text onPress={()=>{this.setState({visible:false})}} style={styles.button.modalSubmit__text}>CANCEL</Text>
                            </CancelPopup>
                          </View>

                        </View>             
                      </View>}>
           
          <DialogContent style={{backgroundColor:'#f6ab05',height:'5%'}}></DialogContent> 
            <DialogContent> 
              <View style={{flex:0}}>     
                {
                  //<Image style={{marginTop:'-8%',width: 60, height: 60, alignSelf:'center'}}source={require('../assets/car.png')}/>
                }                          
                <Text style={{color: '#f6ab05', textAlign: 'center', alignSelf:'center',fontSize:17,fontWeight:'bold',width:'80%'}}>Do you want to confirm booking the parking space?</Text>
              </View>                            
            </DialogContent>

      </Dialog>
      <Dialog visible={this.state.isCanceled}
              width='70%'
              dialogAnimation={new ScaleAnimation()}
              footer={<View style={{alignSelf:'center', border:'hidden'}}>
                        <View  style={{alignContent:'center',flexDirection:"row",flex:0, justifyContent:'center'}}>

                          <View style={{ width:'60%'}}>
                            <ConfirmPopup style={{borderRadius:10}}> 
                              <Text onPress={()=>{{this.cancelReservation()}}} style={styles.button.modalSubmit__text}>OK</Text>
                            </ConfirmPopup>
                          </View>

                        </View>             
                      </View>}>
        <DialogContent style={{backgroundColor:'#f6ab05',height:'5%'}}></DialogContent> 

        <DialogContent style={{width:"100%"}}>
            <View style={{flex:0,width:'100%'}}>     
              {
                //<Image style={{marginTop:'-9%',width: 60, height: 60, alignSelf:'center'}}source={require('../assets/car.png')}/>                           
              }
              <Text style={{color: '#f6ab05', textAlign: 'center', alignSelf:'center',fontSize:17,fontWeight:'bold',width:'80%'}}>Your booking has been canceled.</Text>
            </View>                            
        </DialogContent> 

        </Dialog>

    </SafeAreaView>
    );
  }
}
AppRegistry.registerComponent('TextInANest', () => TextInANest);

const mapStateToProps = state => {
  return {
    userAccount: state.userAccount,
    currentParking: state.currentParking,
    reservation: state.reservation
  };
};

export default connect(mapStateToProps)(ReservationDetail);