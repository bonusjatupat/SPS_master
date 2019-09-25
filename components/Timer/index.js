import React, { Component } from 'react';
import {Text, View,TouchableOpacity} from 'react-native';
import CountDown from 'react-native-countdown-component';
import styles from '../../styles';
import { withNavigation } from 'react-navigation';
import Dialog, { SlideAnimation,ScaleAnimation, DialogContent, DialogFooter, DialogButton} from 'react-native-popup-dialog';

import { connect } from "react-redux";

export class Timer extends Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    constructor(props){
        super(props);
        this.state = {
            reservation: this.props.reservation,
            currentParking: this.props.currentParking,
            timerActive: true,
        }
        this._renderTimeOut = this._renderTimeOut.bind(this);
    };

    componentWillRecieveProps(nextProps,nextState){
        this.setState({
            reservation: nextProps["reservation"],
            currentParking: nextProps["currentParking"]
        });
    }

    _renderTimeOut(){
        return(
            <Dialog visible={this.state.visible}
            dialogAnimation={new ScaleAnimation()}
            width='70%'
            footer={<View style={{alignSelf:'center', border:'hidden'}}>

                      <View  style={{alignContent:'center',flexDirection:"row",flex:0, justifyContent:'center'}}>

                        <View style={styles.container.buttomSubButtons2}>
                          <TouchableOpacity style={{borderRadius:10}}> 
                            <Text style={styles.button.modalSubmit__text}>CONFIRM</Text>
                          </TouchableOpacity>
                        </View>

                        <View  style={styles.container.buttomSubButtons3}></View>

                        <View style={styles.container.buttomSubButtons2}>
                          <TouchableOpacity style={{borderRadius:10}}> 
                            <Text onPress={()=>{this.setState({visible:false})}} style={styles.button.modalSubmit__text}>CANCEL</Text>
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
                    <Text style={{color: '#f6ab05', textAlign: 'center', alignSelf:'center',fontSize:17,fontWeight:'bold',width:'80%'}}>Do you want to confirm booking the parking space?</Text>
                    </View>                            
                </DialogContent>

            </Dialog>
        );
    }

    render(){
        return (
        <View style={styles.container.containerTimer}>
            <View style={styles.container.blankTimerRow}/>
            <View style={styles.container.timerSubCont1}>
                <View style={styles.container.timeCounter}>
                <Text style={styles.container.timerCountHeader}>Time Remaining</Text>
                    <CountDown
                        size={25}
                        until={60*59+59}
                       // until={60*0+20}
                        onFinish={() => this._renderTimeOut()}
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
                        <Text style={styles.text.infoTimer}>{this.state.reservation.floor}</Text>
                    </View>
                    <View style={styles.container.timerInfoBookingSub2}>
                        <Text style={styles.text.infoTimerHeader}>Slot</Text>
                        <Text style={styles.text.infoTimer}>{this.state.reservation.slotNumber}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.container.timerSubCont2}>
                <TouchableOpacity style={styles.container.timerInfoButton} onPress={()=>{{this.props.navigation.navigate('ReservationDetail',{ timerActive: this.state.timerActive })}}}>
                    <Text style={styles.text.timerInfoButton}>MORE INFORMATION</Text>
                </TouchableOpacity>

                <View style={styles.container.blankColTimer}/>

                <View style={styles.container.timerInfoBooking}>
                    <Text style={styles.text.timerPlace}>{this.state.currentParking.name}</Text>
                </View>
            </View>
        </View>
        )
    }
}
export default withNavigation(Timer);