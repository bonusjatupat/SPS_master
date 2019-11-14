import React, { Component } from 'react';
import {Text, View,TouchableOpacity} from 'react-native';
import CountDown from 'react-native-countdown-component';
import styles from '../../styles';
import { withNavigation } from 'react-navigation';
import  Modal from 'react-native-modal';
import { addOneMoreHour, updateReserveStatus } from "../../actions/reservationAction";
import { updateUserBalance } from '../../actions/userAccountAction';

export class Timer extends Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    constructor(props){
        super(props);
        this.state = {
            floor: this.props.floor,
            slotNo: this.props.slotNo,
            parkingName: this.props.parkingName,
            bookingID: this.props.bookingID,
            userID: this.props.userID,
            price: this.props.price,
            timerActive: true,
            visible: false,
            confirmVisible: false,
            cancelVisible: false
        }
    };

    componentWillRecieveProps(nextProps,nextState){
        this.setState({
            floor: nextProps["floor"],
            slotNo: nextProps["slotNo"],
            parkingName: nextProps["parkingName"],
            bookingID: nextProps["bookingID"],
            userID: nextProps["userID"],
            price: nextProps["price"]
        });
    }

    onPressConfirm(){
        addOneMoreHour(this.state.bookingID);
        this.setState({
            visible: false,
            confirmVisible: true
        })
    }

    onPressCancel(){
        var status = "cancel"
        updateReserveStatus(this.state.bookingID, this.state.userID, status);
        updateUserBalance(this.state.userID, this.state.price);

        this.props.dispatch({ type: 'FETCH_RESERVATION_FULFILLED', payload: {} });
        this.props.dispatch({ type: 'FETCH_PARKING_FULFILLED', payload: {} });

        this.setState({
            visible: false,
            cancelVisible: true
        })
    }

    _renderTimeOut(){
        this.setState({
            visible: true
        })

        return(
            <Dialog visible={this.state.visible}
            dialogAnimation={new ScaleAnimation()}
            width='70%'
            footer={<View style={{alignSelf:'center', border:'hidden'}}>

                      <View  style={{alignContent:'center',flexDirection:"row",flex:0, justifyContent:'center'}}>

                        <View style={styles.container.buttomSubButtons2}>
                          <TouchableOpacity style={{borderRadius:10}}> 
                            <Text style={styles.button.modalSubmit__text}>YES</Text>
                          </TouchableOpacity>
                        </View>

                        <View  style={styles.container.buttomSubButtons3}></View>

                        <View style={styles.container.buttomSubButtons2}>
                          <TouchableOpacity style={{borderRadius:10}}> 
                            <Text onPress={()=>{this.setState({visible:false})}} style={styles.button.modalSubmit__text}>NO</Text>
                          </TouchableOpacity>
                        </View>

                      </View>             
                    </View>}>
         
                <DialogContent style={{backgroundColor:'#f6ab05',height:'5%'}}></DialogContent> 
                <DialogContent> 
                    <View style={{flex:0}}>     
                    {
                        //<Image style={{marginTop:'-8%',width: 60, height: 60, alignSelf:'center'}}source={require('../assets/car.png')}/>
                    }                          
                    <Text style={{color: '#f6ab05', textAlign: 'center', alignSelf:'center',fontSize:17,fontWeight:'bold',width:'80%'}}>You have exceeded time limit. Do you want to continue booking the space?</Text>
                    </View>                            
                </DialogContent>

            </Dialog>
        );
    }

    render(){
        return (
        <View style={{width:'100%',height:'100%'}}>
        <View style={styles.container.containerTimer}>
            <View style={styles.container.blankTimerRow}/>
            <View style={styles.container.timerSubCont1}>
                <View style={styles.container.timeCounter}>
                <Text style={styles.container.timerCountHeader}>Time Remaining</Text>
                    <CountDown
                        size={25}
                        //until={60*59+59}
                        until={60*0+50}
                        onFinish={() =>  this.setState({visible:true})}
                        digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: 'black'}}
                        digitTxtStyle={{color: 'black'}}
                        timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
                        separatorStyle={{color: 'black'}}
                        timeToShow={['M', 'S']}
                        timeLabels={{m: null, s: null}}
                        showSeparator
                     />
                     <View style={styles.container.timeCounterCont}>
                        <View style={styles.container.timeCounterParent}>
                            <View style={styles.container.timeCounterSub}> 
                                <Text style={styles.text.timerCountText}>Minutes</Text>
                            </View>
                            <View style={styles.container.timeCounterSub}>
                                <Text style={styles.text.timerCountText}>Seconds</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.container.blankColTimer}/>

                <View style={styles.container.timerInfoBooking}>
                    <View style={styles.container.timerInfoBookingSub1}>
                        <Text style={styles.text.infoTimerHeader}>Floor</Text>
                        <Text style={styles.text.infoTimer}>{this.state.floor}</Text>
                    </View>
                    <View style={styles.container.timerInfoBookingSub2}>
                        <Text style={styles.text.infoTimerHeader}>Slot</Text>
                        <Text style={styles.text.infoTimer}>{this.state.slotNo}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.container.timerSubCont2}>
                <TouchableOpacity style={styles.container.timerInfoButton} onPress={()=>{{this.props.navigation.navigate('ReservationDetail',{ timerActive: this.state.timerActive })}}}>
                    <Text style={styles.text.timerInfoButton}>RESERVATION INFO</Text>
                </TouchableOpacity>

                <View style={styles.container.blankColTimer}/>

                <View style={styles.container.timerInfoBooking}>
                    <Text style={styles.text.timerPlace}>{this.state.parkingName}</Text>
                </View>
            </View>
         </View>

            <Modal isVisible={this.state.visible}
                    onSwipeComplete={() => this.setState({ visible: false })}
                    hasBackdrop={true} animationIn='slideInUp' animationOut='slideOutDown'
                    backdropColor='gray'  style={{width:'100%', height:'100%',position:'relative',top:'0%',left:'0%'}}>

                    <View style={{width:'100%', height:'30%',alignItems:'center',marginLeft:-23}}>
                    <View style={{width:'70%', height:'100%', alignSelf:'center',borderRadius:10, backgroundColor:'white'}}>

                        <View style={{backgroundColor:'#f6ab05', height:'20%',width:'100%'}}></View>

                        <View style={{backgroundColor:'white', height:'10%',width:'100%'}}></View>

                        <View style={{backgroundColor:'white', height:'40%',width:'100%', borderBottomColor:'white', borderBottomWidth:1}}>
                            <View style={{flex:0,width:'100%'}}>
                                <Text style={{color: '#f6ab05', textAlign: 'center', alignSelf:'center',fontSize:17,fontWeight:'bold',width:'80%'}}>Reservation time has exceeded. Do you want to book the space for one more hour?</Text>
                            </View>     
                        </View>

                        <View style={{backgroundColor:'white',height:'30%',width:'100%',justifyContent:'center', borderTopColor:'white', borderTopWidth:1}} >  
                        <View style={{height:'80%',width:'90%', flexDirection:'row', justifyContent:'center', alignSelf:'center'}}>

                            <TouchableOpacity style={{width:'40%',height:'100%', backgroundColor:'green', justifyContent:'center'}} onPress={() => {this.onPressConfirm()}}>
                                <Text style={{color:'white', fontSize:15, alignSelf:'center', fontWeight:'bold'}}>CONFIRM </Text>
                            </TouchableOpacity>

                            <View style={{width:'20%',height:'100%'}}></View>

                            <TouchableOpacity style={{width:'40%',height:'100%', backgroundColor:'red', justifyContent:'center'}} onPress={() => {this.onPressCancel()}}>
                                <Text style={{color:'white', fontSize:15, alignSelf:'center',fontWeight:'bold'}}>CANCEL</Text>
                            </TouchableOpacity>

                        </View>
                        </View>    

                    </View>
                    </View>
            </Modal>      

            <Modal isVisible={this.state.confirmVisible}
                    onSwipeComplete={() => this.setState({ confirmVisible: false })}
                    hasBackdrop={true} animationIn='slideInUp' animationOut='slideOutDown'
                    backdropColor='gray'  style={{width:'100%', height:'100%',position:'relative',top:'0%',left:'0%'}}>

                    <View style={{width:'100%', height:'30%',alignItems:'center',marginLeft:-23}}>
                    <View style={{width:'70%', height:'100%', alignSelf:'center',borderRadius:10, backgroundColor:'white'}}>

                        <View style={{backgroundColor:'#f6ab05', height:'20%',width:'100%'}}></View>

                        <View style={{backgroundColor:'white', height:'10%',width:'100%'}}></View>

                        <View style={{backgroundColor:'white', height:'40%',width:'100%', borderBottomColor:'white', borderBottomWidth:1}}>
                            <View style={{flex:0,width:'100%'}}>
                                <Text style={{color: '#f6ab05', textAlign: 'center', alignSelf:'center',fontSize:17,fontWeight:'bold',width:'80%'}}>You have booked the space for one more hour.</Text>
                            </View>     
                        </View>

                        <View style={{backgroundColor:'white',height:'30%',width:'100%',justifyContent:'center', borderTopColor:'white', borderTopWidth:1}} >  
                        <View style={{height:'80%',width:'90%', flexDirection:'row', justifyContent:'center', alignSelf:'center'}}>

                            <TouchableOpacity style={{width:'40%',height:'100%', backgroundColor:'green', justifyContent:'center'}} onPress={() => {this.setState({confirmVisible: false})}}>
                                <Text style={{color:'white', fontSize:15, alignSelf:'center', fontWeight:'bold'}}>OK</Text>
                            </TouchableOpacity>

                        </View>
                        </View>    

                    </View>
                    </View>
            </Modal> 

            <Modal isVisible={this.state.cancelVisible}
                    onSwipeComplete={() => this.setState({ cancelVisible: false })}
                    hasBackdrop={true} animationIn='slideInUp' animationOut='slideOutDown'
                    backdropColor='gray'  style={{width:'100%', height:'100%',position:'relative',top:'0%',left:'0%'}}>

                    <View style={{width:'100%', height:'30%',alignItems:'center',marginLeft:-23}}>
                    <View style={{width:'70%', height:'100%', alignSelf:'center',borderRadius:10, backgroundColor:'white'}}>

                        <View style={{backgroundColor:'#f6ab05', height:'20%',width:'100%'}}></View>

                        <View style={{backgroundColor:'white', height:'10%',width:'100%'}}></View>

                        <View style={{backgroundColor:'white', height:'40%',width:'100%', borderBottomColor:'white', borderBottomWidth:1}}>
                            <View style={{flex:0,width:'100%'}}>
                                <Text style={{color: '#f6ab05', textAlign: 'center', alignSelf:'center',fontSize:17,fontWeight:'bold',width:'80%'}}>Your booking has been canceled.</Text>
                            </View>     
                        </View>

                        <View style={{backgroundColor:'white',height:'30%',width:'100%',justifyContent:'center', borderTopColor:'white', borderTopWidth:1}} >  
                        <View style={{height:'80%',width:'90%', flexDirection:'row', justifyContent:'center', alignSelf:'center'}}>

                            <TouchableOpacity style={{width:'40%',height:'100%', backgroundColor:'green', justifyContent:'center'}} onPress={() => {this.setState({cancelVisible: false})}}>
                                <Text style={{color:'white', fontSize:15, alignSelf:'center', fontWeight:'bold'}}>OK</Text>
                            </TouchableOpacity>

                        </View>
                        </View>    

                    </View>
                    </View>
            </Modal> 

        </View>
        )
    }
}


export default withNavigation(Timer);