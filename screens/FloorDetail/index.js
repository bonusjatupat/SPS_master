import React, {Component } from 'react';
import { Text, View, Image, ScrollView , TouchableOpacity} from 'react-native';
import { ModalSubmitButton1, ModalSubmitButton2, FloorButton} from "../../components/Button";
import styles  from '../../styles';

class FloorDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Floor"
  });

  constructor(props) {
    super(props);
    this.state = {
        floorsWFacilities:[{floor:1,facilities:"Accessorize , Marks & Spensors "},
                           {floor:2,facilities:"H&M , Adidas , Nike , Pink Wissy"},
                           {floor:3,facilities:"Topshop , Miss Selfridge"},
                           {floor:4,facilities:"Shabu Shabu , Playground , Burger King , Dessert World"},
                           {floor:5,facilities:"Topshop , Miss Selfridge"},
                           {floor:6,facilities:"Shabu Shabu , Playground , Burger King , Dessert World"}],//database the floors and their facilities
        floorChosen: false,
        location:'999/9 Rama I Road, Pathum Wan, Bangkok, Thailand',// database get address of location
        score:'4.5',// database get score of the location
        color:'',
        active:0,
        activeCount:0,
        buttonCount:0, 
      };
      this.countFloorChosen=this.countFloorChosen.bind(this);
  }

  componentDidMount(){
    this.setState({data:this.loadButton(this.state.floorsWFacilities)})
  }

  countFloorChosen = () => {
    this.setState({
      floorChosen: true,
    })
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
        <ModalSubmitButton1 onPress={()=>this.props.navigation.navigate('ReservationDetail')}> 
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
          <View key={i} style={{flex: 1,minHeight:70,maxHeight:70,flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity  style={{width:'100%', height:'100%',flexDirection:'row',justifyContent:'center', borderBottomWidth:1, borderBottomColor:'gray'}} onPress={()=>{this.setState({active:i,buttonCount:1,activeCount:1});}}>
            <View style={{flex: 1, justifyContent:'center',alignSelf:'center'}}>
                <FloorButton style={{backgroundColor:'orange'}} onPress={()=>{this.setState({active:i,buttonCount:1,activeCount:1});}} ><Text>{temp[i].floor}</Text></FloorButton>
              </View>
              <View style={{flex: 2, justifyContent:'center',alignSelf:'center'}}>
                <Text>{temp[i].facilities}</Text>
              </View>
            </TouchableOpacity>
          </View>)
      }
      else{
        if(i==this.state.active){
          result.push(
          <View key={i} style={{flex: 1,minHeight:70,maxHeight:70,flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity  style={{width:'100%', height:'100%',flexDirection:'row',justifyContent:'center', borderBottomWidth:1, borderBottomColor:'gray'}} onPress={()=>{this.setState({active:i,buttonCount:1,activeCount:1});}}>
              <View style={{flex: 1, justifyContent:'center',alignSelf:'center'}}>
                <FloorButton style={{backgroundColor:'red'}} onPress={()=>{this.setState({active:i,buttonCount:1,activeCount:1});}}><Text>{temp[i].floor}</Text></FloorButton>
              </View>
              <View style={{flex: 2, justifyContent:'center',alignSelf:'center'}}>
                <Text>{temp[i].facilities}</Text>
              </View>
            </TouchableOpacity>
          </View>)
        }else{
          result.push(
          <View key={i} style={{flex: 1,minHeight:70,maxHeight:70,flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity  style={{width:'100%', height:'100%',flexDirection:'row',justifyContent:'center', borderBottomWidth:1, borderBottomColor:'gray'}} onPress={()=>{this.setState({active:i,buttonCount:1,activeCount:1});}}>
              <View style={{flex: 1, justifyContent:'center',alignSelf:'center'}}>
                <FloorButton style={{backgroundColor:'orange'}} onPress={()=>{this.setState({active:i,buttonCount:1,activeCount:1});}}><Text>{temp[i].floor}</Text></FloorButton>
              </View>
              <View style={{flex: 2, justifyContent:'center',alignSelf:'center'}}>
                <Text>{temp[i].facilities}</Text>
              </View>
            </TouchableOpacity>
          </View>)
      }
    }
    }
    return result;
  }

  render() {
    floorChosen='red',
    floorAuto='orange',
    chosenOne=''
    if(this.state.floorChosen==true){
      chosenOne=floorChosen
    }else{
      chosenOne=floorAuto
    }
    return (
      <View style={{flex:1}}>  
              
      <View style={{ flex: 11}}>

        <View style={{ flex: 4}}>
          <Image style={{width: '100%', height: '100%', opacity: 0.8}} source={{uri: 'https://img.wongnai.com/p/1920x0/2016/07/04/4ac5e0892b514026adf2d4615fbfd087.jpg'}}/>
          <View style={{marginTop:'35%',paddingLeft:10,marginLeft:'5%', width:300,maxHeight:65, position:'absolute', fontSize:19,color:'#ffff',backgroundColor:'#ff9a00',opacity:0.85,borderRadius:5}}> 
            <Image style={{marginTop:14,width:30, height:30}}source={require('../../assets/a/locationIcon2.png')}/>
            <Text style={{marginTop:10, marginLeft:40, width:350, position:'absolute', fontSize:19,color:'#ffff'}}>{this.state.location}</Text>
          </View>
          <View style={{flexDirection:"row",marginTop:20,paddingLeft:10,marginLeft:'80%', maxWidth:70,minHeight:40, position:'absolute', fontSize:10,color:'#ffff',backgroundColor:'#ff9a00',opacity:0.85,borderRadius:5}}>
            <Image style={{flex:1,width:20, height:20,marginTop:10}}source={require('../../assets/a/star.png')}/>                                  
            <Text style={{flex:2,marginLeft:5,fontSize:19,color:'#ffff',marginTop:10}}>{this.state.score}</Text>
          </View>
       </View>

       <View style={{ flex: 7}}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          </View>
          <View style={{flex: 4}}>
          <ScrollView>
            <View>
              {this.loadButton(this.state.floorsWFacilities)}
            </View>
          </ScrollView>
          </View>            
        </View>

      </View>

      <View style={{ flex: 0}}>
        {this.loadReserveButton()}
      </View>

    </View>
    )
  }
}

export default FloorDetail;