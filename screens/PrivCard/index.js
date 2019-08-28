import React, { Component } from 'react';
import {
    Alert,
    View,
    Text,
    TextInput,
    Keyboard,
    Button,
    StatusBar,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    KeyboardAvoidingView
} from 'react-native';
import Swiper from 'react-native-swiper';
import Picker from 'react-native-picker'
import { TextInputMask } from 'react-native-masked-text'
import { connect } from 'react-redux';

import styles from '../../styles';
import { NavBackButton_Pure, ModalLogoutButton, ModalSubmitButton } from '../../components/Button';
import { CardSample } from '../../components/Card';

const { width } = Dimensions.get('window');
class PrivCard extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Privillages',
        headerStyle: styles.navbar.white_noborder,
        headerTitleStyle: styles.navbar.white__title,
        headerLeft: <NavBackButton_Pure title="BACK" onPress={() => navigation.navigate('Home')} />
    });

    constructor(props) {
        super(props);
        this.state = {
            cardInfos: [
                { card_name: 'BRYAN COOL', card_number: '1234 5678 1234 5678', card_expires: '12/20' },
                { card_name: '', card_number: '', card_expires: '' }
            ],
            formField_cardName_first: '',
            formField_cardName_last: '',
            formField_cardNumber: '',
            formField_cardExpires_month: '',
            formField_cardExpires_year: '',
            newFormValidate: {
                card_name: '',
                card_number: '',
                card_expires: ''
            },
            activeIndex: 0,
            infoNewMode: false
        }        

        this.addCardSubmit = this.addCardSubmit.bind(this);
        this.removeCard = this.removeCard.bind(this);
        this.formValidate = this.formValidate.bind(this);
        this._onSwiperChange = this._onSwiperChange.bind(this);
    }

    componentWillMount() {
        this.setState({
            infoNewMode: this.state.cardInfos.length < 1
        });
    }

    addCardSubmit() {
        if (this.formValidate()) {
            const newCard = {
                card_number: this.state.formField_cardNumber,
                card_name: this.state.formField_cardName_first.toUpperCase() + ' ' + this.state.formField_cardName_last.toUpperCase(),
                card_expires: this.state.formField_cardExpires_month + '/' + this.state.formField_cardExpires_year
            }
    
            const oldCard = this.state.cardInfos;
            const blankCard = oldCard.pop();
            oldCard.push(newCard);
            oldCard.push(blankCard);
            this.setState({
                cardInfos: oldCard,
                formField_cardNumber: '',
                formField_cardName_first: '',
                formField_cardName_last: '',
                formField_cardExpires_month: '',
                formField_cardExpires_year: ''
            })
            this.setState({
                infoNewMode: false,
                activeIndex: this.state.cardInfos.length - 2
            });
        }
    }

    removeCard() {
        Alert.alert(
            'Delete Card',
            'Do you want to delete this card?', 
            [{ 
                text: 'OK', onPress: () => {
                    const newIndex = this.state.activeIndex == 0 ? 0 : this.state.activeIndex - 1;
                    this.state.cardInfos.splice(this.state.activeIndex, 1);

                    if ((this.state.activeIndex == 0) && (this.state.cardInfos.length == 1)) {
                        this.setState({ activeIndex: 0, infoNewMode: true });
                    } else if (this.state.activeIndex == 0) {
                        this.setState({ activeIndex: 0 });
                    } else {
                        this.setState({ activeIndex: this.state.activeIndex - 1 });
                    }
                }
            }, { 
                text: 'Cancel', onPress: () => { } 
            }], { 
                cancelable: false
            }
        );
    }

    formValidate() {
        const minYear = parseInt((new Date().getFullYear()).toString().slice(-2));
        const maxYear = minYear + 10;
        let error = 0;
        let newFormValidate = {
            card_expires: '',
            card_name: '',
            card_number: ''
        }

        if(this.state.formField_cardNumber.trim() == '') {
            newFormValidate.card_number = 'Please enter card number';
            error++;
        }

        if ((this.state.formField_cardName_first.trim() == '') || (this.state.formField_cardName_last.trim() == '')) {
            newFormValidate.card_name = 'Please enter card name';
            error++;
        }

        if (this.state.formField_cardExpires_month.trim() == '') {
            newFormValidate.card_expires = 'Please enter card expired date';
            error++;
        } else if ((parseInt(this.state.formField_cardExpires_month) < 1) && (parseInt(this.state.formField_cardExpires_month) > 12)) {
            newFormValidate.card_expires = 'Card expires date is incorrect';
            error++;
        }

        if (this.state.formField_cardExpires_year.trim() == '') {
            newFormValidate.card_expires = 'Please enter card expired date';
            error++;
        } else if ((parseInt(this.state.formField_cardExpires_year) < minYear) && (parseInt(this.state.formField_cardExpires_year) > maxYear)) {
            newFormValidate.card_expires = 'Card expires date is incorrect';
            error++;
        }

        this.setState({ newFormValidate: newFormValidate });
        return error < 1;
    }

    _renderCardForm() {
        return (
            <View style={{ height: '100%', flex: 0, flexDirection: 'column' }}>
                <ScrollView style={{ flex: 1, paddingLeft: 30, paddingRight: 30 }}>
                    <View style={styles.form.default__row}>
                        <Text style={styles.form.default__label}>CARD NUMBER</Text>
                            <TextInputMask
                                style={styles.form.default__input}
                                returnKeyType="next"
                                placeholder="XXXX XXXX XXXX XXXX"
                                value={this.state.formField_cardNumber}
                                type={"credit-card"}
                                onChangeText={(text) => { this.setState({ formField_cardNumber: text }) }}
                                underlineColorAndroid="transparent" />
                            {this.state.newFormValidate.card_number != '' ? (
                                <Text style={styles.form.default__label_danger}>{this.state.newFormValidate.card_number}</Text>
                            ) : null}
                    </View>
                    <View style={styles.form.default__row}>
                        <Text style={styles.form.default__label}>CARD NAME</Text>
                        <View style={{ flex: 0, flexDirection: 'row', alignSelf: 'stretch' }}>
                            <TextInput 
                                style={[styles.form.default__input, { width: '49%', marginRight: 5 }]} 
                                returnKeyType="next"
                                placeholder="First name"
                                value={this.state.formField_cardName_first}
                                onChangeText={(text) => { this.setState({ formField_cardName_first: text }) }}
                                underlineColorAndroid="transparent" />
                            <TextInput 
                                style={[styles.form.default__input, { width: '49%' }]} 
                                returnKeyType="next"
                                placeholder="Last name"
                                value={this.state.formField_cardName_last}
                                onChangeText={(text) => { this.setState({ formField_cardName_last: text })}}
                                underlineColorAndroid="transparent" />
                        </View>
                        {this.state.newFormValidate.card_name != '' ? (
                            <Text style={styles.form.default__label_danger}>{this.state.newFormValidate.card_name}</Text>
                        ) : null}
                    </View>
                    <View style={styles.form.default__row}>
                        <Text style={styles.form.default__label}>EXPIRE DATE</Text>
                        <View style={{ flex: 0, flexDirection: 'row', alignSelf: 'stretch', alignItems: 'center' }}>
                            <TextInput 
                                style={[styles.form.default__input, { width: 50, marginRight: 5 }]} 
                                returnKeyType="next"
                                placeholder="MM"
                                value={this.state.formField_cardExpires_month}
                                onChangeText={(text) => { this.setState({ formField_cardExpires_month: text }) }}
                                keyboardType="numeric"
                                underlineColorAndroid="transparent" />
                            <Text style={{ fontSize: 20, color: '#6F6F6F' }}>/</Text>
                            <TextInput 
                                style={[styles.form.default__input, { width: 50, marginLeft: 5 }]} 
                                returnKeyType="next"
                                placeholder="YY"
                                value={this.state.formField_cardExpires_year}
                                onChangeText={(text) => { this.setState({ formField_cardExpires_year: text })}}
                                keyboardType="numeric"
                                underlineColorAndroid="transparent" />
                        </View>
                        {this.state.newFormValidate.card_expires != '' ? (
                            <Text style={styles.form.default__label_danger}>{this.state.newFormValidate.card_expires}</Text>
                        ) : null}
                    </View>
                </ScrollView>
                <ModalSubmitButton onPress={this.addCardSubmit}>
                    <Text style={styles.button.modalSubmit__text}>ADD CARD</Text>
                </ModalSubmitButton>
            </View>
        );
    }

    _renderCardInfo() {
        const cardInfo = this.state.cardInfos[this.state.activeIndex];
        return (
            <View style={{ height: '100%', paddingLeft: 30, paddingRight: 30 }}>
                <View style={{ flex: 1 }}>
                    <View style={styles.form.default__row}>
                        <Text style={styles.form.default__label}>CARD NUMBER</Text>
                        <Text style={styles.form.default__static}>{this._maskCardNumber(cardInfo.card_number)}</Text>
                    </View>
                    <View style={styles.form.default__row}>
                        <Text style={styles.form.default__label}>CARD NAME</Text>
                        <View style={{ flex: 0, flexDirection: 'row', alignSelf: 'stretch' }}>
                            <Text style={styles.form.default__static}>{cardInfo.card_name}</Text>
                        </View>
                    </View>
                    <View style={styles.form.default__row}>
                        <Text style={styles.form.default__label}>EXPIRE DATE</Text>
                        <Text style={styles.form.default__static}>{cardInfo.card_expires}</Text>
                    </View>
                </View>
                <View style={{ flex: 0 }}>
                    <ModalLogoutButton onPress={() => this.removeCard()}>
                        <Text style={styles.button.modalLogOut__text}>DELETE CARD</Text>
                    </ModalLogoutButton>
                </View>
            </View>
        );
    }

    _onSwiperChange(e, state, context) {
        if (state.index == (this.state.cardInfos.length - 1)) {  
            this.setState({ activeIndex: state.index, infoNewMode: true });
        } else {
            this.setState({ activeIndex: state.index, infoNewMode: false });
        }
    }

    _maskCardNumber(cardNum) {
        return cardNum.replace(/\d{4}(?= \d{4})/g, "XXXX");;
    }

    render() {
        const { navigate } = this.props.navigation;
        let cardWrapper = null;
        if (this.state.cardInfos && this.state.cardInfos.length > 0) {
            cardWrapper = 
            <Swiper 
                key={this.state.cardInfos.length}
                index={this.state.activeIndex}
                onMomentumScrollEnd={this._onSwiperChange}
                showsPagination={false} 
                loop={false}
                bounces={true}>
                {this.state.cardInfos.map((cardInfo, key) => (
                    <View key={key} style={styles.listItem.privCardList}>
                        <CardSample cardInfo={cardInfo} />
                    </View>
                ))}
            </Swiper>
        }
        return (
            <View style={styles.global.whiteScreen}>
                <StatusBar barStyle="dark-content" />
                {cardWrapper}
                <KeyboardAvoidingView style={{ flex: 2, marginTop: 30 }} behavior="padding">
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        {this.state.infoNewMode ? 
                            this._renderCardForm() : this._renderCardInfo()
                        }
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
	return {
		parking: state.parking
	}
}

export default connect(mapStateToProps)(PrivCard);