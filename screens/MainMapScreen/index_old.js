import config from "../../misc/config";
import React, { Component } from "react";
import {
  Alert,
  Animated,
  View,
  Text,
  Image,
  Platform,
  Modal,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  LayoutAnimation,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ActivityIndicator,
  Navigator,
  Dimensions,
  SafeAreaView
} from "react-native";
import { BoxShadow } from "react-native-shadow";
import Button from "react-native-button";
import getDirections from "react-native-google-maps-directions";
import Drawer from "react-native-drawer";
import { connect } from "react-redux";
import { Header, createStackNavigator, createAppContainer } from "react-navigation";
import Carousel from "react-native-snap-carousel";
import * as Animatable from "react-native-animatable";

import {
  joinRealTimeParking,
  leaveRealTimeParking,
  subscribeRealTimeParking
} from "../../misc/socketClient";

import styles from "../../styles";
import { Rating } from "../../components/General";
import { NavBurgerButton, WhiteButton, DefaultButton } from "../../components/Button";
import ParkingSuggession from "../../screens/ParkingSuggession";
import { ItemLocation, ItemParking, DefaultCheckList } from "../../components/ListItem";
import { ParkingPopup } from "../../components/Parking";

import { fetchLocations } from "../../actions/locationAction";
import { fetchNearBy } from "../../actions/parkingAction";
import { fetchCurrentUser } from "../../actions/userAccountAction";

import * as axios from "axios";
import { MapView, BlurView, Constants, Location, Permissions, LinearGradient } from "expo";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import AuthenticationScreen from "../Authentication";
import AuthenticationSignUpScreen from "../AuthenticationSignUp";
import AuthenticationSignUpFinalScreen from "../AuthenticationSignUpFinal";
import ForgotPassword from "../ForgotPassword";

const authenStack = createStackNavigator(
  {
    Authentication: { screen: AuthenticationScreen },
    AuthenticationSignUp: { screen: AuthenticationSignUpScreen },
    AuthenticationSignUpFinal: { screen: AuthenticationSignUpFinalScreen },
    ForgotPassword: { screen: ForgotPassword }
  },
  {
    cardStyle: {
      paddingTop: Platform.OS == "ios" ? 0 : StatusBar.currentHeight,
      backgroundColor: "#FFFFFF"
    }
  }
);
const AuthenAppStack = createAppContainer(authenStack);
const { Marker, Callout } = MapView;

