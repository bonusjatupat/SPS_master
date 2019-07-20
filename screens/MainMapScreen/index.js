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
    Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BoxShadow } from 'react-native-shadow';

import styles from '../../styles'

const screen = Dimensions.get("window");

const GLOBAL_SHADOW_SETTING = {
    color: "#000000",
    border: 10,
    opacity: 0.05,
    x: 0,
    y: 4
  };

class MainMapScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null,
        gesturesEnabled: false
    });

    constructor(props) {
        super(props);

        this.initState = this.initState.bind(this);

        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchFocus = this.onSearchFocus.bind(this);
        this.onSearchDismiss = this.onSearchDismiss.bind(this)

        this._renderLocationResultHeader = this._renderLocationResultHeader.bind(this)
        this._renderUserProfileImage = this._renderUserProfileImage.bind(this)
        this._renderSearchBox = this._renderSearchBox.bind(this)
        this._renderHeader = this._renderHeader.bind(this)

        this.initState();
    }

    initState() {
        this.state = {
            headerHeight: 0,
            SafeAreaHeight: 0,
            searchFocus: false,
            searchStyle: {
                box: null,
                field: null
            },
            searchKeyword: "",
            searchingLocation: false,
        }
    }

    onSearchChange(text) {
        this.setState({
            searchKeyword: text,
            searchingLocation: true
        });

        //this.debouncedSearchChange()
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
                    height: 100,
                    //marginLeft: 25,
                    //marginRight: 10,
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
                            //value={this.state.searchKeyword}
                            onFocus={this.onSearchFocus}
                            onChangeText={text => this.onSearchChange(text)}
                        />
                        {/*this.state.searchKeyword.length > 0 ? (
                            <TouchableOpacity
                                style= {styles.form.searchBox__field_clear}
                                onPress={() => this.setState({ searchKeyword: "" })}
                            >
                                {this.state.searchKeyword.length > 0 ? (
                                    this.props.location.fetching ? (
                                        <ActivityIndicator size="small" color="#848484"/>
    
                                    ) : (
                                        <Ionicons name="ios-close-circle" size={20} color="#848484" />
                                    )
                                ) : null}
                            </TouchableOpacity>
                        ) : null*/}
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
                        this.state.SafeAreaHeight = e.nativeEvent.layout.height;
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


            </View>
        )
    }
}

export default MainMapScreen;