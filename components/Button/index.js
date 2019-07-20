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

export class DefaultButton extends Component {
    render() {
        return (
            <TouchableOpacity style={[styles.button.defaultButton, this.props.style]} onPress={this.props.onPress}>
                {this.props.children}
            </TouchableOpacity>
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

export class FloorButton extends Component {
    render() {
        return (
            <Button containerStyle={[styles.button.floorButton, this.props.style]} onPress={this.props.onPress}>
                <LinearGradient
                    colors={['#F6A800', '#F6CF3F']}
                    start={[0, 0.5]}
                    end={[0, 0.5]}
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
        )
    }
}


