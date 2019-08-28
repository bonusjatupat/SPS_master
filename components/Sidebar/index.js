import _CONFIG from '../../misc/config';

import React, { Component } from 'react';
import {
    View,
    Text,
    Alert,
    ScrollView,
    SafeAreaView,
    Image,
    TouchableOpacity,
    Platform,
    StatusBar
} from 'react-native';
import { DrawerItems, NavigationActions } from 'react-navigation';
import { BoxShadow } from 'react-native-shadow';
import { connect } from 'react-redux';

import axios from 'axios';

import { SimpleLineIcons } from '@expo/vector-icons';
import styles from '../../styles';

const GLOBAL_SHADOW_SETTING = {
    color: '#000000',
    border: 10,
    opacity: 0.05,
    x: 0,
    y: 4
};

class Sidebar extends Component {

    constructor(props) {
        super(props);

        this.onPressLogout = this.onPressLogout.bind(this);
        this.navigateToScreen = this.navigateToScreen.bind(this);
    }
    
    onPressLogout() {
        axios.get(`${_CONFIG.API_ENDPOINT_URL}/authen/logout`, null, null)
            .then((response) => {
                if (response.data.success) {
                    this.props.dispatch({ type: 'FETCH_USER_ACCOUNT_FULFILLED', payload: {} });
                    this.props.navigation.navigate('DrawerClose');
                }
            })
            .catch((error) => {
                Alert.alert('Error', error);
            });
    }

    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render() {
        const props = this.props;        
        const menus = [
            { name: 'Privillages', route: 'PrivCard' }
        ]
        return (
            <View style={styles.sidebar.container}>
                <View style={styles.sidebar.wrapper}>
                    <View style={styles.sidebar.header}>
                        <SafeAreaView forceInset={{ top: 'always' }} />
                        <BoxShadow setting={{
                            width: 50,
                            height: 50,
                            radius: 25,
                            style: { marginBottom: 10 },
                            ...GLOBAL_SHADOW_SETTING
                        }}>
                            <View style={styles.sidebar.header__profile}>
                                <View style={styles.sidebar.header__profile_image}>
                                    {Object.keys(this.props.userAccount.data).length == 0 ? (
                                        <Image source={require('../../assets/person.jpg')} style={styles.sidebar.header__profile_image} resizeMode="cover" />
                                    ) : (
                                        this.props.userAccount.data.personalInfo.photo ? (
                                            <Image source={{ uri: this.props.userAccount.data.personalInfo.photo }} style={styles.sidebar.header__profile_image} resizeMode="cover" />
                                        ) : (
                                            <Image source={require('../../assets/person.jpg')} style={styles.sidebar.header__profile_image} resizeMode="cover" />
                                        )
                                    )}
                                </View>
                            </View>
                        </BoxShadow>
                        <Text style={styles.sidebar.header__profile_name}>{Object.keys(this.props.userAccount.data).length == 0 ? 'Guest' : this.props.userAccount.data.personalInfo.name}</Text>
                        <TouchableOpacity style={styles.sidebar.header__profile_edit_button} onPress={this.navigateToScreen('EditProfile')}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Edit your profile <SimpleLineIcons size={10} name="arrow-right" /></Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.sidebar.menuList}>
                        {/* <DrawerItems 
                            activeTintColor="#FFFFFF" 
                            activeBackgroundColor="transparent"
                            inactiveTintColor="#474747" 
                            itemStyle={styles.sidebar.menuItemStyle}
                            labelStyle={styles.sidebar.menuLabelStyle} 
                            {...newprops} /> */}
                        {menus.map((menu, key) => 
                            <TouchableOpacity key={key} style={[styles.sidebar.menuItemStyle, { marginHorizontal: 20 }]} onPress={this.navigateToScreen(menu.route)}>
                                <Text style={[styles.sidebar.menuLabelStyle, { fontWeight: 'bold' }]}>{menu.name}</Text>
                            </TouchableOpacity>
                        )}
                        
                        <TouchableOpacity style={[styles.sidebar.menuItemStyle, { marginHorizontal: 20 }]} onPress={this.onPressLogout}>
                            <Text style={[styles.sidebar.menuLabelStyle, { fontWeight: 'bold', color: '#D0021B' }]}>Sign Out</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    <View style={styles.sidebar.footer}>
                        <Text style={styles.sidebar.footer__text}>Copyright&copy; 2018 PARKernel.</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
	return {
        userAccount: state.userAccount
	}
}

export default connect(mapStateToProps)(Sidebar);