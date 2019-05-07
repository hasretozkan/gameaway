import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,ActivityIndicator,ScrollView,TextInput,Dimensions,Image,Alert,FlatList,ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import * as firebase from "firebase";
import { Actions } from 'react-native-router-flux';
import Icon from '@expo/vector-icons/FontAwesome';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
const { width, height }= Dimensions.get('window');
import { profileUserChanged, profileLoadingChanged, profileGiveawaysChanged } from '../actions';
const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });

class Profile extends React.Component {

  componentWillMount = () => {
    firebase.auth().onAuthStateChanged(auth=>{
      if (auth) {
        firebase.database().ref().child('users').child(auth.uid).on('value',(snapshot)=>{
          this.props.profileUserChanged(snapshot.val());
          firebase.database().ref().child('users').child(auth.uid).child('giveaways').on('value',(snapshot)=>{
            let giveaways = [];
            snapshot.forEach((data)=>{
              const { name, uid }= data.val();
              giveaways.push({ name, uid });
            });
            this.props.profileGiveawaysChanged(giveaways);
            this.props.profileLoadingChanged(false);
          });
        });
      } else {
        Actions.Login();
      }
    });
  }

  signOut = () => {
    Alert.alert(
      'Are you sure?',
      'Are you sure? Do you want to leave?',
      [
        {text: 'Okay', onPress: () => {
          this.props.profileLoadingChanged(true);
          firebase.auth().signOut().then(function() {
            console.log('Signed Out');
          }, function(error) {
            this.props.profileLoadingChanged(false);
            Alert.alert(
              'Something went wrong.',
              'Something went wrong. We apologize for this error. We will try to solve the error as soon as possible.',
              [
                {text: 'Okay'},
              ],
            )
          });
        }},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
    )
  }

  render() {

    if (this.props.userDetail.giveaways == undefined) {
      var giveawayBoolean = true;
    } else {
      var giveawayBoolean = false;
    }

    return (
      <View style={{ flex:1,backgroundColor: '#2f2828',alignItems: 'center' }}>
        <View style={{ height: 50,width: width,alignItems: 'center',justifyContent: 'space-between',flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => {Actions.EditProfile()}}>
            <Icon name={'gear'} size={20} color={'#fff'} style={{marginLeft:10}}/>
          </TouchableOpacity>
          <Text style={{ fontSize: 20,fontWeight: 'bold', color: '#fff' }}>Profile</Text>
          <TouchableOpacity onPress={() => {this.signOut()}}>
            <Icon name={'sign-out'} size={20} color={'#fff'} style={{marginRight:10}}/>
          </TouchableOpacity>
        </View>
        {this.props.loading?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size='large' color='white'/>
          </View>
          :
          <View style={{ flex: 1,alignItems: 'center'}}>
            <Image
              source={{ uri: this.props.userDetail.photo }}
              style={{ marginTop: 20,width: width-250,height: width-250,borderRadius: (width-250)/2 }}
            />
            <Text style={{ marginTop: 15,fontWeight: 'bold', fontSize: 20, color: '#f9a602' }}>{this.props.userDetail.username}</Text>
            <Text style={{ marginTop: 5,marginBottom: 20, fontSize: 20, color: '#f9a602' }}>Balance : {this.props.userDetail.balance} GAC</Text>
            <View style={{ height: 1, width: width-50, backgroundColor: '#f9a602' }}/>
            <Text style={{ marginTop: 20,fontWeight: 'bold', fontSize: 20, color: '#fff' }}>Your Entries</Text>
            {giveawayBoolean?<View style={{ flex:1,width: width,alignItems: 'center',justifyContent: 'center' }}>
              <Text style={{ fontSize: 20, color: '#f9a602' }}>You have no entry</Text>
            </View>
            :
            <FlatList
              data={this.props.giveaways}
              keyExtractor={(item,index)=>item.uid}
              renderItem={({item}) =>
              <View style={{ marginTop: 15 }}>
                <View style={{ width: width-20,backgroundColor: '#f9a602',padding: 5, borderRadius: 8, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{ fontSize: 15, color: '#000', margin: 10, fontWeight: 'bold' }}>{item.name}</Text>
                </View>
              </View>}
            />
          }
        </View>}
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
          <Icon name={'user'} size={25} color={'#fff'} style={{ marginRight: 20 }}/>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ profileResponse }) => {
  const { userDetail, loading, giveaways } = profileResponse;
  return {
    userDetail,
    loading,
    giveaways
  };
};

export default connect(mapStateToProps, { profileUserChanged, profileLoadingChanged, profileGiveawaysChanged })(Profile);
