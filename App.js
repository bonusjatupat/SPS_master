import React from "react";
import { AppLoading, Font } from "expo";
import { Asset } from 'expo-asset';
import { Platform, StatusBar, YellowBox, SafeAreaView } from "react-native";
import { createStackNavigator, createDrawerNavigator, createAppContainer } from "react-navigation";
import { Provider } from "react-redux";

import AuthenticationLandingScreen from "./screens/Authentication";
import AuthenticationSignUpScreen from "./screens/AuthenticationSignUp";
import AuthenticationSignUpFinalScreen from "./screens/AuthenticationSignUpFinal";
import ForgotPasswordScreen from "./screens/ForgotPassword";
import ChangePasswordScreen from "./screens/ChangePassword";
import MainMapsScreen from "./screens/MainMaps";
import EditProfileScreen from "./screens/EditProfile";
import NewParkingScreen from "./screens/NewParking";
import ParkingDetail from "./screens/ParkingDetail";
import PrivCard from "./screens/PrivCard";
import FloorDetail from "./screens/FloorDetail";
import ReservationDetail from "./screens/ReservationDetail";
import UserProfile from "./screens/UserProfile";
//import Timer from "./components/Timer";

import Sidebar from "./components/Sidebar";

import styles from "./styles";
import store from "./store";

console.disableYellowBox = ["Remote debugger"];
YellowBox.ignoreWarnings([
  "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?"
]);

const cacheImages = images => {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};
const cacheFonts = fonts => {
  return fonts.map(font => Font.loadAsync(font));
};

const generalConfig = {
  cardStyle: {
    paddingTop: Platform.OS == "ios" ? 0 : StatusBar.currentHeight,
    backgroundColor: "#FFFFFF"
  }
};
const MainAppStack = createStackNavigator(
  {
    MainMaps: { screen: MainMapsScreen, path: "/maps" },
    ParkingDetail: { screen: ParkingDetail, path: "/parking-detail" },
    NewParking: { screen: NewParkingScreen, path: "new-parking" },
    FloorDetail:{ screen:FloorDetail, path:"/floor-detail"},
    ReservationDetail:{screen: ReservationDetail, path:'/reservation-detail'},
   // Timer:{screen:Timer,path:""},
    UserProfile:{screen: UserProfile, path:'/user-detail'},
    Authentication: { screen: AuthenticationLandingScreen , path: "/authentication"}
  },
  generalConfig
);

const PrivCardAppStack = createStackNavigator(
  {
    PrivCard: { screen: PrivCard, path: "/priv-card/index" }
  },
  generalConfig
);

const UserProfileAppStack = createStackNavigator(
  {
    EditProfile: { screen: EditProfileScreen, path: "/user/profile" },
    ChangePassword: { screen: ChangePasswordScreen, path: "/user/profile/change-password" }
  },
  generalConfig
);

const DrawerAppStack = createDrawerNavigator(
  {
    Home: { screen: MainAppStack, path: "" },
   // Timer:{ screen:Timer,path:""},
    UserProfile: { screen: UserProfileAppStack, path: "/user" },
    PrivCard: { screen: PrivCardAppStack, path: "/priv-card" }
  },
  {
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
    drawerWidth: 300,
    navigationOptions: {
      drawerLockMode: "locked-closed"
    },
    contentComponent: Sidebar
  }
);
const NavigationAppContainer = createAppContainer(DrawerAppStack);

class App extends React.Component {
  state = {
    isReady: false
  };

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require("./assets/logo/logo.png"),
      require("./assets/logo_header/logo_header.png"),
      require("./assets/logo_typo/logo_typo.png"),
      require("./assets/parking_list_item_pin/parking_list_item_pin.png"),
      require("./assets/box_arrow_down/box_arrow_down.png"),
      require("./assets/searchbox_pin/searchbox_pin.png"),
      require("./assets/traffic_light/traffic_light.png"),
      require("./assets/traffic_light_off/traffic_light_off.png"),
      require("./assets/parking_pin/parking_pin.png"),
      require("./assets/gripper/gripper.png"),
      require("./assets/star_activate/star_activate.png"),
      require("./assets/star_deactivate/star_deactivate.png"),
      require("./assets/faci_car_wash/faci_car_wash.png"),
      require("./assets/faci_coffee/faci_coffee.png"),
      require("./assets/faci_covered_parking/faci_covered_parking.png"),
      require("./assets/faci_guard/faci_guard.png"),
      require("./assets/faci_restaurant/faci_restaurant.png"),
      require("./assets/faci_wifi/faci_wifi.png"),
      require("./assets/preview_parking.png"),
      require("./assets/visa_logo/visa_logo.png"),
      require("./assets/a/car.png"),
      require("./assets/a/dot-and-circle.png"),
      require("./assets/a/locationIcon.png"),
      require("./assets/a/dot.png"),
      require("./assets/a/arrow.png"),
      require("./assets/parking_pin_yellow/parking_pin.png")
    ]);

    const fontAssets = cacheFonts([]);
    await Promise.all([...imageAssets, ...fontAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.error}
        />
      );
    }

    return (
      <Provider store={store}>
        <NavigationAppContainer />
      </Provider>
    );
  }
}

export default App;
