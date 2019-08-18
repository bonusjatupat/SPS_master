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

import styles from "../../styles";

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
        }
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
                    style = {{
                        flex: 0,
                        flexDirection: "column",
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        padding: 20,
                        zIndex: 99
                    }}
                >
                    <View style={{ flex: 1, width: "100%" }}>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View
                                style={{
                                flex: 1,
                                justifyContent: "center"
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
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <SafeAreaView
                forceInset={{ top: "always", bottom: "never"}}
                style={styles.global.whiteScreen}
            >
                <StatusBar barStyle={Platform.OS == "ios" ? "dark-content" : "light-content"} />


            </SafeAreaView>
        );
    }
}

export default ParkingDetail;