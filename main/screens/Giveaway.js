import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,ActivityIndicator,ScrollView,TextInput,Dimensions,Image,Alert,FlatList,ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import * as firebase from "firebase";
import { Actions } from 'react-native-router-flux';
import Icon from '@expo/vector-icons/FontAwesome';
import { AdMobBanner, AdMobInterstitial, AdMobRewarded } from "expo";
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
const { width, height }= Dimensions.get('window');
import { giveawayChanged, giveawayLoadingChanged, giveawayUserInfoChanged } from '../actions';
const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });

class Giveaway extends React.Component {

  componentWillMount = () => {
    firebase.database().ref().child('giveaways').child(this.props.giveawayy.uid).on('value',(snap)=>{
      this.props.giveawayChanged(snap.val());
      firebase.auth().onAuthStateChanged(auth=>{
        firebase.database().ref().child('users').child(auth.uid).on('value',(snapshot)=>{
          this.props.giveawayUserInfoChanged(snapshot.val());
          this.props.giveawayLoadingChanged(false);
        });
      });
    });
  }

  buyTickets = () => {
    var self = this.props
    if (this.props.giveaway.remaining < 1) {
      Alert.alert(
        'You can not join',
        'You can not join giveaway. All tickets were received. The results will be announced soon.',
        [
          {text: 'Okay'},
        ],
      )
    }
    else {
      this.props.giveawayLoadingChanged(true);
      var giveawayRemaining = this.props.giveaway.remaining-1;
      var userUid = (this.props.userInfo.uid + '-' + Math.floor(Math.random()*10000));
      var giveawayUsers = true;
      var userGiveaways = {
        uid:this.props.giveaway.uid,
        name:this.props.giveaway.name,
      }

      var updates = {};
      updates['/users/' + this.props.userInfo.uid + '/giveaways/' + this.props.giveaway.uid] = userGiveaways;
      updates['/giveaways/' + this.props.giveaway.uid + '/remaining/'] = giveawayRemaining;
      updates['/giveaways/' + this.props.giveaway.uid + '/users/' + userUid] = giveawayUsers;
      var self =  this.props;

      firebase.database().ref().update(updates, function(error) {
        if (error) {
          Alert.alert(
            'Something went wrong.',
            'Something went wrong. We apologize for this error. We will try to solve the error as soon as possible.',
            [
              {text: 'Okay'},
            ],
          )
          self.giveawayLoadingChanged(false);
        } else {
          Alert.alert(
            'Joined the Giveaway.',
            'You have joined the giveaway. Buy tickets again to get more tickets.',
            [
              {text: 'Okay'},
            ],
          )
          self.giveawayLoadingChanged(false);
        }
      });
    }
  }

  render() {
    return (
      <View style={{ flex:1,backgroundColor: '#2f2828',alignItems: 'center' }}>
        <View style={{ height: 50,width: width,alignItems: 'center',justifyContent: 'space-between', flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => {Actions.Home()}}>
          <Icon name={'arrow-left'} size={20} color={'#fff'} style={{marginLeft:10}}/>
          </TouchableOpacity>
          <Text style={{ fontSize: 20,fontWeight: 'bold', color: '#fff' }}>Giveaway</Text>
          <Icon name={'arrow-left'} size={20} color={'#2f2828'} style={{marginRight:10}}/>
        </View>
        <View>
          <Image
            source={{uri: this.props.giveaway.photo}}
            style={{ width: width, height: 150 }}
          />
          <Text style={{ fontSize: 20,fontWeight: 'bold', color: '#fff', marginLeft: 10, marginTop: 10, position: 'absolute' }}>{this.props.giveawayy.name}</Text>
          <Text style={{ fontWeight: 'bold', marginTop: 125, fontSize: 15, color: '#fff', marginLeft: 10, position: 'absolute'}}>{this.props.giveaway.remaining} tickets left</Text>
        </View>
        {this.props.loading?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size='large' color='white'/>
          </View>
          :
          <ScrollView>
            <View style={{ flex:1,width: width,alignItems: 'center' }}>
            <Text style={{ fontSize: 15, color: '#f9a602', margin: 10}}>{this.props.giveaway.detail}</Text>
            <View style={{ backgroundColor: '#f9a602',padding: 5, margin: 10, borderRadius: 8, alignItems: 'center', justifyContent: 'center',width: width-20}}>
              <Text style={{ fontSize: 15, color: '#000', margin: 10, fontWeight: 'bold' }}>Ticket Price : {this.props.giveaway.price} GAC</Text>
            </View>
            <TouchableOpacity onPress={() => {this.buyTickets()}}>
              <View style={{ backgroundColor: '#3B5998',padding: 5, margin: 10,marginBottom: 20,borderRadius: 8, alignItems: 'center', justifyContent: 'center',width: width-20}}>
                <Text style={{ fontSize: 15, color: '#fff', margin: 10, fontWeight: 'bold' }}>Buy Tickets</Text>
              </View>
            </TouchableOpacity>
            <AdMobBanner
              bannerSize="mediumRectangle"
              adUnitID="ca-app-pub-2779101416790896/6100691227" // Test ID, Replace with your-admob-unit-id
              testDeviceID="EMULATOR" />
              <View style={{width: width, alignItems: 'center', justifyContent: 'center',marginBottom: 10}}>
                <TouchableOpacity onPress={() => {this.popupDialog.show()}}>
                  <Text style={{ fontSize: 10, color: '#1DA1F2', margin: 10 }}>Giveaway Rules/Infos</Text>
                </TouchableOpacity>
              </View>
              </View>
          </ScrollView>}
          <View style={{ height: 1, width: width, backgroundColor: '#f9a602' }}/>
          <View style={{ height: 50, width: width, backgroundColor: '#2f2828', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => {Actions.Home()}}>
            <Icon name={'home'} size={25} color={'#fff'} style={{ marginLeft: 20 }}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {Actions.reset('EarnGCA')}}>
            <Icon name={'dollar'} size={25} color={'#f9a602'}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {Actions.reset('BuyGCA')}}>
            <Icon name={'diamond'} size={25} color={'#f9a602'}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {Actions.reset('Profile')}}>
            <Icon name={'user'} size={25} color={'#f9a602'} style={{ marginRight: 20 }}/>
            </TouchableOpacity>
          </View>
          <PopupDialog width={width-40} ref={(popupDialog) => { this.popupDialog = popupDialog; }} dialogAnimation={slideAnimation}>
            <View style={{ width: width-40, alignItems: 'center', justifyContent: 'center',backgroundColor: '#2f2828',height: 300}}>
              <Text style={{color: 'white',fontWeight: 'bold',fontSize: 20 }}>Rules/Infos</Text>
              <Text style={{color: 'white',margin:5}}>-There are {this.props.giveaway.limit} tickets in this giveaway.</Text>
              <Text style={{color: 'white',margin:5 }}>-Once all tickets have been received, the giveaway will result automatically.</Text>
              <Text style={{color: 'white',margin:5 }}>-You can buy more than one ticket in the giveaway.</Text>
              <Text style={{color: 'white',fontWeight: 'bold',margin:5 }}>Good luck, Have Fun!</Text>
            </View>
          </PopupDialog>
        </View>
      );
    }
  }

  const mapStateToProps = ({ giveAwayResponse }) => {
    const { giveaway,loading,userInfo } = giveAwayResponse;
    return {
      giveaway,
      loading,
      userInfo,
    };
  };

  export default connect(mapStateToProps, { giveawayChanged, giveawayLoadingChanged, giveawayUserInfoChanged })(Giveaway);
