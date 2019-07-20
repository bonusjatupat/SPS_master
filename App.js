import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import AuthenticationScreen from './screens/AuthenticationScreen/index';
import FloorScreen from './screens/FloorScreen/index';
import MainMapScreen from './screens/MainMapScreen/index'

const AppNavigator = createStackNavigator({
  HomeScreen: { screen: HomeScreen },
  AuthenticationScreen: { screen: AuthenticationScreen },
  FloorScreen: { screen: FloorScreen},
  MainMapScreen: {screen: MainMapScreen}
});

const App = createAppContainer(AppNavigator);

/*class App extends React.Component {
  
  render() {
    return (
      <App />
    );
  }

}*/

export default App;

