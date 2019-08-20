import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import styles from '../../styles';

export class CardSample extends Component {
    constructor(props) {
        super(props);
        this._renderActiveCard = this._renderActiveCard.bind(this);
    }
    _maskCardNumber(cardNum) {
        return cardNum.replace(/\d{4}(?= \d{4})/g, "XXXX");;
    }

    _renderActiveCard() {
        return (
            <View style={styles.listItem.privCardListItem}>
                <View style={styles.listItem.privCardListItem__card}>
                    <View style={styles.listItem.privCardListItem__card_wrapper}>
                        <Image source={require('../../assets/visa_logo/visa_logo.png')} />
                    </View>
                    <Text style={styles.listItem.privCardListItem__card_number}>{this._maskCardNumber(this.props.cardInfo.card_number)}</Text>
                    <View style={{ flex: 0, flexDirection: 'row' }}>
                        <Text style={styles.listItem.privCardListItem__card_name}>{this.props.cardInfo.card_name.toUpperCase()}</Text>
                        <Text style={styles.listItem.privCardListItem__card_expires}>{this.props.cardInfo.card_expires}</Text>
                    </View>
                </View>
                <LinearGradient
                    colors={['#FAD961', '#F76B1C']}
                    start={[0, 0]}
                    end={[1, 1]}
                    style={{
                        position: 'absolute',
                        top: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 98,
                        borderRadius: 5
                    }} />
            </View>
        );
    }

    _renderBlankCard() {
        return (
            <View style={styles.listItem.privCardListItem}>
                <View style={styles.listItem.privCardListItem__card}>
                    <View style={styles.listItem.privCardListItem__card_wrapper_blank}>
                        <Text style={styles.listItem.privCardListItem__card_newcard_icon}>
                            <Ionicons name="md-add-circle" size={72} color="#FFFFFF" />
                        </Text>
                        <Text style={styles.listItem.privCardListItem__card_newcard_text}>NEW CARD</Text>
                    </View>
                </View>
                <LinearGradient
                    colors={['#3023AE', '#53A0FD', '#B4EC51']}
                    start={[0, 0]}
                    end={[1, 1]}
                    style={{
                        position: 'absolute',
                        top: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 98,
                        borderRadius: 5
                    }} />
            </View>
        );
    }

    render() {
        return (
            (this.props.cardInfo.card_name != '' ? (
                this._renderActiveCard()
            ) : (
                this._renderBlankCard()
            ))
        );
    }
}