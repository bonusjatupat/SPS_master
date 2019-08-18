import React, { Component } from 'react';
import {
    Alert,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
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
            </TouchableOpacity>
        );
    }
}