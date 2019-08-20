import React, { Component } from 'react';
import { 
    Text, 
    View, 
    Image,
    TouchableOpacity
} from 'react-native';
import Button from 'react-native-button';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo';

import styles from '../../styles';

export class NavBackButton extends Component {
    render() {
        return (
            <Button containerStyle={[styles.navbar.black__button_left, this.props.style]} onPress={this.props.onPress}>
                <SimpleLineIcons name="arrow-left" style={[this.props.iconStyle, { marginRight: 3 }]} size={18} color="#FFFFFF" /> 
                <Text style={styles.navbar.black__button_left_text}>{this.props.title}</Text>
            </Button>
        );
    }
}

export class NavBackButton_Pure extends Component {
    render() {
        return (
            <Button containerStyle={[styles.navbar.white__button_left, this.props.style]} onPress={this.props.onPress}>
                <Ionicons name="ios-arrow-round-back" style={[this.props.iconStyle, { marginRight: 3 }]} size={35} color="#000000" /> 
            </Button>
        );
    }
}

export class NavEditButton extends Component {
    render() {
        return (
            <Button containerStyle={[styles.navbar.black__button_right, this.props.style]} onPress={this.props.onPress}>
                <Text style={styles.navbar.black__button_right_text}>{this.props.title}</Text>
            </Button>
        );
    }
}

export class NavBurgerButton extends Component {
    render() {
        return (
            <Button containerStyle={[styles.navbar.black__left_burger_button, this.props.style]} onPress={this.props.onPress}>
                <Image source={require('../../assets/burger_button/burger_button.png')} />
            </Button>
        );
    }
}

export class WhiteButton extends Component {
    render() {
        return (
            <TouchableOpacity style={[styles.button.whiteShadowButton, this.props.style]} onPress={this.props.onPress}>
                {this.props.children}
            </TouchableOpacity>
        );
    }
}

export class DefaultButton extends Component {
    render() {
        return (
            <TouchableOpacity style={[styles.button.defaultButton, this.props.style]} onPress={this.props.onPress}>
                {this.props.children}
            </TouchableOpacity>
        );
    }
}

export class ModalExitButton extends Component {
    render() {
        return (
            <Button containerStyle={styles.button.modalExit} onPress={this.props.onPress}>
                <Ionicons name="ios-close" style={[this.props.iconStyle, { marginRight: 3 }]} size={50} color="#FFFFFF" /> 
            </Button>
        );
    }
}

export class ModalSubmitButton extends Component {
    render() {
        return (
            <Button containerStyle={styles.button.modalSubmit} onPress={this.props.onPress}>
                <LinearGradient
                    colors={['#F6A800', '#F6CF3F']}
                    start={[0, 0.5]}
                    end={[1, 0.5]}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        width: '100%',
                        height: '100%',
                    }}/>
                <View style={styles.button.modalSubmit__placeholder}>
                    {this.props.children}
                </View>
            </Button>
        );
    }
}

export class ModalLogoutButton extends Component {
    render() {
        return (
            <Button containerStyle={styles.button.modalLogOut} onPress={this.props.onPress}>
                <View style={styles.button.modalLogOut__placeholder}>
                    {this.props.children}
                </View>
            </Button>
        );
    }
}