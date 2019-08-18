import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import AuthenticationScreen from './screens/AuthenticationScreen/index';
import FloorScreen from './screens/FloorScreen/index';
import MainMapsScreen from './screens/MainMapsScreen/index';

import { Provider } from "react-redux";
import store from "./store";

const AppNavigator = createStackNavigator({
  HomeScreen: { screen: HomeScreen },
  AuthenticationScreen: { screen: AuthenticationScreen },
  FloorScreen: { screen: FloorScreen},
  MainMapsScreen: {screen: MainMapsScreen}
});

const NavigationAppContainer = createAppContainer(AppNavigator);

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <NavigationAppContainer />
      </Provider>
    );
  }

}

export default App;

