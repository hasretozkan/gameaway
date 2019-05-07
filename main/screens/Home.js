import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,ActivityIndicator,TextInput,Dimensions,Image,Alert,FlatList,ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import * as firebase from "firebase";
import { Actions } from 'react-native-router-flux';
import Icon from '@expo/vector-icons/FontAwesome'
const { width, height }= Dimensions.get('window');
import { giveawaysChanged, homeLoadingChanged } from '../actions';

class Home extends React.Component {

  componentWillMount = () => {
    firebase.database().ref().child('giveaways').on('value',(snap)=>{
      let giveaways = [];
      snap.forEach((data)=>{
        if (data.val().active) {
          const { name, uid, photo } = data.val();
          giveaways.push({ name, uid, photo });
        }
      })
      this.props.giveawaysChanged(giveaways);
      this.props.homeLoadingChanged();
    });
  }

  goGiveAway = (giveaway) => {

  }
  render() {
    return (
      <View style={{ flex:1,backgroundColor: '#2f2828',alignItems: 'center' }}>
        <View style={{ height: 50,width: width,alignItems: 'center',justifyContent: 'center' }}>
          <Text style={{ fontSize: 20,fontWeight: 'bold', color: '#fff' }}>Home</Text>
        </View>
        {this.props.loading?<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='large' color='white'/>
        </View>
        :
        <FlatList
          data={this.props.giveaways}
          keyExtractor={(item,index)=>item.uid}
          renderItem={({item}) =>
          <View style={{ marginTop: 5, marginBottom: 10}}>
            <TouchableOpacity onPress={() => {Actions.Giveaway({giveawayy:item})}}>
              <Image
                source={{uri: item.photo}}
                style={{ width: width-20,height: 150,borderRadius: 8 }}
              />
              <Text style={{ fontSize: 20,fontWeight: 'bold', color: '#fff', position: 'absolute',marginTop: 120,marginLeft: 10}}>{item.name}</Text>
            </TouchableOpacity>
          </View>}
        />}
        <View style={{ height: 1, width: width, backgroundColor: '#f9a602' }}/>
        <View style={{ height: 50, width: width, backgroundColor: '#2f2828', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
          <Icon name={'home'} size={25} color={'#fff'} style={{ marginLeft: 20 }}/>
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
      </View>
    );
  }
}

const mapStateToProps = ({ homeResponse }) => {
  const { giveaways, loading } = homeResponse;
  return {
    giveaways,
    loading,
  };
};

export default connect(mapStateToProps, { giveawaysChanged, homeLoadingChanged })(Home);
