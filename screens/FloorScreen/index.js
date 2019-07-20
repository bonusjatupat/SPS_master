import React, {Component } from 'react';
import { Text, View, Image, ScrollView, FlatList } from 'react-native';
import { ModalSubmitButton, FloorButton } from "../../components/Button";
import styles  from '../../styles';


class FloorScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Floor"
  });

  constructor(props) {
    super(props);
    this.state = {
      numberFloor: 3,
      floors: null,
      //floorFacilities: "Accessorize , Marks & Spensors , Topshop , Miss Selfridge",
      floorChosen: false
    };
  }

  componentDidMount() {
    return fetch('http://192.168.1.109:3030/reservationProcess/5cbacf94b0e3bb255cb21b20/5ce51de0a0d5672a68c3eb0c/checkParkingFloor')
        .then((res) => res.json())
        .then((resJson) => {
          this.setState({
              numberFloor: resJson.numberFloor,
              floors: resJson.floors
          })
        })
  }

  countFloorChosen = () => {
    this.setState({
      floorChosen: true
    })
  }


  render() {

      
        /*let floor = this.state.floors.map((val, key) => {
          return 
            <View key={key} style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    
              <View style={{flex: 1}}>
                <FloorButton onPress={this.countFloorChosen}>
                  <Text>{val.floorNumber}</Text>
                </FloorButton>
              </View>

              <View style={{flex: 2}}>
                <Text>{val.facilities}</Text>
              </View>
            </View>
        });*/

      return (
          <View>
            <ScrollView>
            <View style={{ flex: 4}}>
              <Image
                style={{width: '100%', height: '100%'}}
                source={{uri: 'https://img.wongnai.com/p/1920x0/2016/07/04/4ac5e0892b514026adf2d4615fbfd087.jpg'}}
              />
            </View>

            <View style={{ flex: 7}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                          <Text style={styles.text.topicText}>Please select a floor</Text>
                        </View>                        

                        <View style={{flex: 4}}>
                          <FlatList data={this.state.floors} renderItem={({ item }) => {
                            return (
                              <View style={{flex: 3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1}}>
                                <View style={{flex: 1}}>
                                  <FloorButton onPress={this.countFloorChosen}>
                                    <Text>{item.floorNumber}</Text>
                                  </FloorButton>
                                </View>

                                <View style={{flex: 2}}>
                                  <Text>{item.facilities}</Text>
                                </View>
                              </View>
                            )
                          }}/>
                        </View>
            </View>

            <View style={{ flex: 1}}>
              <ModalSubmitButton> 
                <Text style={styles.button.modalSubmit__text}>RESERVE</Text>
              </ModalSubmitButton>
            </View>
          </ScrollView>
          </View>
      );
    }
}

export default FloorScreen;