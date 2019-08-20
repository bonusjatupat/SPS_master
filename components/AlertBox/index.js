import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from '../../styles';

export class AlertBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertStyle: null,
            showAlert: this.props.show
        };
    }
    componentWillMount() {
        switch (this.props.type) {
            case 'success': this.setState({ alertStyle: styles.alert.alertSuccess });
                break;
            case 'warning': this.setState({ alertStyle: styles.alert.alertWarning });
                break;
            case 'danger': this.setState({ alertStyle: styles.alert.alertDanger });
                break;
            case 'default': this.setState({ alertStyle: styles.alert.alertDefault });
                break;
            default:
                this.setState({ alertStyle: styles.alert.alertDefault });
        }
    }
    render() {
        return (
            <View style={[styles.alert.alert, this.state.alertStyle, this.props.style]}>
                <View style={styles.alert.alert__container}>
                    <View style={styles.alert.alert__body}>
                        {this.props.children}
                    </View>
                    {this.props.closeBtn ? (
                        <View style={styles.alert.alert__close}>
                            <TouchableOpacity style={styles.alert.alert__closeBtn} onPress={this.props.onClosePress}>
                                <Ionicons name="ios-close" size={30} color="#FFFFFF" /> 
                            </TouchableOpacity>
                        </View>
                    ) : null}
                </View>
            </View>
        );
    }
}