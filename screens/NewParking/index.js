import React, { Component } from 'react';
import {
    Alert,
    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    StatusBar,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Keyboard,
    Dimensions,
    CameraRoll,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { MapView, Permissions, ImagePicker, Constants } from 'expo';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { DefaultButton } from '../../components/Button';
import { DefaultCheckListMini } from '../../components/ListItem';

import styles from '../../styles';

import { NavBackButton, NavEditButton, NavBackButton_Pure } from '../../components/Button';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922 / 18;
const LONGITUDE_DELTA = (LATITUDE_DELTA * ASPECT_RATIO) / 18;

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
});

class NewParkingScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'New Parking',
        headerStyle: styles.navbar.white_noborder,
        headerTitleStyle: styles.navbar.white__title,
        headerLeft: <NavBackButton_Pure title="BACK" onPress={() => navigation.goBack()} />,
        gesturesEnabled: false
    });

    constructor(props) {
        super(props);
        this.state = {
            mapRegion: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            parkingFacilities: {
                car_wash: false,
                covered_parking: false,
                restaurant: false,
                wifi: false,
                security: false,
                coffee: false
            },
            parkingImages: [],
            showAdvance: false,
            parkingType: undefined,
            parkingTypeItems: [
                { label: 'Free parking', value: 'free' }, 
                { label: 'Paid parking', value: 'paid' }, 
                { label: 'Parking customer', value: 'customer' }, 
                { label: 'Private', value: 'private' }
            ],
            parkingSlot: undefined,
            parkingSlotItems: [
                { label: '0 - 5', value: '5' },
                { label: '5 - 10', value: '10' },
                { label: '10 - 20', value: '20' },
                { label: '20 - 50', value: '50' },
                { label: '50+', value: '51' }
            ]
        }
        
        this.inputs = {};

        this.addImageToArray = this.addImageToArray.bind(this);
        this._renderParkingImage = this._renderParkingImage.bind(this);
        this._renderParkingMap = this._renderParkingMap.bind(this);
        this._renderNewParkingForm = this._renderNewParkingForm.bind(this);

        this.focusNextField = this.focusNextField.bind(this);
        this.triggerAdvancePane = this.triggerAdvancePane.bind(this);

        this.onPressDeletePhoto = this.onPressDeletePhoto.bind(this);
        this.onPressNewParking = this.onPressNewParking.bind(this);
        this.onPressAddPhoto = this.onPressAddPhoto.bind(this);
    }

    async onPressAddPhoto() {
        const cameraRollStatus = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const cameraStatus = await Permissions.askAsync(Permissions.CAMERA);
        if (cameraRollStatus.status === 'granted') {
            const result = await ImagePicker.launchImageLibraryAsync({
                quality: 1,
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
            });
            if (!result.cancelled) {
                this.addImageToArray(result);
            } else {
                console.log(TAG, `image selection cancelled\n`);
            }
        }
    }

    onPressDeletePhoto(key) {
        Alert.alert('Remove Photo', 'Do you want to remove this photo?', [{ 
            text: 'OK', onPress: () => { 
                let images = this.state.parkingImages;
                images.splice(key, 1);
                this.setState({ parkingImages: images });
            }
        }, {
            text: 'Cancel', onPress: () => { }
        }]);
        
    }

    addImageToArray(image) {
        if (!image.cancelled) {
            let images = this.state.parkingImages;
            images.push(image);
            this.setState({ parkingImages: images });
        }
        
    }

    focusNextField(id) {
        this.inputs[id].focus();
    }

    componentDidMount() {
        console.log(this.props.navigation.state.params);
        this.setState({
            mapRegion: {
                latitude: this.props.navigation.state.params.latitude,
                longitude: this.props.navigation.state.params.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }
        });
    }

    onPressNewParking() {
        
    }

    triggerAdvancePane() {
        const show = !this.state.showAdvance;
        this.setState({ showAdvance: show });
        if (show) {
            setTimeout(() => {
                this.scrollView.scrollToEnd({ animated: true });
            }, 500);
        }
    }

    _renderParkingImage(image, key) {
        return (
            <View style={{ width: 118, height: 75, marginRight: 10, borderRadius: 15 }}>
                <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: '#E4E4E4' }}>
                    <TouchableOpacity style={{
                        width: 25,
                        height: 25,
                        borderRadius: 13,
                        backgroundColor: '#D0021B',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        top: -10,
                        right: -10,
                        zIndex: 99
                    }} onPress={() => { this.onPressDeletePhoto(key) }}>
                        <Ionicons name="ios-close" size={21} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Image
                        style={{ width: '100%', height: '100%', borderRadius: 10 }} 
                        source={{ uri: image.uri }}
                        resizeMode="cover"
                        resizeMethod="resize"
                        />
                </View>
            </View>
        );
    }

    _renderParkingMap() {
        return (
            <View style={{ flex: 0, width: '100%', height: 200 }}>
                <MapView
                    ref={(c) => { this._map = c; }}
                    style={{ width: '100%', height: '100%' }}
                    initialRegion={this.state.mapRegion}
                    region={this.state.mapRegion}
                    loadingEnabled={true}
                    showsUserLocation={false}
                    showsPointsOfInterest={false}
                    zoomEnabled={false}
                    rotateEnabled={false}
                    scrollEnabled={false}
                    pitchEnabled={false}
                    showsUserLocation={true}
                    showsMyLocationButton={false}
                    showsTraffic={false}>
                    <MapView.Marker
                        coordinate={{
                            latitude: this.props.navigation.state.params.latitude,
                            longitude: this.props.navigation.state.params.longitude
                        }}/>
                </MapView>
            </View>
        );
    }

    _renderNewParkingForm() {
        let index = 0;
        const data = [
            { key: index++, section: true, label: 'Fruits' },
            { key: index++, label: 'Red Apples' },
            { key: index++, label: 'Cherries' },
            { key: index++, label: 'Cranberries', accessibilityLabel: 'Tap here for cranberries' },
            // etc...
            // Can also add additional custom keys which are passed to the onChange callback
            { key: index++, label: 'Vegetable', customKey: 'Not a fruit' }
        ];
        return (
            <View style={{ padding: 20 }}>
                <View style={{ paddingVertical: 15 }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>General</Text>
                </View>
                <TextInput 
                    style={[styles.form.defaultInput, { marginBottom: 15 }, this.state.nameTxt__wrong]} 
                    placeholder="Name"
                    placeholderTextColor="#515151"
                    keyboardType="default"
                    value={this.state.nameTxt}
                    underlineColorAndroid="transparent"
                    blurOnSubmit={false}
                    returnKeyType={'next'}
                    ref={(input) => { this.inputs['name'] = input; }}
                    onSubmitEditing={() => { this.inputs['type'].togglePicker();  }}
                    onChangeText={(text) => { this.setState({ nameTxt: text }); }} />
                <View style={{ flex: 0, flexDirection: 'row'}}>
                    <TouchableOpacity style={[styles.form.defaultSelector, { flex: 1, marginBottom: 15, justifyContent: 'center'}]}>
                        <RNPickerSelect
                            placeholder={{
                                label: 'Select a type...',
                                value: null,
                            }}
                            hideIcon={true}
                            items={this.state.parkingTypeItems}
                            onValueChange={(value) => {
                                this.setState({
                                    parkingType: value,
                                });
                            }}
                            onUpArrow={() => {
                                this.inputs['name'].focus();
                            }}
                            onDownArrow={() => {
                                this.inputs['slot'].togglePicker();
                            }}
                            style={styles.form.defaultSelector__text}
                            value={this.state.parkingType}
                            ref={(el) => { this.inputs['type'] = el; }}
                        />
                        <Ionicons style={{ position: 'absolute', right: 20 }} name="md-arrow-dropdown" size={20} color="#9B9B9B" />
                    </TouchableOpacity>
                    <View style={{ flex: 0, width: 10 }} />
                    <TouchableOpacity style={[styles.form.defaultSelector, { flex: 1, marginBottom: 15, justifyContent: 'center'}]}>
                        <RNPickerSelect
                            placeholder={{
                                label: 'Select slot...',
                                value: null,
                            }}
                            hideIcon={true}
                            items={this.state.parkingSlotItems}
                            onValueChange={(value) => {
                                this.setState({
                                    parkingSlot: value,
                                });
                            }}
                            onUpArrow={() => {
                                this.inputs['type'].togglePicker();
                            }}
                            style={styles.form.defaultSelector__text}
                            value={this.state.parkingType}
                            ref={(el) => { this.inputs['slot'] = el; }}
                        />
                        <Ionicons style={{ position: 'absolute', right: 20 }} name="md-arrow-dropdown" size={20} color="#9B9B9B" />
                    </TouchableOpacity>
                </View>   
                <View style={{ paddingVertical: 15 }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Photo</Text>
                </View>
                <ScrollView 
                    style={{ width: '100%', paddingVertical: 10 }} 
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false}>
                    <View style={{ flex: 0, flexDirection: 'row' }}>
                        {this.state.parkingImages.length > 0 ? (
                            this.state.parkingImages.map((image, key) => this._renderParkingImage(image, key))
                        ) : null}
                        <View style={{ width: 118, height: 75, marginRight: 10, borderRadius: 15 }}>
                            <TouchableOpacity style={{ width: '100%', height: '100%', overflow: 'hidden', alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: '#E4E4E4'}} onPress={this.onPressAddPhoto}>
                                <MaterialCommunityIcons name="plus" size={40} color="#FFFFFF" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <View style={[styles.global.seperator, styles.global.seperator_right, { marginVertical: 20 }]}>
                    <View style={styles.global.seperator__line}></View>
                    <TouchableOpacity style={styles.global.seperator__link} onPress={this.triggerAdvancePane}>
                        <Text style={styles.global.seperator__link_text}>
                            Advance Details <Ionicons name={this.state.showAdvance ? "md-arrow-dropup" : "md-arrow-dropdown"} size={13} color="#9B9B9B" />
                        </Text>
                    </TouchableOpacity>
                </View>
                {this.state.showAdvance ? (
                    <View>
                        <View style={{ paddingBottom: 15 }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Facility</Text>
                        </View>
                        <View style={{ width: '100%', flex: 0, flexDirection: 'row', flexWrap: 'wrap' }}>
                            <DefaultCheckListMini
                                style={{ flex: 0, width: '50%', marginBottom: 15 }} 
                                label="Car Wash" 
                                checked={this.state.parkingFacilities.car_wash} 
                                onPress={() => { 
                                    this.setState({ parkingFacilities: { ...this.state.parkingFacilities, car_wash: !this.state.parkingFacilities.car_wash }});
                                }} />
                            <DefaultCheckListMini 
                                style={{ flex: 0, width: '50%', marginBottom: 15 }} 
                                label="Covered Parking" 
                                checked={this.state.parkingFacilities.covered_parking} 
                                onPress={() => { 
                                    this.setState({ parkingFacilities: { ...this.state.parkingFacilities, covered_parking: !this.state.parkingFacilities.covered_parking }});
                                }} />
                            <DefaultCheckListMini 
                                style={{ flex: 0, width: '50%', marginBottom: 15 }} 
                                label="Restaurant" 
                                checked={this.state.parkingFacilities.restaurant} 
                                onPress={() => { 
                                    this.setState({ parkingFacilities: { ...this.state.parkingFacilities, restaurant: !this.state.parkingFacilities.restaurant }});
                                }} />
                            <DefaultCheckListMini 
                                style={{ flex: 0, width: '50%', marginBottom: 15 }} 
                                label="WiFi" 
                                checked={this.state.parkingFacilities.wifi} 
                                onPress={() => { 
                                    this.setState({ parkingFacilities: { ...this.state.parkingFacilities, wifi: !this.state.parkingFacilities.wifi }});
                                }} />
                            <DefaultCheckListMini 
                                style={{ flex: 0, width: '50%' }} 
                                label="Security" 
                                checked={this.state.parkingFacilities.security} 
                                onPress={() => { 
                                    this.setState({ parkingFacilities: { ...this.state.parkingFacilities, security: !this.state.parkingFacilities.security }});
                                }} />
                            <DefaultCheckListMini 
                                style={{ flex: 0, width: '50%' }} 
                                label="Coffee" 
                                checked={this.state.parkingFacilities.coffee} 
                                onPress={() => { 
                                    this.setState({ parkingFacilities: { ...this.state.parkingFacilities, coffee: !this.state.parkingFacilities.coffee }});
                                }} />
                        </View>
                    </View>
                ) : null}
            </View>
        );
    }

    render() {
        return (
            <KeyboardAvoidingView>
                <View style={[styles.global.whiteScreen, { flex: 0, flexDirection: 'column' }]}>
                    <ScrollView ref={(e) => { this.scrollView = e }} style={{ flex: 1, width: '100%' }}>
                        {this._renderParkingMap()}
                        {this._renderNewParkingForm()}
                    </ScrollView>
                    <View style={{ flex: 0, width: '100%', padding: 20 }}>
                        <DefaultButton>
                            <Ionicons style={{ position: 'absolute', left: 25 }} name="ios-checkmark" size={20} color="#FFFFFF" />
                            <Text style={styles.button.defaultButton__text}>Save parking</Text>
                        </DefaultButton>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

export default NewParkingScreen;