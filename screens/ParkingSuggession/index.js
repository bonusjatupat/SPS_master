import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    Platform
} from 'react-native';
import Button from 'react-native-button'
import { connect } from 'react-redux';
import { BlurView } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';

import { ItemParking } from '../../components/ListItem';
import styles from '../../styles';

import { idealSolution } from '../../misc/ranking';

class ParkingSuggession extends Component {
     constructor(props) {
        super(props);

        this.state = {
            isRanking: false,
            parkingData: []
        }
    }

    componentDidMount() {
        if (this.props.parking.data) {
            let ranked = idealSolution(this.props.parking.data);
            this.setState({
                parkingData: ranked
            });
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View 
                    style={{ 
                        height: '100%', 
                        backgroundColor: Platform.OS == 'ios' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.7)'
                    }}>
                    <ScrollView style={{ margin: 20, height: '100%', overflow: 'hidden', marginTop: 50, marginBottom: 90, zIndex: 90 }}>
                        {this.state.parkingData.length > 0 ?
                            this.state.parkingData.map((item, key) =>
                                <ItemParking key={item.id} itemData={item} onPress={() => {
                                    this.props.navigation.navigate('ParkingDetail', item._id);
                                    this.props.onClosePress();
                                 }} />
                            )
                        : null}
                    </ScrollView>
                    <View style={{
                        position: 'absolute',
                        width: '100%',
                        height: 90,
                        paddingTop: 20,
                        paddingBottom: 20,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 90 }}>
                        <TouchableOpacity style={styles.button.parkingSuggest__closeBtn} onPress={this.props.onClosePress}>
                            <MaterialIcons name="expand-more" size={35} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                    <BlurView tint="dark" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 89 }} intensity={100} />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const mapStateToProps = (state) => {
	return {
		parking: state.parking
	}
}

export default connect(mapStateToProps)(ParkingSuggession);