const screen = Dimensions.get("window");

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922 / 8;
const LONGITUDE_DELTA = (LATITUDE_DELTA * ASPECT_RATIO) / 8;
const GLOBAL_SHADOW_SETTING = {
  color: "#000000",
  border: 10,
  opacity: 0.05,
  x: 0,
  y: 4
};
// Disable Warning Box
class MainMapsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
    gesturesEnabled: false
  });

  componentDidMount() {
    this.props.dispatch(fetchCurrentUser());
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
      //Refresh GPS Location Every 3 secs.
      setInterval(() => {
        this._getLocationAsync();
      }, 3000);
    }
  }

  constructor(props) {
    super(props);

    this.initState = this.initState.bind(this);
    this.initSocket = this.initSocket.bind(this);

    this._renderSearchBox = this._renderSearchBox.bind(this);
    this._renderLocationResult = this._renderLocationResult.bind(this);
    this._renderParkingItem = this._renderParkingItem.bind(this);
    this._renderLocationResultHeader = this._renderLocationResultHeader.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
    this._renderMapControls = this._renderMapControls.bind(this);
    this._renderParkingCarousel = this._renderParkingCarousel.bind(this);
    this._renderMap = this._renderMap.bind(this);
    this._renderOverlay = this._renderOverlay.bind(this);
    this._renderParkingFilter = this._renderParkingFilter.bind(this);

    this._moveToRegion = this._moveToRegion.bind(this);

    this.onSearchFocus = this.onSearchFocus.bind(this);
    this.onSearchDismiss = this.onSearchDismiss.bind(this);
    this.onPressItemLocation = this.onPressItemLocation.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this.onPressGetCurrentLocation = this.onPressGetCurrentLocation.bind(this);
    this.onPressToggleMapTraffic = this.onPressToggleMapTraffic.bind(this);
    this.onPressProfile = this.onPressProfile.bind(this);
    this.onParkingItemScroll = this.onParkingItemScroll.bind(this);
    this.onMarkerPress = this.onMarkerPress.bind(this);
    this.onPressOpenParkingFilter = this.onPressOpenParkingFilter.bind(this);
    this.onPressCloseParkingFilter = this.onPressCloseParkingFilter.bind(this);
    this.onPressOpenAuthenModal = this.onPressOpenAuthenModal.bind(this);
    this.onPressCloseAuthenModal = this.onPressCloseAuthenModal.bind(this);
    this.onLongPressMap = this.onLongPressMap.bind(this);

    this.debouncedSearchChange = this.debouncedSearchChange.bind(this);

    this.initState();
    this.initSocket();
  }

  initState() {
    this.state = {
      authenModalVisible: false,
      isFirstTimeFetchGPS: false,
      regionDelta: {
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      initialRegion: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      mapRegion: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      currentRegion: {
        latitude: 37.78825,
        longitude: -122.4324
      },
      destinationRegion: null,
      searchingLocation: false,
      parkingSpotRegion: null,
      searchFocus: false,
      searchKeyword: "",
      searchStyle: {
        box: null,
        field: null
      },
      searchFilter: {
        distance: true,
        price: true,
        rating: false
      },
      isOpenParkingFilter: false,
      headerHeight: 0,
      safeAreaHeight: 0,
      mapShowTraffic: true,
      isCurrentRegion: false,
      locationData: []
    };
  }

  initSocket() {
    // changing redux store when realtime data incoming.
    subscribeRealTimeParking((err, slotData) => {
      var parkingData = this.props.parking.data;
      var index = parkingData.findIndex(x => {
        return x._id == slotData.parkingID;
      });
      parkingData[index].slotCounter = {
        availableSlot: slotData.availableSlot,
        totalSlot: slotData.totalSlot
      };
      parkingData[index].available = (slotData.availableSlot / slotData.totalSlot) * 100;
      this.props.dispatch({ type: "FETCH_PARKING_FULFILLED", payload: parkingData });
    });
  }

  onRegionChange(region) {
    this.setState({
      isCurrentRegion: false,
      mapRegion: region
    });
  }

  onRegionChangeComplete(region) {
    this.setState({
      isCurrentRegion: false,
      mapRegion: region
    });
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    if (this.state.isFirstTimeFetchGPS == false) {
      this.setState({
        isFirstTimeFetchGPS: true,
        isCurrentRegion: true,
        mapRegion: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          ...this.state.regionDelta
        }
      });
    }
    this.setState({
      currentRegion: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
    });
  };

  debouncedSearchChange() {
    var timerId = this.timerId;
    var self = this;
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      this.props.dispatch(
        fetchLocations(
          this.state.currentRegion.latitude,
          this.state.currentRegion.longitude,
          this.state.searchKeyword
        )
      );
      this.setState({ searchingLocation: false });
    }, 1000);
    this.timerId = timerId;
  }

  onSearchChange(text) {
    this.setState({
      searchKeyword: text,
      searchingLocation: true
    });

    this.debouncedSearchChange();
  }

  onSearchFocus() {
    this.setState({
      searchFocus: true
    });

    this.setState({
      searchStyle: {
        box: styles.form.searchBox__focused,
        field: styles.form.searchBox__focused_field
      }
    });
  }

  onSearchDismiss() {
    this.setState({
      searchFocus: false
    });

    this.setState({
      searchStyle: {
        box: null,
        field: null
      }
    });

    this.refs["searchBoxField"].blur();
  }

  _moveToRegion(region) {
    this._map.animateToRegion(region, 500);
  }

  onPressItemLocation(item) {
    this.onSearchDismiss();
    this.setState({
      isCurrentRegion: false,
      searchKeyword: item.name,
      destinationRegion: {
        latitude: item.latitude,
        longitude: item.longitude
      },
      mapRegion: {
        latitude: item.latitude,
        longitude: item.longitude,
        ...this.state.regionDelta
      }
    });

    if (this.props.parking.data.length > 0) {
      leaveRealTimeParking(
        this.props.parking.data.map(x => {
          return x._id;
        }),
        err => {
          // change listening success
        }
      );
    }
    // Store parking data to redux
    this.props.dispatch({ type: "FETCH_PARKING_FULFILLED", payload: [] });
    this.props.dispatch(
      fetchNearBy(
        { lat: item.latitude, long: item.longitude },
        { lat: this.state.currentRegion.latitude, long: this.state.currentRegion.longitude }
      )
    );
  }

  onParkingItemScroll(index) {
    const latitude = this.props.parking.data[index].address.location.coordinates[1],
      longitude = this.props.parking.data[index].address.location.coordinates[0];

    this._moveToRegion({
      latitude: latitude,
      longitude: longitude,
      ...this.state.regionDelta
    });
  }

  onPressToggleMapTraffic() {
    this.setState({ mapShowTraffic: !this.state.mapShowTraffic });
  }

  onPressProfile() {
    if (Object.keys(this.props.userAccount.data).length == 0) {
      this.onPressOpenAuthenModal();
    } else {
      this.props.navigation.navigate("DrawerOpen");
    }
  }

  onLongPressMap(coordinate) {
    if (Object.keys(this.props.userAccount.data).length != 0) {
      Alert.alert("New Parking", "Do you want to add new parking?", [
        {
          text: "OK",
          onPress: () => {
            this.props.navigation.navigate("NewParking", coordinate);
          }
        },
        {
          text: "Cancel",
          onPress: () => {}
        }
      ]);
    }
  }

  onMarkerPress(key) {
    this._carousel.snapToItem(key, true, true);
  }

  onPressGetCurrentLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      isCurrentRegion: true,
      mapRegion: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        ...this.state.regionDelta
      }
    });
  };

  _renderSearchBox() {
    return (
      <View style={[styles.form.searchBox, this.state.searchStyle.box]}>
        <BoxShadow
          setting={{
            width: screen.width - 50,
            height: 55,
            radius: 15,
            ...GLOBAL_SHADOW_SETTING
          }}
        >
          <View style={styles.form.searchBox__field}>
            <Image source={require("../../assets/searchbox_pin/searchbox_pin.png")} />
            <TextInput
              ref="searchBoxField"
              style={styles.form.searchBox__field_text}
              placeholder="I'm going to..."
              underlineColorAndroid="transparent"
              value={this.state.searchKeyword}
              onFocus={this.onSearchFocus}
              onChangeText={text => this.onSearchChange(text)}
            />
            {this.state.searchKeyword.length > 0 ? (
              <TouchableOpacity
                style={styles.form.searchBox__field_clear}
                onPress={() => this.setState({ searchKeyword: "" })}
              >
                {this.state.searchKeyword.length > 0 ? (
                  this.props.location.fetching ? (
                    <ActivityIndicator size="small" color="#848484" />
                  ) : (
                    <Ionicons name="ios-close-circle" size={20} color="#848484" />
                  )
                ) : null}
              </TouchableOpacity>
            ) : null}
          </View>
        </BoxShadow>
      </View>
    );
  }

  _renderLocationResultHeader() {
    return (
      <View
        style={{
          width: "100%" - 50,
          height: 50,
          marginLeft: 25,
          marginRight: 10,
          alignItems: "center",
          justifyContent: "center",
          zIndex: 4
        }}
        onLayout={e => {}}
      >
        <View style={{ width: "100%", height: 50, alignItems: "center", justifyContent: "center" }}>
          <Text
            style={{
              color: "#FFFFFF",
              fontWeight: "bold",
              fontSize: 16,
              backgroundColor: "transparent"
            }}
          >
            Find Destination
          </Text>
        </View>
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: 0,
            right: 0
          }}
          onPress={this.onSearchDismiss}
        >
          <Ionicons name="ios-close" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    );
  }

  _renderUserProfileImage() {
    return (
      <View
        style={{
          width: "100%" - 50,
          flex: 0,
          paddingHorizontal: 25,
          paddingVertical: 20
        }}
      >
        <BoxShadow
          setting={{
            width: 45,
            height: 45,
            radius: 22,
            ...GLOBAL_SHADOW_SETTING
          }}
        >
          <TouchableOpacity style={styles.global.profileImageButton} onPress={this.onPressProfile}>
            {Object.keys(this.props.userAccount.data).length == 0 ? (
              <Image
                source={require("../../assets/person.jpg")}
                style={styles.global.profileImageButton__image}
                resizeMode="cover"
              />
            ) : this.props.userAccount.data.personalInfo.photo ? (
              <Image
                source={{ uri: this.props.userAccount.data.personalInfo.photo }}
                style={styles.global.profileImageButton__image}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={require("../../assets/person.jpg")}
                style={styles.global.profileImageButton__image}
                resizeMode="cover"
              />
            )}
            {/* <View style={styles.global.profileImageButton__dot}></View> */}
          </TouchableOpacity>
        </BoxShadow>
      </View>
    );
  }

  _renderLocationResult() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Animated.View
          style={{
            backgroundColor: "#FFFFFF",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            paddingTop: this.state.safeAreaHeight + (Platform.OS == "ios" ? 100 : 80),
            left: 0,
            zIndex: 97
          }}
        >
          <KeyboardAvoidingView behavior="padding">
            <ScrollView style={{ marginTop: 10, padding: 25 }} keyboardShouldPersistTaps="always">
              {this.props.location.data.map((item, key) => (
                <ItemLocation
                  key={item.id}
                  itemData={item}
                  onPress={item => this.onPressItemLocation(item)}
                />
              ))}
            </ScrollView>
          </KeyboardAvoidingView>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

  _renderHeader() {
    return (
      <View
        style={{
          width: "100%",
          backgroundColor: "transparent",
          top: 0,
          position: "absolute",
          zIndex: 98
        }}
        onLayout={e => {
          this.state.headerHeight = e.nativeEvent.layout.height;
        }}
      >
        <SafeAreaView
          forceInset={{ top: "always" }}
          onLayout={e => {
            this.state.safeAreaHeight = e.nativeEvent.layout.height;
          }}
        />
        {this.state.searchFocus
          ? this._renderLocationResultHeader()
          : this._renderUserProfileImage()}
        {this._renderSearchBox()}
        {this.state.searchFocus ? (
          <Animated.View
            style={{
              width: "100%",
              height: this.state.safeAreaHeight + (Platform.OS == "ios" ? 100 : 75),
              backgroundColor: "#F6CF3E",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 3
            }}
          />
        ) : null}
      </View>
    );
  }

  _renderParkingItem({ item, index }) {
    var availableStyle = null;
    if (item.available > 0 && item.available < 30) {
      availableStyle = styles.listItem.parkingListItem__thumb_available_low;
    } else if (item.available > 30 && item.available < 70) {
      availableStyle = styles.listItem.parkingListItem__thumb_available_mid;
    } else if (item.available > 70) {
      availableStyle = styles.listItem.parkingListItem__thumb_available_high;
    }

    return (
      <BoxShadow
        setting={{
          width: screen.width - 50,
          height: 175,
          radius: 15,
          ...GLOBAL_SHADOW_SETTING
        }}
      >
        <View style={styles.listItem.parkingItem}>
          <TouchableOpacity
            style={styles.listItem.parkingItem__thumb}
            onPress={() => {
              this.props.navigation.navigate("ParkingDetail", item._id);
            }}
          >
            <View style={styles.listItem.parkingItem__thumb_details}>
              <View style={styles.listItem.parkingItem__thumb_details_top}>
                <Rating
                  star={item.star}
                  starColor="#FFFFFF"
                  compStyle={{
                    shadowOffset: { width: 0, height: 4 },
                    shadowColor: "#000000",
                    shadowOpacity: 0.1
                  }}
                />
              </View>
              <View style={styles.listItem.parkingItem__thumb_details_bottom}>
                <Text style={styles.listItem.parkingItem__thumb_details_title}>{item.name}</Text>
                <Text style={styles.listItem.parkingItem__thumb_details_price}>
                  {item.price != null && item.price.paid.rate
                    ? "฿" +
                      item.price.paid.rate +
                      (
                        <Text style={styles.listItem.parkingItem__thumb_details_price_sub}>
                          /hour
                        </Text>
                      )
                    : "FREE"}
                </Text>
              </View>
            </View>
            <LinearGradient
              colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.6)"]}
              start={[0, 0]}
              end={[0, 1]}
              style={styles.listItem.parkingItem__thumb_gradient}
            />
            <Image
              source={
                item.photos.length > 0
                  ? { uri: "http://img-cdn.parkernel.com/parking_pic/" + item.photos[0] }
                  : require("../../assets/preview_parking.png")
              }
              style={{ width: "100%", height: 120 }}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <View style={styles.listItem.parkingItem__percentage}>
            {item.available > 0 ? (
              <View
                style={[
                  styles.listItem.parkingItem__percentage_percent,
                  { backgroundColor: "#417505", width: Math.floor(item.available) + "%" }
                ]}
              />
            ) : null}
          </View>
          <View style={styles.listItem.parkingItem__bottom}>
            <View style={styles.listItem.parkingItem__meta}>
              <MaterialIcons name="location-on" size={14} />
              <Text style={styles.listItem.parkingItem__meta_text}>{item.distance}km</Text>
            </View>
            <View style={styles.listItem.parkingItem__actions}>
              <TouchableOpacity
                style={styles.listItem.parkingItem__actions_details_button}
                onPress={() => {
                  this.props.navigation.navigate("ParkingDetail", item._id);
                }}
              >
                <Text style={styles.listItem.parkingItem__actions_details_button_text}>
                  Details
                </Text>
                <Ionicons
                  name="ios-arrow-round-forward"
                  size={14}
                  color="#9B9B9B"
                  style={{ marginLeft: 5 }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.listItem.parkingItem__actions_directions_button}>
                <Text style={styles.listItem.parkingItem__actions_directions_button_text}>
                  Directions
                </Text>
                <MaterialIcons
                  name="directions-car"
                  size={14}
                  color="#FFFFFF"
                  style={{ marginLeft: 5 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BoxShadow>
    );
  }

  _renderMapControls() {
    return (
      <View
        style={{
          padding: 10,
          top: this.state.safeAreaHeight + (Platform.OS == "ios" ? 170 : 150),
          right: 15,
          position: "absolute",
          zIndex: 90
        }}
      >
        <BoxShadow
          setting={{
            width: 40,
            height: 100,
            radius: 20,
            ...GLOBAL_SHADOW_SETTING
          }}
        >
          <View style={styles.button.mapCtrlGroup}>
            <TouchableOpacity
              style={styles.button.mapCtrlGroup__traffic}
              onPress={this.onPressToggleMapTraffic}
            >
              {this.state.mapShowTraffic ? (
                <Image source={require("../../assets/traffic_light/traffic_light.png")} />
              ) : (
                <Image source={require("../../assets/traffic_light_off/traffic_light_off.png")} />
              )}
            </TouchableOpacity>
            <View style={{ width: 25, height: 1, backgroundColor: "#F1F1F1" }} />
            <TouchableOpacity
              style={styles.button.mapCtrlGroup__locate}
              onPress={this.onPressGetCurrentLocation}
            >
              <MaterialIcons
                name="near-me"
                size={20}
                color={this.state.isCurrentRegion ? "#4A90E2" : "#9B9B9B"}
              />
            </TouchableOpacity>
          </View>
        </BoxShadow>
      </View>
    );
  }

  _renderMap() {
    return (
      <MapView
        ref={c => {
          this._map = c;
        }}
        style={{ width: "100%", height: "100%", top: 0, position: "absolute" }}
        initialRegion={this.state.initialRegion}
        region={this.state.mapRegion}
        onRegionChangeComplete={this.onRegionChangeComplete}
        // onRegionChange={this.onRegionChange}
        onLongPress={e => {
          this.onLongPressMap(e.nativeEvent.coordinate);
        }}
        loadingEnabled={true}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsTraffic={this.state.mapShowTraffic}
      >
        {this.state.destinationRegion ? (
          <Marker
            coordinate={{
              latitude: this.state.destinationRegion.latitude,
              longitude: this.state.destinationRegion.longitude
            }}
          />
        ) : null}

        {this.props.parking.data
          ? this.props.parking.data.map((marker, key) => (
              <Marker
                key={key}
                coordinate={{
                  latitude: marker.address.location.coordinates[1],
                  longitude: marker.address.location.coordinates[0]
                }}
                image={require("../../assets/parking_pin/parking_pin.png")}
                onPress={() => this.onMarkerPress(key)}
              />
            ))
          : null}
      </MapView>
    );
  }

  _renderParkingCarousel() {
    return (
      <View style={{ position: "absolute", bottom: 25, left: 0, zIndex: 90, width: "100%" }}>
        {this.props.parking.data.length > 1 ? (
          <WhiteButton
            style={{ marginRight: 25, marginBottom: 10, alignSelf: "flex-end" }}
            onPress={this.onPressOpenParkingFilter}
          >
            <Ionicons name="ios-list" size={17} color="#F5A623" style={{ marginRight: 5 }} />
            <Text style={styles.button.whiteShadowButton__text}>Filter</Text>
          </WhiteButton>
        ) : null}
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          layout={"default"}
          data={this.props.parking.data}
          renderItem={this._renderParkingItem}
          sliderWidth={screen.width}
          itemWidth={screen.width - 50}
          containerCustomStyle={{ overflow: Platform.OS == "ios" ? "default" : null }}
          onSnapToItem={this.onParkingItemScroll}
        />
      </View>
    );
  }

  _renderOverlay(e) {
    return (
      <Animatable.View
        ref={async c => {
          this._overlay = c;
        }}
        style={{
          width: "100%",
          height: this.state.isOpenParkingFilter ? "100%" : 0,
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 99,
          backgroundColor: "rgba(0, 0, 0, 0.7)"
        }}
      >
        <TouchableOpacity style={{ width: "100%", height: "100%" }} onPress={e} />
      </Animatable.View>
    );
  }

  _renderParkingFilter() {
    return (
      <Animatable.View
        ref={c => {
          this._parkingfilter = c;
        }}
        style={{
          width: "100%",
          backgroundColor: "transparent",
          position: "absolute",
          left: 0,
          bottom: this.state.isOpenParkingFilter ? 0 : -374,
          zIndex: 99
        }}
      >
        <View style={{ width: "100%", alignItems: "center", paddingVertical: 10 }}>
          <View style={{ width: 60, height: 4, borderRadius: 2, backgroundColor: "#FFFFFF" }} />
        </View>
        <View
          style={{
            width: "100%",
            height: 360,
            flex: 0,
            flexDirection: "column",
            backgroundColor: "#FFFFFF"
          }}
        >
          <View style={{ width: "100%", flex: 0, padding: 20, marginBottom: 15 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Filter</Text>
          </View>
          <View style={{ width: "100%", paddingHorizontal: 30, flex: 1 }}>
            <DefaultCheckList
              style={{ marginBottom: 15 }}
              label="Distance"
              checked={this.state.searchFilter.distance}
              onPress={() => {
                this.setState({
                  searchFilter: {
                    ...this.state.searchFilter,
                    distance: !this.state.searchFilter.distance
                  }
                });
              }}
            />
            <DefaultCheckList
              style={{ marginBottom: 15 }}
              label="Price"
              checked={this.state.searchFilter.price}
              onPress={() => {
                this.setState({
                  searchFilter: {
                    ...this.state.searchFilter,
                    price: !this.state.searchFilter.price
                  }
                });
              }}
            />
            <DefaultCheckList
              label="Rating"
              checked={this.state.searchFilter.rating}
              onPress={() => {
                this.setState({
                  searchFilter: {
                    ...this.state.searchFilter,
                    rating: !this.state.searchFilter.rating
                  }
                });
              }}
            />
          </View>
          <View style={{ width: "100%", flex: 0, padding: 20 }}>
            <DefaultButton onPress={this.onPressCloseParkingFilter}>
              <Text style={styles.button.defaultButton__text}>Done</Text>
            </DefaultButton>
          </View>
        </View>
      </Animatable.View>
    );
  }

  onPressOpenParkingFilter() {
    this.setState({ isOpenParkingFilter: true });
    this._overlay.transitionTo({ opacity: 1 }, 200);
    this._parkingfilter.transitionTo({ bottom: 0 }, 300);
  }

  onPressCloseParkingFilter() {
    this._overlay.transitionTo({ opacity: 0 }, 200);
    this._parkingfilter.transitionTo({ bottom: -374 }, 200);
    setTimeout(() => {
      this.setState({ isOpenParkingFilter: false }); // wait for animate end
    }, 200);
  }

  onPressOpenAuthenModal() {
    this.props.dispatch({ type: "OPEN_AUTHEN_MODAL" });
  }

  onPressCloseAuthenModal() {
    this.props.dispatch({ type: "CLOSE_AUTHEN_MODAL" });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.global.whiteScreen}>
        {Platform.OS == "ios" ? (
          <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        ) : (
          <StatusBar barStyle="light-content" backgroundColor="transparent" />
        )}

        {this._renderHeader()}
        {this._renderMapControls()}
        {this.state.searchFocus ? this._renderLocationResult() : null}
        {this._renderMap()}
        {this.props.parking.data.length > 0 ? this._renderParkingCarousel() : null}

        {this._renderOverlay(this.onPressCloseParkingFilter)}
        {this._renderParkingFilter()}

        <Modal
          visible={this.props.authenModal.opened}
          animationType="slide"
          onRequestClose={() => {}}
        >
          <AuthenAppStack />
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    parking: state.parking,
    location: state.location,
    userAccount: state.userAccount,
    authenModal: state.authenModal
  };
};

export default connect(mapStateToProps)(MainMapsScreen);
