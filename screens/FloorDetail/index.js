import React, {Component } from 'react';
import { Text, View, Image, ScrollView , TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator} from 'react-native';
import { NavBackButton_Pure, ModalSubmitButton1, ModalSubmitButton2, FloorButton} from "../../components/Button";
import { RatingMini } from "../../components/General";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient} from "expo";
import styles  from '../../styles';

import { connect } from "react-redux";
import { fetchReserveInfo } from "../../actions/reservationAction";

class FloorDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Floor",
    headerStyle: styles.navbar.white,
    headerTitleStyle: styles.navbar.white__title,
    headerLeft: <NavBackButton_Pure title="BACK" onPress={() => navigation.goBack()} />
  });

  constructor(props) {
    super(props);
    this.state = {
        floors: [],
        /*floorsWFacilities:[{floor:1,facilities:"Accessorize , Marks & Spensors "},
                           {floor:2,facilities:"H&M , Adidas , Nike , Pink Wissy"},
                           {floor:3,facilities:"Topshop , Miss Selfridge"},
                           {floor:4,facilities:"Shabu Shabu , Playground , Burger King , Dessert World"},
                           {floor:5,facilities:"Topshop , Miss Selfridge"},
                           {floor:6,facilities:"Shabu Shabu , Playground , Burger King , Dessert World"}],//database the floors and their facilities*/
        floorChosen: false,
        location: this.props.currentParking.data.address.description, // database get address of location
        score: this.props.currentParking.data.star, // database get score of the location
        color:'',
        active:0,
        activeCount:0,
        buttonCount:0, 
      };

      this.countFloorChosen = this.countFloorChosen.bind(this);
      this.setFloors = this.setFloors.bind(this);
      this.fetchReserveInfo = this.fetchReserveInfo.bind(this);

      this.setFloors();
  }

  componentDidMount(){
    /*if(this.state.floors.length > 0){
      this.setState({data:this.loadButton(this.state.floors)});
    }*/
  }

  setFloors(){
    var tempFloors = this.state.floors;
    this.props.currentParking.data.floor.map((item, index) => {
        var tempFloor = {}
        tempFloor = item;     
        tempFloors.push(tempFloor);
    });

    this.setState({ floors: tempFloors });

    if(this.state.floors.length > 0){
      this.setState({data:this.loadButton(this.state.floors)});
    }
  }

  countFloorChosen = () => {
    this.setState({
      floorChosen: true,
    })
  }

  fetchReserveInfo(){
    this.props.dispatch(fetchReserveInfo(this.props.userAccount.data._id, this.props.currentParking.data._id, 1));
    
    setTimeout(() => {
      this.props.navigation.navigate('ReservationDetail');
    }, 3000)
  }

  loadReserveButton(){
    let result=[];
    if(this.state.buttonCount==0){
      result.push(
        <ModalSubmitButton2> 
          <Text style={styles.button.modalSubmit__text}>RESERVE</Text>
        </ModalSubmitButton2>
      )
    }
    else if(this.state.buttonCount==1){
      result.push(
        <ModalSubmitButton1 onPress={()=>this.fetchReserveInfo()}> 
          <Text  style={styles.button.modalSubmit__text}>RESERVE</Text>
        </ModalSubmitButton1>
      )
    }
    return result;
  }

  loadButton(temp){
    let result=[];
    for (let i =0;i<temp.length;i++){
      if(this.state.activeCount==0){
        result.push(
          <View key={i} style={{flex: 1,minHeight:75,maxHeight:75,flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity  
              style={{width:'100%', height:'100%',flexDirection:'row',justifyContent:'center', borderBottomWidth:1, borderBottomColor:'#D5D4D4'}} 
              onPress={()=>{this.setState({active:i,buttonCount:1,activeCount:1});}}>
            <View style={{flex: 1, justifyContent:'center',alignSelf:'center'}}>
                <FloorButton 
                  style={{backgroundColor:'#F6CF3F'}} 
                  onPress={()=>{this.setState({active:i,buttonCount:1,activeCount:1});}}
                >
                  <Text style={{color:'#FFFFFF', fontWeight: "bold", fontSize: 18}}>{temp[i].floorNumber}</Text>
                </FloorButton>
              </View>
              <View style={{flex: 2, justifyContent:'center',alignSelf:'center'}}>
                <Text style={{color:'#777777'}}>{temp[i].facilities}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      }
      else{
        if(i==this.state.active){
          result.push(
          <View key={i} style={{flex: 1,minHeight:75,maxHeight:75,flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity  
              style={{width:'100%', height:'100%',flexDirection:'row',justifyContent:'center', borderBottomWidth:1, borderBottomColor:'#D5D4D4'}} 
              onPress={()=>{this.setState({active:i,buttonCount:1,activeCount:1});}}>
              <View style={{flex: 1, justifyContent:'center',alignSelf:'center'}}>
                <FloorButton 
                  style={{backgroundColor:'red'}} 
                  onPress={()=>{this.setState({active:i,buttonCount:1,activeCount:1});}}
                >
                    <Text style={{color:'#FFFFFF', fontWeight: "bold", fontSize: 18}}>{temp[i].floorNumber}</Text>
                </FloorButton>
              </View>
              <View style={{flex: 2, justifyContent:'center',alignSelf:'center'}}>
                <Text style={{color:'#777777'}}>{temp[i].facilities}</Text>
              </View>
            </TouchableOpacity>
          </View>)
        }else{
          result.push(
          <View key={i} style={{flex: 1,minHeight:75,maxHeight:75,flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity  
              style={{width:'100%', height:'100%',flexDirection:'row',justifyContent:'center', borderBottomWidth:1, borderBottomColor:'#D5D4D4'}} 
              onPress={()=>{this.setState({active:i,buttonCount:1,activeCount:1});}}
            >
              <View style={{flex: 1, justifyContent:'center',alignSelf:'center'}}>
                <FloorButton 
                  style={{backgroundColor:'#F6CF3F'}} 
                  onPress={()=>{this.setState({active:i,buttonCount:1,activeCount:1});}}
                >
                  <Text style={{color:'#FFFFFF', fontWeight: "bold", fontSize: 18}}>{temp[i].floorNumber}</Text>
                </FloorButton>
              </View>
              <View style={{flex: 2, justifyContent:'center',alignSelf:'center'}}>
                <Text style={{color:'#777777'}}>{temp[i].facilities}</Text>
              </View>
            </TouchableOpacity>
          </View>)
      }
    }
    }
    return result;
  }

  _renderHeaderAndroid() {
    return (
      <View
        style={[{
            overflow: "hidden",
            height: 180
          }]}
      >
        <View
          style={{
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
                  {this.props.currentParking.data.name}
                </Text>
              </View>
              <View
                style={{
                  flex: 0,
                  justifyContent: "center",
                  marginLeft: 10,
                  alignItems: "flex-end"
                }}
              >
                <RatingMini
                  star={this.props.currentParking.data.star}
                  compStyle={{
                    shadowOffset: { width: 0, height: 4 },
                    shadowColor: "#000000",
                    shadowOpacity: 0.1
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{ flex: 0 }}>
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
              <Ionicons name="md-pin" size={12} color="#FFFFFF" /> {this.props.currentParking.data.address.description}
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
            { uri: "https://www.aeroportolisboa.pt/sites/default/files/media/06_parking_total_autonomia.jpg" } 
          }
          resizeMode="cover"
        />
      </View>
    );
  }

  render() {
    floorChosen='red',
    floorAuto='#F6CF3F',
    chosenOne=''
    if(this.state.floorChosen==true){
      chosenOne=floorChosen
    }else{
      chosenOne=floorAuto
    }

    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={styles.global.whiteScreen}
      >
        <StatusBar barStyle={Platform.OS == "ios" ? "dark-content" : "light-content"} />
        {this._renderHeaderAndroid()}
        <ScrollView>
          <View style={{justifyContent: 'center', alignItems: 'center', paddingVertical: 20}}>
            <Text
                  style={{
                    color: "#000000",
                    fontWeight: "bold",
                    fontSize: 18,
                    backgroundColor: "transparent",
                    textAlign: "center"
                  }}
                >
                  Please select a floor
                </Text>
            </View>
            <View>
              {this.loadButton(this.state.floors)}
            </View>
          </ScrollView>
          {this.loadReserveButton()}
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {
    userAccount: state.userAccount,
    currentParking: state.currentParking,
    reservation: state.reservation
  };
};

export default connect(mapStateToProps)(FloorDetail);