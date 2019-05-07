import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,ActivityIndicator,ScrollView,TextInput,Dimensions,Image,Alert,FlatList,ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import * as firebase from "firebase";
import { Actions } from 'react-native-router-flux';
import Icon from '@expo/vector-icons/FontAwesome';
import { AdMobBanner, AdMobInterstitial, AdMobRewarded } from "expo";
const { width, height }= Dimensions.get('window');
import { earnGCAUserChanged, earnGCALoadingChanged } from '../actions';

class EarnGCA extends React.Component {

  componentDidMount = () => {
    AdMobRewarded.setTestDeviceID("EMULATOR");
    AdMobRewarded.setAdUnitID("ca-app-pub-2779101416790896/3553337365");
    AdMobRewarded.addEventListener("rewardedVideoDidRewardUser", () => {
      var reward = this.props.userInfo.balance + 1;
      var updates = {};
      updates['/users/' + this.props.userInfo.uid + '/balance/'] = reward;
      firebase.database().ref().update(updates);
    });
    AdMobRewarded.addEventListener("rewardedVideoDidLoad", () =>
    this.props.earnGCALoadingChanged(false));
    AdMobRewarded.addEventListener("rewardedVideoDidFailToLoad", () =>
    this.props.earnGCALoadingChanged(false));
    AdMobRewarded.addEventListener("rewardedVideoDidOpen", () =>
    this.props.earnGCALoadingChanged(false));
    AdMobRewarded.addEventListener("rewardedVideoDidClose", () =>
    this.props.earnGCALoadingChanged(false));
    AdMobRewarded.addEventListener("rewardedVideoWillLeaveApplication", () =>
    this.props.earnGCALoadingChanged(false));
  }

  componentWillMount = () => {
    firebase.auth().onAuthStateChanged(auth=>{
      firebase.database().ref().child('users').child(auth.uid).on('value',(snapshot)=>{
        this.props.earnGCAUserChanged(snapshot.val());
        this.props.earnGCALoadingChanged(false);
      });
    });
  }

  componentWillUnmount = () => {
    AdMobRewarded.removeEventListener("rewardedVideoDidRewardUser", () => {
      var reward = this.props.userInfo.balance + 1;
      var updates = {};
      updates['/users/' + this.props.userInfo.uid + '/balance/'] = reward;
      firebase.database().ref().update(updates);
    });
    AdMobRewarded.removeEventListener("rewardedVideoDidLoad", () =>
    console.log("2"));
    AdMobRewarded.removeEventListener("rewardedVideoDidFailToLoad", () =>
    console.log("3"));
    AdMobRewarded.removeEventListener("rewardedVideoDidOpen", () =>
    console.log("4"));
    AdMobRewarded.removeEventListener("rewardedVideoDidClose", () =>
    this.props.earnGCALoadingChanged(false));
    AdMobRewarded.removeEventListener("rewardedVideoWillLeaveApplication", () =>
    this.props.earnGCALoadingChanged(false));
  }

  showRewarded = () => {
    this.props.earnGCALoadingChanged(true);
    AdMobRewarded.requestAdAsync()
    .then(() => {
      AdMobRewarded.showAdAsync();
    })
    .catch((err) => {
      this.props.earnGCALoadingChanged(false);
      Alert.alert(
        'Ad Failed',
        err,
        [
          {text: 'Okay'},
        ],
      )
    });
  }

  render() {
    return (
      <View style={{ flex:1,backgroundColor: '#2f2828',alignItems: 'center' }}>
        <View style={{ height: 50,width: width,alignItems: 'center',justifyContent: 'center' }}>
          <Text style={{ fontSize: 20,fontWeight: 'bold', color: '#fff' }}>Earn GCA</Text>
        </View>
        {this.props.loading?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size='large' color='white'/>
          </View>
          :
          <ScrollView>
            <View style={{ flex:1,width: width,alignItems: 'center' }}>
              <Text style={{ fontSize: 30,fontWeight: 'bold', color: '#f9a602',marginTop: 50}}>Your Balance</Text>
              <Text style={{ fontSize: 20,fontWeight: 'bold', color: '#fff',marginTop: 5}}>{this.props.userInfo.balance} GCA</Text>
              <TouchableOpacity onPress={() => {this.showRewarded()}}>
                <View style={{ width: width-40,backgroundColor: '#3B5998', padding: 15,marginTop: 50,marginBottom: 50,borderRadius: 4, alignItems:'center', justifyContent: 'center',flexDirection: 'row' }}>
                  <Icon name={'dollar'} size={20} color={'#fff'}/>
                  <Text style={{ fontSize: 15,fontWeight: 'bold', color: '#fff',marginLeft: 10,marginRight: 10}}>Earn GCA by Watching Ad</Text>
                  <Icon name={'dollar'} size={20} color={'#fff'}/>
                </View>
              </TouchableOpacity>
              <AdMobBanner
                bannerSize="mediumRectangle"
                adUnitID="ca-app-pub-2779101416790896/6100691227" // Test ID, Replace with your-admob-unit-id
                testDeviceID="EMULATOR" />
              </View>
            </ScrollView>}
            <View style={{ height: 1, width: width, backgroundColor: '#f9a602' }}/>
            <View style={{ height: 50, width: width, backgroundColor: '#2f2828', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => {Actions.reset('Home')}}>
                <Icon name={'home'} size={25} color={'#f9a602'} style={{ marginLeft: 20 }}/>
              </TouchableOpacity>
              <Icon name={'dollar'} size={25} color={'#fff'}/>
              <TouchableOpacity onPress={() => {Actions.reset('BuyGCA')}}>
                <Icon name={'diamond'} size={25} color={'#f9a602'}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {Actions.reset('Profile')}}>
                <Icon name={'user'} size={25} color={'#f9a602'} style={{ marginRight: 20 }}/>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
    }

    const mapStateToProps = ({ earnGCAResponse }) => {
      const { userInfo, loading } = earnGCAResponse;
      return {
        userInfo,
        loading,
      };
    };

    export default connect(mapStateToProps, { earnGCAUserChanged, earnGCALoadingChanged })(EarnGCA);
