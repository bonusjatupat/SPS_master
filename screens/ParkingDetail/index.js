import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image,
  Modal,
  StatusBar,
  Platform,
  SafeAreaView
} from "react-native";
import { connect } from "react-redux";
import ImageViewer from "react-native-image-zoom-viewer";
import getDirections from "react-native-google-maps-directions";
import { LinearGradient, BlurView, MapView, Constants, Location, Permissions } from "expo";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { joinRealTimeParking, subscribeRealTimeParking } from "../../misc/socketClient";
import config from "../../misc/config";

import styles from "../../styles";
import { NavBackButton_Pure, ModalSubmitButton, ModalExitButton, ModalSubmitButton2 } from "../../components/Button";
import { Rating, RatingMini } from "../../components/General";
import { ItemFacilities } from "../../components/ListItem";

import axios from 'axios';
import _CONFIG from '../../misc/config';

import {ConfirmPopup} from "../../components/Button";
import Dialog, {ScaleAnimation, DialogContent} from 'react-native-popup-dialog';


const HEADER_MAX_HEIGHT = 195,
  HEADER_MIN_HEIGHT = 90,
  HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class ParkingDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Details",
    headerStyle: styles.navbar.white,
    headerTitleStyle: styles.navbar.white__title,
    headerLeft: <NavBackButton_Pure title="BACK" onPress={() => navigation.goBack()} />
  });

  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      location: null,
      previewModal: {
        visible: false,
        index: 0
      },
      parkingData: this.props.parking.data.filter(x => {
        return x._id == this.props.navigation.state.params;
      })[0],
      parkingPreview: [],
      errorVisible: false,
      errorMessage: "",
      isEnoughBalance: true,
      isClickBookNow: false,
      showBalanceDialog: false
    };

    this.openPreviewModal = this.openPreviewModal.bind(this);
    this.openNavigator = this.openNavigator.bind(this);
    this._loadLoginText = this._loadLoginText.bind(this);
    this.onPressBookNow = this.onPressBookNow.bind(this);
    this._renderLoginText = this._renderLoginText.bind(this);
  }

  _loadLoginText() {
    {this.props.userAccount.data.balance >= this.state.parkingData.price.paid.rate ?
      this.setState({ isEnoughBalance: true })
    :
      this.setState({ isEnoughBalance: false })}
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }

    this._loadLoginText();
  }

  componentDidMount() {
    if (this.state.parkingData.photos.length > 0) {
      var parkingImages = [];
      this.state.parkingData.photos.map(i => {
        console.log(config.IMAGE_SERVER_URL + "/parking_pic/" + i);
        parkingImages.push({ url: config.IMAGE_SERVER_URL + "/parking_pic/" + i });
      });

      this.setState({ parkingPreview: parkingImages });
    } else {
      this.setState({
        parkingPreview: [
          {
            url:
              "https://www.aeroportolisboa.pt/sites/default/files/media/06_parking_total_autonomia.jpg"
          },
          {
            url: "http://barcelona-home.com/blog/wp-content/upload/2017/06/parking-955x508.png"
          },
          {
            url:
              "http://parkplusth.com/wp-content/themes/Parkplus/timthumb.php?src=http://parkplusth.com/wp-content/uploads/2014/08/0216-0217-Mashad-2-Iran.jpg&w=950&h=488"
          },
          {
            url: "http://th.dahuasecurity.com/upfiles/banner3.png"
          }
        ]
      });
    }

    this.setCurrentParking();
  }

  setCurrentParking(){
    if(this.state.parkingData){
      axios.get(`${_CONFIG.API_ENDPOINT_URL}/parking/${this.state.parkingData._id}`, null, null)
            .then((response) => {
                if (response.status == 200) {
                    if (response.data.parking) {
                        var parking = {};
                        parking = response.data.parking;
                        parking.opened = this.state.parkingData.opened;
                        parking.star = this.state.parkingData.star;
                        this.props.dispatch({ type: 'FETCH_CURRENTPARKING_FULFILLED', payload: parking });
                    } else {
                        if (response.data.error) {
                            this.setState({ errorVisible: true, errorMessage: response.data.error.message });
                        } else {
                            this.setState({ errorVisible: true, errorMessage: 'Error while fething parking.' });
                        }
                    }
                } else {
                    this.setState({ errorVisible: true, errorMessage: response.data.error });
                }
            })
            .catch((error) => {
                this.setState({ errorVisible: true, errorMessage: response.data.error });
            });
    }else{
      console.log("Not fetching the current parking.")
    }
  }

  openPreviewModal(index) {
    this.setState({
      previewModal: {
        visible: !this.state.previewModal.visible,
        index: index
      }
    });
  }

  openNavigator() {
    const data = {
      source: {
        latitude: this.state.location.coords.latitude,
        longitude: this.state.location.coords.longitude
      },
      destination: {
        latitude: this.state.parkingData.address.location.coordinates[1],
        longitude: this.state.parkingData.address.location.coordinates[0]
      },
      params: [
        {
          key: "travelmode",
          value: "driving"
        }
      ]
    };
    getDirections(data);
  }

  _renderScrollViewContent() {
    const { navigate } = this.props.navigation;
    const data = Array.from({ length: 20 });

    var availableColor = "#417505";
    /*if (this.state.parkingData.available > 0 && this.state.parkingData.available < 30) {
      availableColor = "#D0021B";
    } else if (this.state.parkingData.available > 30 && this.state.parkingData.available < 70) {
      availableColor = "#F5A623";
    } else if (this.state.parkingData.available > 70) {
      availableColor = "#7ED321";
    }*/

    return (
      <View style={{ padding: 20 }}>
        <View style={{ flex: 0, flexDirection: "row", width: "100%" }}>
          {this.state.parkingData.available != -1 ? (
            <View style={{ flex: 1 }}>
              <Text style={{ color: "#000000", fontWeight: "bold", fontSize: 18, backgroundColor: "transparent"}}>
                Available
              </Text>
              <View style={{ flex: 0, flexDirection: "row" }}>
                <Text style={{ color: availableColor, fontWeight: "bold", fontSize: 24 }}>
                  {(this.state.parkingData.numberSlot.total - this.state.parkingData.numberSlot.used)}
                </Text>
                <Text style={{ color: "#AAAAAA", fontWeight: "bold", fontSize: 24}}>
                  /{this.state.parkingData.numberSlot.total}
                </Text>
              </View>
            </View>
          ) : null}
          <View style={{ flex: 1 }}>
            <Text style={{ color: "#000000",  fontWeight: "bold", fontSize: 18, backgroundColor: "transparent"}}>
              Rate
            </Text>
            <Text style={{ color: "#F5A623", fontWeight: "bold", fontSize: 24 }}>
              {this.state.parkingData.price != null && this.state.parkingData.price.paid.rate
                ? "฿" + this.state.parkingData.price.paid.rate
                : "FREE"}
            </Text>
          </View>
        </View>
        <ScrollView
          style={{ width: "100%", paddingTop: 30, paddingBottom: 20 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ flex: 0, flexDirection: "row" }}>
            {this.state.parkingPreview.map((item, key) => (
              <View
                key={key}
                style={{
                  width: 118,
                  height: 75,
                  marginRight: 10,
                  borderRadius: 10,
                  shadowOffset: { width: 0, height: 4 },
                  shadowColor: "#000000",
                  shadowOpacity: 0.1
                }}
              >
                <TouchableOpacity
                  onPress={() => this.openPreviewModal(key)}
                  style={{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden"
                  }}
                >
                  <Image
                    style={{ width: "100%", height: "100%", borderRadius: 10 }}
                    source={{ uri: item.url }}
                    resizeMode="cover"
                    resizeMethod="resize"
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 20,
              backgroundColor: "transparent"
            }}
          >
            Facilities
          </Text>
          <View style={{ flex: 0, flexDirection: "row", flexWrap: "wrap" }}>
            <ItemFacilities
              customItemStyle={{ width: "50%" }}
              facilities={[
                "car_wash",
                "wifi",
                "covered_parking",
                "security",
                "restaurant",
                "coffee"
              ]}
            />
          </View>
        </View>
        <Modal
          visible={this.state.previewModal.visible}
          onRequestClose={() => this.openPreviewModal(0)}
          transparent={true}
          animationType="slide"
        >
          <ModalExitButton onPress={() => this.openPreviewModal(0)} />
          <ImageViewer
            index={this.state.previewModal.index}
            renderHeader={() => <StatusBar barStyle="light-content" />}
            imageUrls={this.state.parkingPreview}
          />
        </Modal>
      </View>
    );
  }

  _renderHeaderIOS() {
    const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: "clamp"
    });
    const headerTextOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE - 50],
      outputRange: [150, 0],
      extrapolate: "clamp"
    });
    const headerTextOpacityReverse = this.state.scrollY.interpolate({
      inputRange: [HEADER_SCROLL_DISTANCE - 50, HEADER_MAX_HEIGHT],
      outputRange: [0, 150],
      extrapolate: "clamp"
    });
    const headerBlur = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: "clamp"
    });

    return (
      <Animated.View
        style={[{overflow: "hidden", height: headerHeight}]}>
        <View style={{flex: 0, flexDirection: "column", width: "100%",height: "100%", position: "absolute",
                    justifyContent:'space-between', padding: 20,zIndex: 99}}>
         
          <Animated.View style={{ flex: 0, alignItems: "flex-end", opacity: headerTextOpacity }}>
            <Rating star={this.state.parkingData.star}  size={9} starColor="#FFFFFF"iconStyle={{textShadowOffset: { width: 0, height: 2 },
                textShadowColor: "rgba(0, 0, 0, 0.1)",textShadowRadius: 4}}/>
          </Animated.View>

          <View style={{ flex: 0, width: "100%", flexGrow:9 ,backgroundColor:'black'}}>
            <View style={{ flex: 0, flexDirection: "row" , backgroundColor:'yellow'}}>

              <View style={{backgroundColor:'green'}}>
              <Text numberOfLines={2} style={{ backgroundColor: "green", color: "#FFFFFF", fontWeight: "800",
                  fontSize: 20, flex: 1, textShadowOffset: { width: 0, height: 2 },textShadowColor: "rgba(0, 0, 0, 0.1)",
                  textShadowRadius: 4 }}>
                {this.state.parkingData.name}
              </Text>
              </View>

              <Animated.View style={{backgroundColor:'pink',opacity: headerTextOpacityReverse, flex: 0, justifyContent: "flex-start", marginLeft: 10,
                  alignItems: "flex-end"}}>
                <RatingMini star={this.state.parkingData.star} compStyle={{shadowOffset: { width: 0, height: 4 }, shadowColor: "#000000",
                    shadowOpacity: 0.1}}/>
              </Animated.View>

            </View>
          </View>

          <Animated.View style={{ flex: 0, opacity: headerTextOpacity, flexGrow:1 }}>
            <Text numberOfLines={2} style={{ backgroundColor: "transparent",  color: "#FFFFFF", fontSize: 12, 
                fontWeight: "bold", textShadowOffset: { width: 0, height: 2 }, textShadowColor: "rgba(0, 0, 0, 0.1)",
                textShadowRadius: 4}}>
               <Ionicons name="md-pin" size={12} color="#FFFFFF" />{this.state.parkingData.address.description}
            </Text>
          </Animated.View>

        </View>
        <LinearGradient
          colors={["#3023AE", "#53A0FD", "#B4EC51"]}
          start={[0, 0]}
          end={[1, 1]}
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "100%",
            zIndex: 98,
            opacity: 0.7
          }}
        />
        <AnimatedBlurView
          tint="light"
          intensity={headerBlur}
          style={{ position: "absolute", top: 0, zIndex: 97, width: "100%", height: "100%" }}
        />
        <Image
          style={{ position: "absolute", top: 0, zIndex: 96, width: "100%", height: "100%" }}
          source={
            this.state.parkingPreview.length > 0 ? { uri: this.state.parkingPreview[0].url } : null
          }
          resizeMode="cover"
        />
      </Animated.View>
    );
  }

  _renderLoginText() {
    return (
      <View style={{ width: '100%', flex: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}>
        <Text style={{ color: '#649BE1', fontWeight: "normal" }}>Please sign in to book a space. </Text>
      </View>
    )
  }

  _renderHeaderAndroid() {
    return (
      <View
        style={[
          {
            overflow: "hidden",
            height: 180
          }
        ]}
      >
        <View
          style={{
            flex: 0,
            flexDirection: "column",
            width: "100%",
            height: "100%",
            position: "absolute",
            padding: 20,
            zIndex: 99,
            justifyContent:'space-between'
          }}
        >
          <View style={{ flex: 0, width: "100%", flexGrow:9 }}>
            <View style={{ flex: 0, flexDirection: "row" }}>
              <View style={{
                  flex: 1,
                  justifyContent: "flex-start"
                }}
              >
                <Text
                  numberOfLines={2}
                  style={{
                    backgroundColor: "transparent",
                    color: "#FFFFFF",
                    fontWeight: "800",
                    fontSize: 20,
                    textShadowOffset: { width: 0, height: 2 },
                    textShadowColor: "rgba(0, 0, 0, 0.1)",
                    textShadowRadius: 4
                  }}
                >
                  {this.state.parkingData.name}
                </Text>
              </View>
              <View
                style={{
                  flex: 0,
                  justifyContent: "flex-start",
                  marginLeft: 10,
                  alignItems: "flex-end"
                }}
              >
                <RatingMini
                  star={this.state.parkingData.star}
                  compStyle={{
                    shadowOffset: { width: 0, height: 4 },
                    shadowColor: "#000000",
                    shadowOpacity: 0.1
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{ flex: 2, flexGrow:1}}>
            <Text
              numberOfLines={2}
              style={{
                backgroundColor: "transparent",
                color: "#FFFFFF",
                fontSize: 12,
                fontWeight: "bold",
                textShadowOffset: { width: 0, height: 2 },
                textShadowColor: "rgba(0, 0, 0, 0.1)",
                textShadowRadius: 4
              }}
            >
              <Ionicons name="md-pin" size={12} color="#FFFFFF" /> {this.state.parkingData.address.description}
            </Text>
          </View>
        </View>
        <LinearGradient
          colors={["#3023AE", "#53A0FD", "#B4EC51"]}
          start={[0, 0]}
          end={[1, 1]}
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "100%",
            zIndex: 98,
            opacity: 0.7
          }}
        />
        <Image
          style={{
            position: "absolute",
            top: 0,
            zIndex: 96,
            width: "100%",
            height: "100%"
          }}
          source={
            this.state.parkingPreview.length > 0 ? { uri: this.state.parkingPreview[0].url } : null
          }
          resizeMode="cover"
        />
      </View>
    );
  }

  _renderBookButton() {
    let result=[];
    {Object.keys(this.props.userAccount.data).length == 0 ? 
      result.push(
        <ModalSubmitButton2> 
          <Text style={styles.button.modalSubmit__text}>BOOK NOW</Text>
        </ModalSubmitButton2>
      ) : 
      result.push(
        <ModalSubmitButton onPress={()=>{this.setState({isClickBookNow: true}); this.onPressBookNow();}}>
          <Text style={styles.button.modalSubmit__text}>BOOK NOW</Text>
        </ModalSubmitButton>
      )
    }
    return result;
  }

  onPressBookNow() {
    console.log(this.state.isEnoughBalance);

    setTimeout(() => {
      if(this.state.isEnoughBalance && this.state.isClickBookNow) {
        this.props.navigation.navigate('FloorDetail')
      } 
    }, 1000)
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={styles.global.whiteScreen}
      >
        <StatusBar barStyle={Platform.OS == "ios" ? "dark-content" : "light-content"} />
        {/* {Platform.OS == 'ios' ? this._renderHeaderIOS() : this._renderHeaderAndroid()}
                {Platform.OS == 'ios' ? (
                    <ScrollView
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
                        )}>
                        {this._renderScrollViewContent()}
                    </ScrollView>
                ) : (
                    <ScrollView>
                        {this._renderScrollViewContent()}
                    </ScrollView>
                )} */}
        {this._renderHeaderAndroid()}
        <ScrollView>{this._renderScrollViewContent()}</ScrollView>
        {Object.keys(this.props.userAccount.data).length == 0 && this.state.parkingData.spsSupported == true ? this._renderLoginText() : null}
        {this.state.parkingData.spsSupported ? this._renderBookButton() : null}

        <Dialog visible={this.state.isClickBookNow && !this.state.isEnoughBalance}
                width='70%'
                dialogAnimation={new ScaleAnimation()}
                footer={<View style={{alignSelf:'center', border:'hidden'}}>
                          <View  style={{alignContent:'center',flexDirection:"row",flex:0, justifyContent:'center'}}>
    
                            <View style={{ width:'60%'}}>
                              <ConfirmPopup style={{borderRadius:10}}> 
                                <Text onPress={()=>{this.setState({ isClickBookNow: false })}} style={styles.button.modalSubmit__text}>OK</Text>
                              </ConfirmPopup>
                            </View>
    
                          </View>             
                        </View>}>
          <DialogContent style={{backgroundColor:'#f6ab05',height:'5%'}}></DialogContent> 
    
          <DialogContent style={{width:"100%"}}>
              <View style={{flex:0,width:'100%'}}>     
                <Text style={{color: '#f6ab05', textAlign: 'center', alignSelf:'center',fontSize:17,fontWeight:'bold',width:'80%'}}>Your balance is not enough.</Text>
              </View>                            
          </DialogContent> 
        </Dialog>

      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    parking: state.parking,
    userAccount: state.userAccount,
    currentParking: state.currentParking
  };
};

export default connect(mapStateToProps)(ParkingDetail);
