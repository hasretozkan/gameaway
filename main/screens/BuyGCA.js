import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,ActivityIndicator,ScrollView,TextInput,Dimensions,Image,Alert,FlatList,ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import * as firebase from "firebase";
import { Actions } from 'react-native-router-flux';
import Icon from '@expo/vector-icons/FontAwesome';
import { AdMobBanner, AdMobInterstitial, AdMobRewarded } from "expo";
const { width, height }= Dimensions.get('window');

export default class BuyGCA extends React.Component {
  render() {
    return (
      <View style={{ flex:1,backgroundColor: '#2f2828',alignItems: 'center' }}>
        <View style={{ height: 50,width: width,alignItems: 'center',justifyContent: 'center' }}>
          <Text style={{ fontSize: 20,fontWeight: 'bold', color: '#fff' }}>Coming Soon</Text>
        </View>
        <View style={{flex: 1,alignItems: 'center',justifyContent: 'center'}}>
          <Text style={{ fontSize: 50,fontWeight: 'bold', color: '#f9a602' }}>Coming Soon</Text>

        </View>
        <View style={{ height: 1, width: width, backgroundColor: '#f9a602' }}/>
        <View style={{ height: 50, width: width, backgroundColor: '#2f2828', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => {Actions.reset('Home')}}>
          <Icon name={'home'} size={25} color={'#f9a602'} style={{ marginLeft: 20 }}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {Actions.reset('EarnGCA')}}>
          <Icon name={'dollar'} size={25} color={'#f9a602'}/>
          </TouchableOpacity>
          <TouchableOpacity>
          <Icon name={'diamond'} size={25} color={'#fff'}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {Actions.reset('Profile')}}>
          <Icon name={'user'} size={25} color={'#f9a602'} style={{ marginRight: 20 }}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
