import React, {Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class HomeScreen extends Component {
    render() {
      return (
        <View style={styles.container}>
            <Text>This is HomeScreen</Text>
            <Button onPress={()=>this.props.navigation.navigate('AuthenticationScreen')} title="Authentication Screen"/>
            <Button onPress={()=>this.props.navigation.navigate('FloorScreen')} title="Floor Screen"/>
            <Button onPress={()=>this.props.navigation.navigate('MainMapScreen')} title="MainMap Screen"/>
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default HomeScreen;