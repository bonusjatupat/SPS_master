import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput
} from 'react-native';

import styles from '../../styles';

export class DefaultTextInput extends Component {
    render() {
        return (
            <TextInput 
                style={[styles.form.defaultInput, this.props.style]} 
                placeholder={this.props.placeholder}
                placeholderTextColor="#515151"
                keyboardType={this.props.keyboardType}
                autoCapitalize="none"
                value={this.props.value}
                autoFocus={this.props.autoFocus}
                secureTextEntry={this.props.secureTextEntry}
                underlineColorAndroid="transparent"
                onChangeText={(text) => { this.props.value = text; }} />
        );
    }
}