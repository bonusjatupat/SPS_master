import React, { Component } from 'react';
import {Text, View,TouchableOpacity} from 'react-native';
import CountDown from 'react-native-countdown-component';
import styles from '../../styles';

export class Timer extends Component {
    static navigationOptions = ({ navigation }) => ({
        header:null
    });
    constructor(props){
        super(props);
    };
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
                        onFinish={() => alert('Finished')}
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
                        <Text style={styles.text.infoTimer}>2</Text>
                    </View>
                    <View style={styles.container.timerInfoBookingSub2}>
                        <Text style={styles.text.infoTimerHeader}>Slot</Text>
                        <Text style={styles.text.infoTimer}>30N</Text>
                    </View>
                </View>
            </View>
            <View style={styles.container.timerSubCont2}>
                <TouchableOpacity style={styles.container.timerInfoButton}>
                    <Text style={styles.text.timerInfoButton}>MORE INFORMATION</Text>
                </TouchableOpacity>

                <View style={styles.container.blankColTimer}/>

                <View style={styles.container.timerInfoBooking}>
                    <Text style={styles.text.timerPlace}>Central World</Text>
                </View>
            </View>
        </View>
        )
    }
}