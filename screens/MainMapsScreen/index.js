import React, { Component } from 'react';
import { 
    Text, 
    View, 
    TextInput, 
    Image, 
    SafeAreaView, 
    Platform, 
    StatusBar, 
    TouchableOpacity, 
    ActivityIndicator, 
    Dimensions,
    Animated,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { BoxShadow } from 'react-native-shadow';
import { Location, MapView, Permissions } from 'expo';


import { connect } from "react-redux";
import { ItemLocation } from "../../components/ListItem";
import { fetchLocations } from "../../actions/locationAction";
import styles from '../../styles';

const { Marker } = MapView;

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

class MainMapsScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null,
        gesturesEnabled: false
    });

    constructor(props) {
        super(props);

        this.initState = this.initState.bind(this);

        this.onSearchChange = this.onSearchChange.bind(this)
        this.onSearchFocus = this.onSearchFocus.bind(this)
        this.onSearchDismiss = this.onSearchDismiss.bind(this)
        this.onPressToggleMapTraffic = this.onPressToggleMapTraffic.bind(this)
        this.onPressGetCurrentLocation = this.onPressGetCurrentLocation.bind(this)
        this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this)

        this._getLocationAsync = this._getLocationAsync.bind(this)
        this._renderLocationResultHeader = this._renderLocationResultHeader.bind(this)
        this._renderUserProfileImage = this._renderUserProfileImage.bind(this)
        this._renderSearchBox = this._renderSearchBox.bind(this)
        this._renderHeader = this._renderHeader.bind(this)
        this._renderMapControls = this._renderMapControls.bind(this)
        this._renderMap = this._renderMap.bind(this)

        this.initState();
    }

    componentDidMount(){
        this._getLocationAsync();
        setInterval(() => {
            this._getLocationAsync();
        }, 3000);
    }

    initState() {
        this.state = {
            isFirstTimeFetchGPS: false,
            headerHeight: 0,
            safeAreaHeight: 0,
            searchFocus: false,
            searchStyle: {
                box: null,
                field: null
            },
            searchKeyword: "",
            searchingLocation: false,
            mapShowTraffic: false,
            isCurrentRegion: false,
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
            destinationRegion: null
        }
    }

    debouncedSearchChange() {
        var timerId = this.timerId;
        var self = this;
        console.log(this.state.currentRegion.latitude+","+this.state.currentRegion.longitude+","+this.state.searchKeyword);
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
    
        /*if (this.props.parking.data.length > 0) {
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
        );*/
    }

    onSearchChange(text) {
        this.setState({
            searchKeyword: text,
            searchingLocation: true
        });

        this.debouncedSearchChange()
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

        Keyboard.dismiss
        this.refs["searchBoxField"].blur();
    }

    onPressToggleMapTraffic() {
        this.setState({ mapShowTraffic: !this.state.mapShowTraffic });
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
    }

    onRegionChangeComplete(region){
        this.setState({
            isCurrentRegion: false,
            mapRegion: region
        });
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if(status !== "granted"){
            this.setState({
                errorMessage: "Permission to access location was dinied"
            });
        }
        let location = await Location.getCurrentPositionAsync({});
        if(this.state.isFirstTimeFetchGPS == false){
            this.setState({
                isFirstTimeFetchGPS: true,
                isCurrentRegion: true,
                initialRegion:{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    ...this.state.regionDelta
                },
                mapRegion: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    ...this.state.regionDelta
                }
            });
        }
        this.setState({
            currentRegion:{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }
        });
    }


    /*onPressProfile() {
        if (Object.keys(this.props.userAccount.data).length == 0) {
          this.onPressOpenAuthenModal();
        } else {
          this.props.navigation.navigate("DrawerOpen");
        }
    }*/

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
                    zIndex: 4,
                    backgroundColor: "#F6CF3F"
                }}
                onLayout={e => {}}    
            >
                <View style={{ width: "100%", height: 50, alignItems: "center", justifyContent: "center"}}>
                    <Text
                        style={{
                            color: "#FFFFFF",
                            fontWeight: "bold",
                            fontSize: 16,
                            backgroundColor: "transparent"
                        }}
                    >Find Destination</Text>
                </View>
                <TouchableOpacity
                    style={{
                        width: 50,
                        height: 50,
                        alignItems: "center",
                        justifyContent: "center",
                        position: "absolute",
                        top: 0,
                        right: 10
                    }}
                    onPress={this.onSearchDismiss}
                >
                    <Ionicons name="ios-close" size={30} color="#FFFFFF"/>
                </TouchableOpacity>
            </View>
        )
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
                        {console.log(this.props.location.data)}
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
        )
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
                    setting= {{
                        width: 45,
                        height: 45,
                        radius: 22,
                        ...GLOBAL_SHADOW_SETTING
                    }}
                >
                    <TouchableOpacity style={styles.global.profileImageButton} //onPress={this.onPressProfile}
                    >
                    {/*Object.keys(this.props.userAccount.data).length == 0 ? (
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
                        )*/
                    } 
                        <Image
                            source={require("../../assets/person.jpg")}
                            style={styles.global.profileImageButton__image}
                            resizeMode="cover"
                        />   
                    </TouchableOpacity>
                </BoxShadow>
            </View>
        );
    }

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

    _renderHeader() {
        return (
            <View 
                style={{
                    width:"100%",
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
        )
    }

    _renderMapControls(){
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
                            onPress={this.onPressGetCurrentLocation}>
                            <MaterialIcons
                                name="near-me"
                                size={20}
                                color={this.state.isCurrentRegion ? "#4A90E2" : "#9B9B9B"}
                            />
                        </TouchableOpacity>
                    </View>

                </BoxShadow>
            </View>
        )
    }

    _renderMap() {
        return (
            <MapView
                style={{ width: "100%", height: "100%", top: 0, position: "absolute" }}
                initialRegion={this.state.initialRegion}
                region={this.state.mapRegion}
                onRegionChangeComplete={this.onRegionChangeComplete}
                
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
            </MapView>
        )

            {/*this.props.parking.data
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
            : null} */}
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

            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
      //parking: state.parking,
      location: state.location
      //userAccount: state.userAccount,
      //authenModal: state.authenModal
    };
  };
  
  export default connect(mapStateToProps)(MainMapsScreen);