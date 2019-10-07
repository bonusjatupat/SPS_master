import React, { Component } from 'react';
import {Text, View,TouchableOpacity} from 'react-native';
import CountDown from 'react-native-countdown-component';
import styles from '../../styles';
import { withNavigation } from 'react-navigation';
import  Modal from 'react-native-modal';

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
            visible:false
        }
    };

    componentWillRecieveProps(nextProps,nextState){
        this.setState({
            reservation: nextProps["reservation"],
            currentParking: nextProps["currentParking"]
        });
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
                        until={60*0+20}
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
                    <Text style={styles.text.timerInfoButton}>RESERVATION INFO</Text>
                </TouchableOpacity>

                <View style={styles.container.blankColTimer}/>

                <View style={styles.container.timerInfoBooking}>
                    <Text style={styles.text.timerPlace}>{this.state.currentParking.name}</Text>
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

                            <TouchableOpacity style={{width:'40%',height:'100%', backgroundColor:'green', justifyContent:'center'}} onPress={() => {this.setState({ visible: false });}}>
                                <Text style={{color:'white', fontSize:15, alignSelf:'center', fontWeight:'bold'}}>CONFIRM </Text>
                            </TouchableOpacity>

                            <View style={{width:'20%',height:'100%'}}></View>

                            <TouchableOpacity style={{width:'40%',height:'100%', backgroundColor:'red', justifyContent:'center'}} onPress={() => {this.setState({ visible: false });}}>
                                <Text style={{color:'white', fontSize:15, alignSelf:'center',fontWeight:'bold'}}>CANCEL</Text>
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