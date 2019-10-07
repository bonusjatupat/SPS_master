import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import Button from 'react-native-button';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo';

import styles from '../../styles';

export class Rating extends Component {
    render() {
        const starColor = this.props.starColor != null ? this.props.starColor : '#000000'
        switch (this.props.star) {
            case 1:
                return (
                    <View style={[{ backgroundColor: 'transparent', flex: 0, flexDirection: 'row' }, this.props.compStyle]}>
                        <Ionicons style={[{ marginRight: 2 }, this.props.iconStyle]} name="ios-star" size={this.props.starSize} color={starColor} />
                    </View>
                );
                break;
            case 1.5:
                return (
                    <View style={[{ backgroundColor: 'transparent', flex: 0, flexDirection: 'row' }, this.props.compStyle]}>
                        <Ionicons style={[{ marginRight: 2 }, this.props.iconStyle]} name="ios-star" size={this.props.starSize} color={starColor} />
                        <Ionicons style={[{ marginRight: 2 }, this.props.iconStyle]} name="ios-star-half" size={this.props.starSize} color={starColor} />
                    </View>
                );
                break;
            case 2:
                return (
                    <View style={[{ backgroundColor: 'transparent', flex: 0, flexDirection: 'row' }, this.props.compStyle]}>
                        <Ionicons style={[{ marginRight: 2 }, this.props.iconStyle]} name="ios-star" size={this.props.starSize} color={starColor} />
                        <Ionicons style={[{ marginRight: 2 }, this.props.iconStyle]} name="ios-star" size={this.props.starSize} color={starColor} />
                    </View>
                );
                break;
            case 2.5:
                return (
                    <View style={[{ backgroundColor: 'transparent', flex: 0, flexDirection: 'row' }, this.props.compStyle]}>
                        <Ionicons style={[{ marginRight: 2 }, this.props.iconStyle]} name="ios-star" size={this.props.starSize} color={starColor} />
                        <Ionicons style={[{ marginRight: 2 }, this.props.iconStyle]} name="ios-star" size={this.props.starSize} color={starColor} />
                        <Ionicons style={[{ marginRight: 2 }, this.props.iconStyle]} name="ios-star-half" size={this.props.starSize} color={starColor} />
                    </View>
                );
                break;
            case 3:
                return (
                    <View style={[{ backgroundColor: 'transparent', flex: 0, flexDirection: 'row' }, this.props.compStyle]}>
                        <Ionicons style={[{ marginRight: 2 }, this.props.iconStyle]} name="ios-star" size={this.props.starSize} color={starColor} />
                        <Ionicons style={[{ marginRight: 2 }, this.props.iconStyle]} name="ios-star" size={this.props.starSize} color={starColor} />
                        <Ionicons style={[{ marginRight: 2 }, this.props.iconStyle]} name="ios-star" size={this.props.starSize} color={starColor} />
                    </View>
                );
                break;
            case 3.5: 
                return (
                    <View style={[{ backgroundColor: 'transparent', flex: 0, flexDirection: 'row' }, this.props.compStyle]}>
                        <Ionicons style={[{ marginRight: 2 }, this.props.iconStyle]} name="ios-star" size={this.props.starSize} color={starColor} />
                        <Ionicons style={[{ marginRight: 2 }, this.props.iconStyle]} name="ios-star" size={this.props.starSize} color={starColor} />
                        <Ionicons style={[{ marginRight: 2 }, this.props.iconStyle]} name="ios-star" size={this.props.starSize} color={starColor} />
                        <Ionicons style={[{ marginRight: 2 }, this.props.iconStyle]} name="ios-star-half" size={this.props.starSize} color={starColor} />
                    </View>
                );
                break;
            case 4: 
                return (
                    <View style={[{ backgroundColor: 'transparent', flex: 0, flexDirection: 'row' }, this.props.compStyle]}>
                        <Ionicons style={[{ marginRight: 2 }, this.props.iconStyle]} name="ios-star" size={this.props.starSize} color={starColor} />
                        <Ionicons style={[{ marginRight: 2 }, this.props.iconStyle]} name="ios-star" size={this.props.starSize} color={starColor} />
                        <Ionicons style={[{ marginRight: 2 }, this.props.iconStyle]} name="ios-star" size={this.props.starSize} color={starColor} />
                        <Ionicons style={[{ marginRight: 2 }, this.props.iconStyle]} name="ios-star" size={this.props.starSize} color={starColor} />
                    </View>
                );
                break;
            case 4.5: 
                return (
                    <View style={[{ backgroundColor: 'transparent', flex: 0, flexDirection: 'row' }, this.props.compStyle]}>
                        <Ionicons style={[{ marginRight: 2 }, this.props.iconStyle]} name="ios-star" size={this.props.starSize} color={starColor} /> 
                        <Ionicons style={[{ marginRight: 2 }, this.props.iconStyle]} name="ios-star" size={this.props.starSize} color={starColor} /> 
                        <Ionicons style={[{ marginRight: 2 }, this.props.iconStyle]} name="ios-star" size={this.props.starSize} color={starColor} /> 
                        <Ionicons style={[{ marginRight: 2 }, this.props.iconStyle]} name="ios-star" size={this.props.starSize} color={starColor} /> 
                        <Ionicons style={[{ marginRight: 2 }, this.props.iconStyle]} name="ios-star-half" size={this.props.starSize} color={starColor} />
                    </View>
                );
                break;
            case 5: 
                return (
                    <View style={[{ backgroundColor: 'transparent', flex: 0, flexDirection: 'row' }, this.props.compStyle]}>
                        <Ionicons style={[{ marginRight: 2 }, this.props.iconStyle]} name="ios-star" size={this.props.starSize} color={starColor} />
                        <Ionicons style={[{ marginRight: 2 }, this.props.iconStyle]} name="ios-star" size={this.props.starSize} color={starColor} />
                        <Ionicons style={[{ marginRight: 2 }, this.props.iconStyle]} name="ios-star" size={this.props.starSize} color={starColor} />
                        <Ionicons style={[{ marginRight: 2 }, this.props.iconStyle]} name="ios-star" size={this.props.starSize} color={starColor} />
                        <Ionicons style={[{ marginRight: 2 }, this.props.iconStyle]} name="ios-star" size={this.props.starSize} color={starColor} />
                    </View>
                );
                break;
        }
    }
}

export class RatingMini extends Component {
    render() {
        var ratingStyle = '';
        if (this.props.star > 0 && this.props.star < 2.5) {
            ratingStyle = styles.listItem.parkingListItem__details_meta_rating_low;
        } else if (this.props.star > 2.5 && this.props.star < 3.5) {
            ratingStyle = styles.listItem.parkingListItem__details_meta_rating_mid;
        } else if (this.props.star > 3.5) {
            ratingStyle = styles.listItem.parkingListItem__details_meta_rating_high;
        }
        return (
            <View style={[styles.listItem.parkingListItem__details_meta_rating, ratingStyle, this.props.compStyle]}>
                <Text style={styles.listItem.parkingListItem__details_meta_text}>
                    <Entypo name="star" size={14} color="#FFFFFF" /> {this.props.star}
                </Text>
            </View>
        );
    }
}

export class Seperator extends Component {
    render() {
        return (
            <View style={[styles.global.seperator, this.props.style]}>
                <View style={styles.global.seperator__line}></View>
                <Text style={styles.global.seperator__text}>{this.props.text}</Text>
            </View>
        );
    }
}