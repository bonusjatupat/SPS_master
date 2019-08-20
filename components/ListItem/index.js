import React, { Component } from 'react';
import {
    Alert,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo';
import { FontAwesome, Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';

import { Rating } from '../General';
import styles from '../../styles';

export class ItemLocation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity style={styles.listItem.locationListItem} onPress={() => this.props.onPress(this.props.itemData)}>
                <View style={styles.listItem.locationListItem__details}>
                    <Text style={styles.listItem.locationListItem__details_name}>{this.props.itemData.name}</Text>
                    <Text style={styles.listItem.locationListItem__details_address} numberOfLines={2}>{this.props.itemData.address}</Text>
                </View>
                {/*<View style={styles.listItem.locationListItem__fav}>
                    <TouchableOpacity style={styles.listItem.locationListItem__fav_button}>
                        <Image source={
                            this.props.itemData.faved ? 
                            require('../../assets/star_activate/star_activate.png') : 
                            require('../../assets/star_deactivate/star_deactivate.png')} />
                    </TouchableOpacity>
                </View>*/}
            </TouchableOpacity>
        );
    }
}

export class DefaultCheckList extends Component {
    render() {
        return (
            <TouchableOpacity style={[styles.listItem.defaultCheckList, this.props.style]} onPress={this.props.onPress}>
                <View style={styles.listItem.defaultCheckList__marker}>
                    {this.props.checked ? (
                        <Ionicons name="ios-checkmark-circle" size={35} color="#F5A623" />
                    ) : (
                        <Ionicons name="ios-checkmark-circle-outline" size={35} color="#9B9B9B" />
                    )}
                </View>
                <View style={styles.listItem.defaultCheckList__label}>
                    <Text style={[styles.listItem.defaultCheckList__label_text, { color: this.props.checked ? '#F5A623' : '#9B9B9B' }]}>{this.props.label}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export class DefaultCheckListMini extends Component {
    render() {
        return (
            <TouchableOpacity style={[styles.listItem.defaultCheckList, this.props.style]} onPress={this.props.onPress}>
                <View style={styles.listItem.defaultCheckList__marker}>
                    {this.props.checked ? (
                        <Ionicons name="ios-checkmark-circle" size={20} color="#F5A623" />
                    ) : (
                        <Ionicons name="ios-checkmark-circle-outline" size={20} color="#9B9B9B" />
                    )}
                </View>
                <View style={styles.listItem.defaultCheckList__label_mini}>
                    <Text style={[styles.listItem.defaultCheckList__label_mini_text, { color: this.props.checked ? '#F5A623' : '#9B9B9B' }]}>{this.props.label}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export class ItemParking extends Component {
    render({ item, index }) {
        var availableStyle = null;
        if (this.props.itemData.available > 0 && this.props.itemData.available < 30) {
            availableStyle = styles.listItem.parkingListItem__thumb_available_low;
        } else if (this.props.itemData.available > 30 && this.props.itemData.available < 70) {
            availableStyle = styles.listItem.parkingListItem__thumb_available_mid;
        } else if (this.props.itemData.available > 70) {
            availableStyle = styles.listItem.parkingListItem__thumb_available_high;
        }
        
        return (
            <View style={styles.listItem.parkingItem}>
                <View style={styles.listItem.parkingItem__thumb}>
                    <View style={styles.listItem.parkingItem__thumb_details}>
                        <View style={styles.listItem.parkingItem__thumb_details_top}>
                            <Rating star={this.props.itemData.star} starColor="#FFFFFF" compStyle={{
                                shadowOffset: { width: 0, height: 4 },
                                shadowColor: '#000000',
                                shadowOpacity: 0.1
                                }} />
                        </View>
                        <View style={styles.listItem.parkingItem__thumb_details_bottom}>
                            <Text style={styles.listItem.parkingItem__thumb_details_title}>{this.props.itemData.name}</Text>
                            <Text style={styles.listItem.parkingItem__thumb_details_price}>
                                {this.props.itemData.price != null && this.props.itemData.price.paid.rate ? "฿" + this.props.itemData.price.paid.rate + <Text style={styles.listItem.parkingItem__thumb_details_price_sub}>/hour</Text> : "FREE"}
                            </Text>
                        </View>
                    </View>
                    <LinearGradient
                        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.6)']}
                        start={[0, 0]}
                        end={[0, 1]}
                        style={styles.listItem.parkingItem__thumb_gradient} />
                    <Image source={this.props.itemData.photos.length > 0 ? { uri: 'http://www.parkernel.com/parking_pic/' + this.props.itemData.photos[0] } : require('../../assets/preview_parking.png')} style={{ width: '100%', height: 120 }} resizeMode="cover" />
                </View>
                <View style={styles.listItem.parkingItem__percentage}>
                    {this.props.itemData.available > 0 ? (
                        <View style={[styles.listItem.parkingItem__percentage_percent, { backgroundColor: '#417505', width: Math.floor(this.props.itemData.available) + '%' }]} />
                    ) : null}
                </View>
                <View style={styles.listItem.parkingItem__bottom}>
                    <View style={styles.listItem.parkingItem__meta}>
                        <MaterialIcons name="location-on" size={14} />
                        <Text style={styles.listItem.parkingItem__meta_text}>
                            {this.props.itemData.distance}km
                        </Text>
                    </View>
                    <View style={styles.listItem.parkingItem__actions}>
                        <TouchableOpacity style={styles.listItem.parkingItem__actions_details_button}>
                            <Text style={styles.listItem.parkingItem__actions_details_button_text}>Details</Text>
                            <Ionicons name="ios-arrow-round-forward" size={14} color="#9B9B9B" style={{ marginLeft: 5 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.listItem.parkingItem__actions_directions_button}>
                            <Text style={styles.listItem.parkingItem__actions_directions_button_text}>Directions</Text>
                            <MaterialIcons name="directions-car" size={14} color="#FFFFFF" style={{ marginLeft: 5 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export class ItemFacilities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            facilities: [
                { name: 'car_wash', title: 'Car Wash', icon: require('../../assets/faci_car_wash/faci_car_wash.png') },
                { name: 'coffee', title: 'Coffee', icon: require('../../assets/faci_coffee/faci_coffee.png') },
                { name: 'covered_parking', title: 'Covered Parking', icon: require('../../assets/faci_covered_parking/faci_covered_parking.png') },
                { name: 'security', title: 'Security', icon: require('../../assets/faci_guard/faci_guard.png') },
                { name: 'restaurant', title: 'Restaurant', icon: require('../../assets/faci_restaurant/faci_restaurant.png') },
                { name: 'wifi', title: 'WiFi', icon: require('../../assets/faci_wifi/faci_wifi.png') }
            ],
            available: []
        }
    }

    componentDidMount() {
        var oldAvailable = this.state.available.slice();
        this.props.facilities.map((i) => {
            var newAvailable = this.state.facilities.find((elm) => {
                return elm.name === i;
            });
            oldAvailable.push(newAvailable);
        });
        this.setState({ available: oldAvailable });
    }

    render() {
        return (        
            this.state.available.map((item, key) =>
                <View key={key} style={[this.props.customItemStyle, styles.listItem.facilityListItem]}>
                    <View style={styles.listItem.facilityListItem__icon}>
                        <Image source={item.icon} />
                    </View>
                    <Text numberOfLines={2} style={styles.listItem.facilityListItem__text}>{item.title}</Text>
                </View>
            )
        );
    }
}