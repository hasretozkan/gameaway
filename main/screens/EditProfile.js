import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,ActivityIndicator,ScrollView,TextInput,Dimensions,Image,Alert,FlatList,ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import * as firebase from "firebase";
import { Actions } from 'react-native-router-flux';
import Icon from '@expo/vector-icons/FontAwesome';
const { width, height }= Dimensions.get('window');
import { editProfileUserChanged, editProfileLoadingChanged, editProfileNameChanged, editProfileUsernameChanged } from '../actions';

class EditProfile extends React.Component {

  state = {
    first:true
  }

  componentWillMount = () => {
    if (this.state.first) {
      firebase.auth().onAuthStateChanged(auth=>{
        firebase.database().ref().child('users').child(auth.uid).on('value',(snapshot)=>{
          this.props.editProfileUserChanged(snapshot.val());
          this.props.editProfileNameChanged(snapshot.val().first_name);
          this.props.editProfileUsernameChanged(snapshot.val().username);
          this.props.editProfileLoadingChanged(false);
          this.setState({first:false})
        });
      });
    }
  }

  sendData(data){
    this.props.editProfileLoadingChanged(true);
    firebase.database().ref().update(data, function(error) {
      if (error) {
        console.log('Error');
      } else {
        Actions.Profile();
      }
    });
  }

  usernameChange = (username) => {
    this.props.editProfileUsernameChanged(username);
  }

  firstnameChange = (firstname) => {
    this.props.editProfileNameChanged(firstname);
  }

  render() {
    var updates = {};
    updates['/users/' + this.props.userInfo.uid + '/username/'] = this.props.username;
    updates['/users/' + this.props.userInfo.uid + '/first_name/'] = this.props.first_name;

    return (
      <View style={{ flex:1,backgroundColor: '#2f2828',alignItems: 'center' }}>
        <View style={{ height: 50,width: width,alignItems: 'center',justifyContent: 'space-between',flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => {Actions.Profile()}}>
            <Icon name={'times'} size={20} color={'#fff'} style={{marginLeft:10}}/>
          </TouchableOpacity>
          <Text style={{ fontSize: 20,fontWeight: 'bold', color: '#fff' }}>Edit Profile</Text>
          <TouchableOpacity onPress={() => {this.sendData(updates)}}>
            <Icon name={'save'} size={20} color={'#fff'} style={{marginRight:10}}/>
          </TouchableOpacity>
        </View>
        {this.props.loading?<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='large' color='white'/>
        </View>
        :
        <ScrollView>
          <View style={{width: width,alignItems: 'center'}}>
            <Image
              source={{ uri: this.props.userInfo.photo }}
              style={{ marginTop: 20,width: width-250,height: width-250,borderRadius: (width-250)/2 }}
            />
            <View style={{ width: width-20,margin: 15 }}>
              <View style={{ width: width-30,backgroundColor: '#f9a602',height: 1, marginTop: 5,marginBottom: 5 }}/>
              <Text style={{ fontWeight: 'bold',fontSize: 20,color: '#fff'}}>Username</Text>
              <TextInput
                style={{ width: width-40, color:'#f9a602' }}
                value={this.props.username}
                underlineColorAndroid='transparent'
                onChangeText={(username) => {this.usernameChange(username)}}
              />
              <View style={{ width: width-30,backgroundColor: '#f9a602',height: 1, marginTop: 5,marginBottom: 5 }}/>
              <Text style={{ fontWeight: 'bold',fontSize: 20,color: '#fff'}}>Name</Text>
              <TextInput
                style={{ width: width-40, color:'#f9a602' }}
                underlineColorAndroid='transparent'
                value={this.props.first_name}
                onChangeText={(firstname) => {this.firstnameChange(firstname)}}
              />
              <View style={{ width: width-30,backgroundColor: '#f9a602',height: 1, marginTop: 5,marginBottom: 5 }}/>
              <TouchableOpacity>
                <Text style={{ fontWeight: 'bold',fontSize: 20,color: '#fff'}}>E-Mail</Text>
                <Text style={{ fontSize: 15, color: '#f9a602' }}>{this.props.userInfo.email}</Text>
              </TouchableOpacity>
              <View style={{ width: width-30,backgroundColor: '#f9a602',height: 1, marginTop: 5,marginBottom: 5 }}/>
              <TouchableOpacity>
                <Text style={{ fontWeight: 'bold',fontSize: 20,color: '#fff'}}>Balance</Text>
                <Text style={{ fontSize: 15, color: '#f9a602' }}>{this.props.userInfo.balance}</Text>
              </TouchableOpacity>
              <View style={{ width: width-30,backgroundColor: '#f9a602',height: 1, marginTop: 5,marginBottom: 5 }}/>
            </View>
          </View>
        </ScrollView>}
        <View style={{ height: 1, width: width, backgroundColor: '#f9a602' }}/>
        <View style={{ height: 50, width: width, backgroundColor: '#2f2828', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => {Actions.reset('Home')}}>
            <Icon name={'home'} size={25} color={'#f9a602'} style={{ marginLeft: 20 }}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {Actions.reset('EarnGCA')}}>
            <Icon name={'dollar'} size={25} color={'#f9a602'}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {Actions.reset('BuyGCA')}}>
            <Icon name={'diamond'} size={25} color={'#f9a602'}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {Actions.Profile()}}>
            <Icon name={'user'} size={25} color={'#fff'} style={{ marginRight: 20 }}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ editProfileResponse }) => {
  const { userInfo, loading, first_name, username } = editProfileResponse;
  return {
    userInfo,
    loading,
    first_name,
    username,
  };
};

export default connect(mapStateToProps, { editProfileUserChanged, editProfileLoadingChanged, editProfileNameChanged, editProfileUsernameChanged })(EditProfile);
