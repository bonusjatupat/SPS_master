import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image, 
    TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo';
import { Entypo } from '@expo/vector-icons';
import Button from 'react-native-button';
import getDirections from 'react-native-google-maps-directions';

import styles from '../../styles';
import { Rating } from '../../components/General';

export class ParkingPopup extends Component {
    render() {
        const { navigate } = this.props.navigation;

        var availableColor = null;
        if (this.props.parkingData.available > 0 && this.props.parkingData.available < 30) {
            availableColor = '#D0021B';
        } else if (this.props.parkingData.available > 30 && this.props.parkingData.available < 70) {
            availableColor = '#F5A623';
        } else if (this.props.parkingData.available > 70) {
            availableColor = '#7ED321';
        }
        var ratingColor = null;
        if (this.props.parkingData.star > 0 && this.props.parkingData.star < 2.5) {
            ratingColor = '#D0021B';
        } else if (this.props.parkingData.star > 2.5 && this.props.parkingData.star < 3.5) {
            ratingColor = '#F5A623';
        } else if (this.props.parkingData.star > 3.5) {
            ratingColor = '#7ED321';
        }

        return (
            <View style={styles.popup.parkingDetails}>
                <View style={styles.popup.parkingDetails__box}>
                    <View style={styles.popup.parkingDetails__header}>
                        <LinearGradient
                            colors={['#F6A800', '#F6CF3F']}
                            start={[0, 0.5]}
                            end={[1, 0.5]}
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                width: '100%',
                                height: '100%',
                            }}/>
                        <Text numberOfLines={2} style={styles.popup.parkingDetails__header_text}>{this.props.parkingData.name}</Text>
                    </View>
                    <View style={styles.popup.parkingDetails__info}>
                        <View style={{ flex: 0, flexDirection: 'row', marginBottom: 10 }}>
                            {this.props.parkingData.available ? (
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.popup.parkingDetails__info_title}>Available</Text>
                                    <Text style={[styles.popup.parkingDetails__info_value, { color: availableColor }]}>{Math.floor(this.props.parkingData.available)}%</Text>
                                </View>
                            ) : null}
                            <View style={{ flex: 1 }}>
                                <Text style={styles.popup.parkingDetails__info_title}>Rate</Text>
                                <Text style={[styles.popup.parkingDetails__info_value, { color: '#F5A623' }]}>{this.props.parkingData.price != null && this.props.parkingData.price.paid.rate ? "฿ " + this.props.parkingData.price.paid.rate : "FREE"}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 0, flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.popup.parkingDetails__info_title}>Distance</Text>
                                <Text style={[styles.popup.parkingDetails__info_value, { color: '#BD10E0'}]}>{this.props.parkingData.distance}km</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.popup.parkingDetails__info_title}>Rating</Text>
                                <Rating star={this.props.parkingData.star} starColor={ratingColor} />
                            </View>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <TouchableOpacity style={styles.button.parkingDetails__detailButton} onPress={() => navigate('ParkingDetail', this.props.parkingData._id)}>
                                <Text style={styles.button.parkingDetails__detailButton_text}>{'View Detail'.toUpperCase()}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: -2, alignItems: 'center' }}>
                    <Image source={require('../../assets/box_arrow_down/box_arrow_down.png')} />
                </View>
            </View>
        );
    }
}