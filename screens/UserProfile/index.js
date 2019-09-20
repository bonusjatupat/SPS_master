import _CONFIG from '../../misc/config';
import React, {Component } from 'react';
import { Text, View, Image, ScrollView , TouchableOpacity} from 'react-native';
import Icon from '../../components/Icons';
import styles  from '../../styles';
import { connect } from "react-redux";
import axios from 'axios';
import { NavBackButton_Pure, NavEditProfile } from "../../components/Button";


class UserProfile extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  constructor(){
    super();
    this.state={
      visible:false,
      balance: 5000.00,
      username:'jackie237',
      name: 'Jack Enderson',
      phone:'+6683092048',
      email:'jackiere@gmail.com',
      address:'Ratcadaphisek Road, Wat Thapra'
    };

    this.fetchCurrentUser = this.fetchCurrentUser.bind(this);
    this.onPressLogOut = this.onPressLogOut.bind(this);
  }

  fetchCurrentUser(){
    axios.get(`${_CONFIG.API_ENDPOINT_URL}/user/${this.props.userAccount.data._id}/`, null, null)
            .then((response) => {
                //console.log("response before if : "+ response.data.user.local.email);
                if (response.status == 200) {
                    if (response.data.user) {
                        this.props.dispatch({ type: 'FETCH_USER_ACCOUNT_FULFILLED', payload: response.data.user });
                        this.props.dispatch({ type: 'CLOSE_AUTHEN_MODAL' });
                    } else {
                        if (response.data.error) {
                            this.setState({ errorVisible: true, errorMessage: response.data.error.message });
                        } else {
                            this.setState({ errorVisible: true, errorMessage: 'Error while signing in.' });
                        }
                    }
                } else {
                    this.setState({ errorVisible: true, errorMessage: response.data.error });
                }
            })
            .catch((error) => {
                this.setState({ errorVisible: true, errorMessage: response.data.error });
            });
  }

  onPressLogOut(){
    this.props.navigation.navigate('MainMaps')
    //this.props.dispatch({ type: 'FETCH_USER_ACCOUNT_FULFILLED', payload: {} });
  }

  render() {
      this.fetchCurrentUser()
      
      return (
      <View style={{height:'100%',width:'100%',flexDirection:'column'}}>
        <View style={{height:'35%', backgroundColor:'#F6CF3E', zIndex:1}}>
          <View style={{flexDirection:'row',height:'25%', width:'100%'}}>
            <View style={{alignSelf:'flex-end', width:'40%'}}>
                <TouchableOpacity  style={{width:'30%', alignSelf:'flex-start'}} onPress={()=>{{this.props.navigation.navigate('MainMaps')}}}>
                    <Icon.MaterialCommunityIcons name="keyboard-backspace" size={30} color="#252525" style={{marginLeft:20}}/>
                </TouchableOpacity>
            </View>   
            <Text style={{width:'20%', alignSelf:'flex-end',textAlign:'center',fontSize:18,fontWeight:'900',color:'#252525'}}>Profile</Text>
            <View style={{alignSelf:'flex-end', width:'40%'}}> 
                <TouchableOpacity disabled={true} style={{width:'30%', alignSelf:'flex-end'}} onPress={()=>{{this.props.navigation.navigate('MainMaps')}}}>
                    <Icon.MaterialCommunityIcons name="square-edit-outline" size={30} color="#252525" style={{marginRight:20}}/>
                </TouchableOpacity>
            </View>   
          </View>
        </View>
        <View style={{alignSelf:'center',flexDirection:'column',height:'65%',width:'100%',zIndex:2,marginTop:'-45%'}}>
          <View style={{height:'35%',width:'110%',justifyContent:'center',zIndex:3,alignSelf:'center'}}>
            <View style={{height:'75%',width:'35%',backgroundColor:'blue',alignSelf:'center',justifyContent:'center',borderRadius:150,borderColor:'#afafaf',borderWidth:4, zIndex:3}}>
              <Image/>
            </View> 
           {/* <TouchableOpacity style={{width:'10%', alignSelf:'center',justifyContent:'center',zIndex:2}} onPress={()=>{{navigation.navigate('HomeScreen')}}}>
                 <View style={{height:'50%',width:'80%',backgroundColor:'white',alignSelf:'center',justifyContent:'center',borderRadius:100}}>
                      <Icon.MaterialCommunityIcons name="square-edit-outline" size={20} color="black" style={{marginRight:20,alignSelf:'center'}}/>          
                </View>
              </TouchableOpacity>*/}
          </View>
          <View style={{width:'80%', height:'70%', flexDirection:'column',borderWidth:1, borderColor:'#252525',backgroundColor:'#fff',borderRadius:30,alignSelf:'center',justifyContent:'center', marginTop:'-15%',zIndex:2}}>
            <View style={{flexGrow:2.5,borderBottomColor:'#252525',borderBottomWidth:1,justifyContent:'center'}}>
              <Text style={{alignSelf:'center',fontSize:20,fontWeight:'900',color:'#909090'}}>Available Balance</Text>
              <Text style={{alignSelf:'center',fontSize:30,fontWeight:'900', color:'#F6AB05'}}>฿ {this.props.userAccount.data.balance}</Text>
            </View>
            <View style={{flexGrow:1,borderBottomColor:'#252525',borderBottomWidth:1, flexDirection:'row'}}>
                <View style={{width:'50%',alignSelf:'center'}}><Text style={{alignSelf:'flex-start',marginLeft:30, fontSize:17,color:'#909090',fontWeight:'900'}}>User Name</Text></View>
                <View style={{width:'50%',alignSelf:'center'}}><Text style={{alignSelf:'flex-end', marginRight:30, fontSize:17,textAlign:'right', color:'#252525'}}>{this.props.userAccount.data.local.username}</Text></View>
            </View>
            <View style={{flexGrow:1,borderBottomColor:'#252525',borderBottomWidth:1, flexDirection:'row'}}>
              <View style={{width:'50%',alignSelf:'center'}}><Text style={{alignSelf:'flex-start',marginLeft:30, fontSize:17,color:'#909090',fontWeight:'900'}}>Name</Text></View>
                <View style={{width:'50%',alignSelf:'center'}}><Text style={{alignSelf:'flex-end', marginRight:30, fontSize:17, textAlign:'right',color:'#252525'}}>{this.props.userAccount.data.personalInfo.name}</Text></View>
            </View>
            <View style={{flexGrow:1,borderBottomColor:'#252525',borderBottomWidth:1, flexDirection:'row'}}>
                <View style={{width:'50%',alignSelf:'center'}}><Text style={{alignSelf:'flex-start',marginLeft:30, fontSize:17,color:'#909090',fontWeight:'900'}}>Phone</Text></View>
                <View style={{width:'50%',alignSelf:'center'}}><Text style={{alignSelf:'flex-end', marginRight:30, fontSize:17, textAlign:'right',color:'#252525'}}>{this.props.userAccount.data.personalInfo.phone}</Text></View>
            </View>
            <View style={{flexGrow:1,borderBottomColor:'#252525',borderBottomWidth:1,flexDirection:'row'}}>
                <View style={{width:'50%',alignSelf:'center'}}><Text style={{alignSelf:'flex-start',marginLeft:30, fontSize:17,color:'#909090',fontWeight:'900'}}>Email</Text></View>
                <View style={{width:'50%',alignSelf:'center'}}><Text style={{alignSelf:'flex-end', marginRight:30, fontSize:17, textAlign:'right',color:'#252525'}}>{this.props.userAccount.data.local.email}</Text></View>
            </View>
            <View style={{flexGrow:1.5, flexDirection:'row'}}>
                <View style={{width:'50%',alignSelf:'center'}}><Text style={{alignSelf:'flex-start',marginLeft:30, fontSize:17,color:'#909090',fontWeight:'900'}}>Address</Text></View>
                <View style={{width:'50%',alignSelf:'center'}}><Text style={{alignSelf:'flex-end', marginRight:30, fontSize:17, textAlign:'right', color:'#252525'}}>{this.props.userAccount.data.personalInfo.address.detail} {this.props.userAccount.data.personalInfo.address.province}</Text></View>
            </View>
            <View style={{flexGrow:1}}></View>
          </View>
          <TouchableOpacity style={{width:'50%', height:'8%', alignSelf:'center',backgroundColor:'#e64f5d',justifyContent:'center', borderRadius:40, marginTop:10}} onPress={()=>{{this.onPressLogOut()}}}>
              <Text style={{alignSelf:'center',color:'#fff',fontSize:20}}>Log Out</Text>
          </TouchableOpacity>
        </View>        
     </View>
      );
    }
}

const mapStateToProps = state => {
  return {
    userAccount: state.userAccount
  };
};

export default connect(mapStateToProps)(UserProfile);
