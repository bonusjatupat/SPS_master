import React, { Component } from 'react';                                                                 
import {AppRegistry,StyleSheet,Text,View,Image,ScrollView, Button, TouchableOpacity, SafeAreaView, StatusBar,Platform} from 'react-native';
import { CancelButton, ReserveButton,CancelPopup, ConfirmPopup} from "../../components/Button";
import Dialog, { SlideAnimation,ScaleAnimation, DialogContent, DialogFooter, DialogButton} from 'react-native-popup-dialog';
import { NavBackButton_Pure} from "../../components/Button";
import Icon from '../../components/Icons';
import styles  from '../../styles';

import { connect } from "react-redux";
import { updateSlotStatus } from "../../actions/parkingAction";
import { insertReservation, updateReserveStatus } from "../../actions/reservationAction";
import { updateUserBalance } from '../../actions/userAccountAction';

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
      per:this.props.currentParking.data.price.paid.per,
      free:this.props.currentParking.data.price.free.hour,
      location: this.props.currentParking.data.address.description,//--------pass address

      bookingID: this.props.reservation.data._id,//a random id not same as the previous in database
      floor: this.props.reservation.data.floor,//------pass floor num
      spaceNo: this.props.reservation.data.slotNumber,//database get random space
      bookingTime: this.props.reservation.data.reservationInfo.time,
      arrivalTime: this.props.reservation.data.arrivalTime,

      visible: false,
      isCanceled: false,
      timerActive: this.props.navigation.state.params.timerActive,
      isUnbooking: false,
      isArrive: false,
      isTractionSuccess: false,
      isConfirmUnbooking: false,
      showPrice:false,
      reserve15min: false,
      unBookingText: ""
    };

    this.confirmReservation = this.confirmReservation.bind(this);
    this.cancelReservation = this.cancelReservation.bind(this);
    this.checkFloor = this.checkFloor.bind(this);
    this.renderButtons=this.renderButtons.bind(this);
  }

  componentDidMount() {
    //{Object.keys(this.props.reservation.data).length > 0 ? this.setState({timerActive:true}) : this.setState({timerActive:false})}
  }

  confirmReservation(){
    insertReservation(this.props.reservation.data);

    var slotInfo = {
      slot: {
        slotSensor: false,
        slotBarrier: {
          green: false,
          red: true,
          blue: false
        }
      }
    }
    updateSlotStatus(this.props.currentParking.data._id, this.props.reservation.data.slotID, slotInfo);

    this.setState({ visible: false });
    this.props.navigation.navigate('MainMaps');
  }

  cancelReservation(){
    this.props.dispatch({ type: 'FETCH_RESERVATION_FULFILLED', payload: {} });

    this.setState({ isCanceled: false }); 
    this.props.navigation.navigate('FloorDetail');
  }

  onPressArrive(){
    var status = "success"
    updateReserveStatus(this.props.reservation.data._id, this.props.userAccount.data._id, status);
    updateUserBalance(this.props.userAccount.data._id, this.props.reservation.data.price);

    var slotInfo = {
      slot: {
        slotSensor: false,
        slotBarrier: {
          green: false,
          red: false,
          blue: true
        }
      }
    }
    updateSlotStatus(this.props.currentParking.data._id, this.props.reservation.data.slotID, slotInfo);
    
    this.props.dispatch({ type: 'FETCH_RESERVATION_FULFILLED', payload: {} });
    this.props.dispatch({ type: 'FETCH_PARKING_FULFILLED', payload: {} });

    this.setState({
      isArrive: false,
      isTractionSuccess: true
    });
  }

  onPressUnbooking(){
    var reserveHour = parseInt(this.props.reservation.data.reservationInfo.time.substring(0,2));
    var reserveMin = parseInt(this.props.reservation.data.reservationInfo.time.substring(3,5));
    console.log("reserve hour " + reserveHour + " reservare min " + reserveMin);
    var currentHour = parseInt(new Date().getHours());
    var currentMin = parseInt(new Date().getMinutes());
    console.log("current hour " + currentHour + " current min " + currentMin);
    
    var text = "";
    if(reserveHour == currentHour && currentMin - reserveMin > 2){
      text = "You have been booking more than 15 minutes. You will be charged follow by the parking price rate. Do you want to confirm unbooking the space?";
      this.setState({
        reserve15min: true
      })
    }else if(reserveHour != currentHour && (60 - reserveMin) + currentMin > 2){
      text = "You have been booking more than 15 minutes. You will be charged follow by the parking price rate. Do you want to confirm unbooking the space?";
      this.setState({
        reserve15min: true
      })
    }else{
      test = "You are cancelling the space within 15 minutes. You willnot be charged. Do you want to confirm unbooking the space?";
    }

    this.setState({
      unBookingText: text,
      isUnbooking: true
    })
  }

  onPressConfirmUnbooking(){
    var status = "cancel"
    updateReserveStatus(this.props.reservation.data._id, this.props.userAccount.data._id, status);

    if(this.state.reserve15min){
      updateUserBalance(this.props.userAccount.data._id, this.props.reservation.data.price);
    }

    var slotInfo = {
      slot: {
        slotSensor: false,
          slotBarrier: {
            green: true,
            red: false,
            blue: false
          }
        }
    }
    updateSlotStatus(this.props.currentParking.data._id, this.props.reservation.data.slotID, slotInfo);

    this.props.dispatch({ type: 'FETCH_RESERVATION_FULFILLED', payload: {} });
    this.props.dispatch({ type: 'FETCH_PARKING_FULFILLED', payload: {} });

    this.setState({
      isUnbooking: false,
      isConfirmUnbooking: true
    });
  }

  checkFloor(temp){
    if(temp==1){
      return(
        <View style={{flexDirection:"row"}}>
          <Text style={styles.text.floorNumber}>{this.state.floor}</Text>
          <Text style={styles.text.floorNumberSuffix}>st</Text>
        </View>
      );
    }else if(temp==2){
      return(
        <View style={{flexDirection:"row"}}>
          <Text style={styles.text.floorNumber}>{this.state.floor}</Text>
          <Text style={styles.text.floorNumberSuffix}>nd</Text>
        </View>
      );
    }else if(temp==3){
      return(
        <View style={{flexDirection:"row"}}>
          <Text style={styles.text.floorNumber}>{this.state.floor}</Text>
          <Text style={styles.text.floorNumberSuffix}>rd</Text>
        </View>
      );
    }else{
      return(
        <View style={{flexDirection:"row"}}>
          <Text style={styles.text.floorNumber}>{this.state.floor}</Text>
          <Text style={styles.text.floorNumberSuffix}>th</Text>
        </View>
      );
    }
  }

  renderButtons(){
    if(this.state.timerActive){
      return (
        <View style={styles.container.bottomButtons}>
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity style={styles.container.buttomSubButtons}>
          <ReserveButton style={{width:'100%'}}  onPress={()=>{{this.setState({ isArrive: true })}}} > 
            <Text style={styles.button.modalSubmit__text}>ARRIVE</Text>
            {//onPress={()=>{this.setState({visible:true})}}
            }
          </ReserveButton>
        </TouchableOpacity>

        <TouchableOpacity style={styles.container.buttomSubButtons}>
          <CancelButton style={{ width:'100%'}} onPress={()=>{{this.onPressUnbooking()}}}> 
            <Text  style={styles.button.modalSubmit__text}>UNBOOKING</Text>
            {//onPress={()=>{this.setState({isCanceled:true})}}
            }
          </CancelButton>
        </TouchableOpacity>
        </View>
      </View>
      );
    }
    else{
      return(
        <View style={styles.container.bottomButtons}>
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity style={styles.container.buttomSubButtons}>
          <ReserveButton style={{width:'100%'}}> 
            <Text onPress={()=>{{this.confirmReservation()}}} style={styles.button.modalSubmit__text}>CONFIRM</Text>
            {//onPress={()=>{this.setState({visible:true})}}
            }
          </ReserveButton>
        </TouchableOpacity>

        <TouchableOpacity style={styles.container.buttomSubButtons}>
          <CancelButton style={{ width:'100%'}}> 
            <Text onPress={()=>{{this.cancelReservation()}}} style={styles.button.modalSubmit__text}>CANCEL</Text>
            {//onPress={()=>{this.setState({isCanceled:true})}}
            }
          </CancelButton>
        </TouchableOpacity>
        </View>
      </View>
      );
    }
  }

  render() {
    return (
    <SafeAreaView 
      forceInset={{ top: "never", bottom: "never" }}
      style={styles.global.whiteScreen}
    >
      <StatusBar barStyle={Platform.OS == "ios" ? "dark-content" : "light-content"} />
    
     <ScrollView style={{height:'100%', width:'100%'}}>  
       <View style={{height:'100%', width:'100%', marginTop:Platform.OS == "ios" ? "15%" : "0%"}}>  

         <View style={styles.container.container2}>
            <View style={{flexDirection:'column', width:'75%'}}>
                  <Text style={styles.text.bookingID}>Booking ID: {this.state.bookingID}</Text>
                  <Text style={styles.text.userName}>{this.state.userName}</Text>
                  <Text style={styles.text.content}>{this.state.content}</Text>
            </View>
            <View style={{width:'25%',height:'100%'}}>
              <Image style={styles.image.carIcon} source={require('../../assets/a/car.png')}/>
            </View>
         </View>

          <View style={styles.container.container3}>
            
            <View style={styles.container.containerSub2}>

              <View style={styles.container.infoBox}>
                <Text style={styles.text.parkingLot}>{this.state.parkingLot}</Text>
                <TouchableOpacity onPress={()=>{{this.setState({ showPrice: true })}}} style={{backgroundColor:'#f6ab05', borderRadius:10, marginLeft:"1%", height:'95%',width:'20%', alignItems:'center'}}>
                  <Text style={styles.text.spacePrice}>{this.state.price}</Text>
                </TouchableOpacity>
              </View>
                
              <View style={styles.container.containerSub2_1}>
                  <View style={styles.container.infoBox2}>
                    <Text style={styles.text.bookingTitle}>Booking Time</Text>
                    <Text style={styles.text.bookingTime}>{this.state.bookingTime}</Text>
                  </View>
                  <View style={{justifyContent:'center',alignSelf:'center',width:'10%', height:'100%'}}>
                    <Image style={{width: 20, height: 20, alignSelf:'center'}}source={require('../../assets/a/dot-and-circle.png')}/>
                  </View>
                  <View style={styles.container.infoBox2}>
                    <Text style={styles.text.arrivalTitle}>Arrival Time</Text>
                    <Text style={styles.text.arrivalTime}>{this.state.arrivalTime}</Text>
                  </View>
              </View>

              <View style={styles.container.containerSub2_2}>
              <View style={{justifyContent:'center',alignItems:'center',alignSelf:'center'}}>
                <Image style={{width:"10%", height: '10%', position:'absolute', alignSelf:'center', rotation:90}}source={require('../../assets/a/arrow.png')}/>
                <Image style={{width: "3%", height: '5%', position:'absolute', alignSelf:'center'}}source={require('../../assets/a/dot.png')}/>
                <Image style={{width: "10%", height: '10%', position:'absolute', alignSelf:'center', rotation:90}}source={require('../../assets/a/arrow.png')}/>
              </View>
                  <Text style={styles.text.preLocation}>Your space is located at</Text>
                  <View style={{flexDirection:'row', height:'70%', width:'90%'}}>
                    <View style={styles.container.infoBox3}> 
                      {this.checkFloor(this.state.floor)}
                      <Text style={styles.text.floorLabel}>Floor</Text>
                    </View>

                    <View style={{width:'4%', height:'100%', flexDirection:'column'}}>
                      <View style={{width:'50%', flexGrow:3, height:'30%' , borderRightColor:'black', borderRightWidth:1}}/>
                      <View style={{justifyContent:'center', flexGrow:2, alignItems:'center'}}>
                        <Icon.FontAwesome name="circle" size={10} color="black" style={{height:'30%',width:'100%'}}/>
                      </View>
                      <View style={{width:'50%', height:'30%',flexGrow:3, borderRightColor:'black', borderRightWidth:1}}></View>
                    </View>

                    <View style={styles.container.infoBox3}>
                      <Text style={{fontSize:50, marginTop:15, alignSelf:'center', color:'#000000'}}>{this.state.spaceNo}</Text>
                      <Text style={{fontSize:20, marginTop:10, alignSelf:'center',color:'#000000'}}>Slot No</Text>
                    </View>
                  </View>
              </View>

            </View>

            <View style={styles.container.containerSub3}>  
            <View style={{flexDirection:'row'}}>  
              <View style={{width:'15%'}}>        
                <Image style={{marginTop:15,width: 70, height: 70, marginLeft:0}}source={require('../../assets/a/locationIcon.png')}/>
              </View>
              <View style={{width:'5%'}}/>
              <View style={styles.container.infoBox4}>
                <Text style={{fontSize:15, marginTop:15, color:'#c2c2c2'}}>Location</Text>
                <Text style={{fontSize:17, marginTop:5, color:'#555555',maxWidth:275}}>{this.state.location}</Text>
              </View>
            </View>
              <Image style={{width: '85%', height: '60%', alignSelf:'center'}}source={require('../../assets/a/centralworld.png')}/>
            </View>

        </View>
      </View> 
    </ScrollView>

      {this.renderButtons()}

      <Dialog visible={this.state.isArrive}
              dialogAnimation={new ScaleAnimation()}
              width='70%'
              footer={<View style={{alignSelf:'center', border:'hidden'}}>

                        <View  style={{alignContent:'center',flexDirection:"row",flex:0, justifyContent:'center'}}>

                          <View style={styles.container.buttomSubButtons2}>
                            <ConfirmPopup style={{borderRadius:10}} onPress={()=>{{this.onPressArrive()}}}> 
                              <Text  style={styles.button.modalSubmit__text}>CONFIRM</Text>
                            </ConfirmPopup>
                          </View>

                          <View  style={styles.container.buttomSubButtons3}></View>

                          <View style={styles.container.buttomSubButtons2}>
                            <CancelPopup style={{borderRadius:10}} onPress={()=>{this.setState({isArrive:false})}}> 
                              <Text  style={styles.button.modalSubmit__text}>CANCEL</Text>
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
                <Text style={{color: '#f6ab05', textAlign: 'center', alignSelf:'center',fontSize:17,fontWeight:'bold',width:'80%'}}>Do you want to open the gate?</Text>
              </View>                            
            </DialogContent>

      </Dialog>
      <Dialog visible={this.state.isUnbooking}
              width='70%'
              dialogAnimation={new ScaleAnimation()}
              footer={<View style={{alignSelf:'center', border:'hidden'}}>
                        <View  style={{alignContent:'center',flexDirection:"row",flex:0, justifyContent:'center'}}>

                        <View style={styles.container.buttomSubButtons2}>
                            <ConfirmPopup style={{borderRadius:10}}> 
                              <Text onPress={()=>{{this.onPressConfirmUnbooking()}}} style={styles.button.modalSubmit__text}>CONFIRM</Text>
                            </ConfirmPopup>
                          </View>

                          <View  style={styles.container.buttomSubButtons3}></View>

                          <View style={styles.container.buttomSubButtons2}>
                            <CancelPopup style={{borderRadius:10}}> 
                              <Text onPress={()=>{this.setState({isUnbooking:false})}} style={styles.button.modalSubmit__text}>CANCEL</Text>
                            </CancelPopup>
                          </View>

                        </View>             
                      </View>}>
        <DialogContent style={{backgroundColor:'#f6ab05',height:'5%'}}></DialogContent> 

        <DialogContent style={{width:"100%"}}>
            <View style={{flex:0,width:'100%'}}>     
              {
                //<Image style={{marginTop:'-9%',width: 60, height: 60, alignSelf:'center'}}source={require('../assets/car.png')}/>                           
              }
              <Text style={{color: '#f6ab05', textAlign: 'center', alignSelf:'center',fontSize:17,fontWeight:'bold',width:'80%'}}>Do you want to unbook the space?</Text>
            </View>                            
        </DialogContent> 

        </Dialog>

        <Dialog visible={this.state.isTractionSuccess}
              width='70%'
              dialogAnimation={new ScaleAnimation()}
              footer={<View style={{alignSelf:'center', border:'hidden'}}>
                        <View  style={{alignContent:'center',flexDirection:"row",flex:0, justifyContent:'center'}}>

                        <View style={styles.container.buttomSubButtons2}>
                            <ConfirmPopup style={{borderRadius:10}}> 
                              <Text onPress={()=>{{this.setState({ isTractionSuccess: false }); this.props.navigation.navigate('MainMaps');}}} style={styles.button.modalSubmit__text}>OK</Text>
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
              <Text style={{color: '#f6ab05', textAlign: 'center', alignSelf:'center',fontSize:17,fontWeight:'bold',width:'80%'}}>Thank you! Your transaction is successful.</Text>
            </View>                            
        </DialogContent> 

        </Dialog>


        <Dialog visible={this.state.isConfirmUnbooking}
              width='70%'
              dialogAnimation={new ScaleAnimation()}
              footer={<View style={{alignSelf:'center', border:'hidden'}}>
                        <View  style={{alignContent:'center',flexDirection:"row",flex:0, justifyContent:'center'}}>

                        <View style={styles.container.buttomSubButtons2}>
                            <ConfirmPopup style={{borderRadius:10}}> 
                              <Text onPress={()=>{{this.setState({ isConfirmUnbooking: false }); this.props.navigation.navigate('MainMaps');}}} style={styles.button.modalSubmit__text}>OK</Text>
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
              <Text style={{color: '#f6ab05', textAlign: 'center', alignSelf:'center',fontSize:17,fontWeight:'bold',width:'80%'}}>Your booking is canceled.</Text>
            </View>                            
        </DialogContent> 

        </Dialog>

        <Dialog visible={this.state.showPrice}
              width='70%'
              dialogAnimation={new ScaleAnimation()}
              footer={<View style={{alignSelf:'center', border:'hidden'}}>
                        <View  style={{alignContent:'center',flexDirection:"row",flex:0, justifyContent:'center'}}>

                        <View style={styles.container.buttomSubButtons2}>
                            <ConfirmPopup style={{borderRadius:10}}> 
                              <Text onPress={()=>{{this.setState({ showPrice: false });}}} style={styles.button.modalSubmit__text}>OK</Text>
                            </ConfirmPopup>
                          </View>

                        </View>             
                      </View>}>
        <DialogContent style={{backgroundColor:'#f6ab05',justifyContent:'center', height:'5%'}}>
              <Text style={{color: 'white', textAlign: 'center', alignSelf:'center',fontSize:16,fontWeight:'bold',width:'100%', marginTop:'10%'}}>Price Info</Text>
        </DialogContent> 

        <DialogContent style={{width:"100%"}}>
            <View style={{flex:0,width:'100%'}}>     
              {
                //<Image style={{marginTop:'-9%',width: 60, height: 60, alignSelf:'center'}}source={require('../assets/car.png')}/>                           
              }
              <View style={{width:'100%', flexDirection:'column', justifyContent:'space-around'}}>
                <View style={{flexDirection:'row', height:10}}>
                  
                </View>
                <View style={{flexDirection:'row'}}>
                  <Text style={{color: '#f6ab05', alignSelf:'flex-start',fontSize:14,fontWeight:'bold',width:'30%'}}>Parking Lot : </Text>
                  <Text style={{color: 'black', alignSelf:'flex-start',fontSize:14,fontWeight:'bold',width:'60%'}}>{this.state.parkingLot}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                  <Text style={{color: '#f6ab05',  alignSelf:'flex-start',fontSize:14,fontWeight:'bold',width:'30%'}}>Free: </Text>
                  <Text style={{color: 'black',  alignSelf:'flex-start',fontSize:14,fontWeight:'bold',width:'60%'}}>{this.state.free} {this.state.free==0 ? 'None' :null}{this.state.free==1 ? "hour":"hours"}</Text>
                </View>

                <View style={{flexDirection:'row'}}>
                  <Text style={{color: '#f6ab05',  alignSelf:'flex-start',fontSize:14,fontWeight:'bold',width:'30%'}}>Price : </Text>
                  <Text style={{color: 'black',  alignSelf:'flex-start',fontSize:14,fontWeight:'bold',width:'60%'}}>{this.state.price} per {this.state.per}</Text>
                </View>
              </View>
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
    reservation: state.reservation,
    parking: state.parking
  };
};

export default connect(mapStateToProps)(ReservationDetail);