import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,ActivityIndicator,TextInput,Dimensions,Image,Alert,LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import * as firebase from "firebase";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Actions } from 'react-native-router-flux';
import Icon from '@expo/vector-icons/FontAwesome'
const { width, height }= Dimensions.get('window');
import { emailChanged, passwordChanged, loadingChanged, loginChanged } from '../actions';

class Login extends React.Component {

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(auth=>{
      if (auth) {
        Actions.reset('Home');
      } else {
        this.props.loadingChanged();
      }
    });
  }

  loginApp = () => {
    this.props.loginChanged();
    var self = this.props;
    firebase.auth().signInWithEmailAndPassword(this.props.email, this.props.password)
    .then(function(user) {
    })
    .catch(function(error) {
      var errorCode = error.message;
      Alert.alert(
        'Login Failed',
        errorCode,
        [
          {text: 'Okay', onPress: () => self.loadingChanged()},
        ],
      )
    });
  }

  createUser = (uid,userData) => {
    const defaults={
      uid,
    }
    firebase.database().ref('users').child(uid).update({...userData,...defaults})
  }

  authenticate = (token) => {
    const provider= firebase.auth.FacebookAuthProvider
    const credential = provider.credential(token)
    return firebase.auth().signInAndRetrieveDataWithCredential(credential)
  }

  loginFacebook = async () => {
    this.props.loginChanged();
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('2142728246045116',{ permissions:['public_profile'], })
    if(type==='success'){
      const fields=['id','first_name',]
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      const userData = await response.json();
      console.log(token)
      const {uid} = this.authenticate(token)
      console.log(uid);
      this.createUser(uid,userData);
    }
    else {
      this.props.loadingChanged();
    }
  }

  createUser = (uid,userData) => {
    const defaults={
      uid,
    }
    firebase.database().ref('users').child(uid).update({...userData,...defaults})
  }

  goSignUpPage = () => {
    Actions.SignUp();
  }

  render() {
    return (
      <View style={{ flex:1,backgroundColor: '#2f2828',alignItems: 'center' }}>
        {this.props.loading?<View style={{width: width,height: height,alignItems:'center',justifyContent: 'center'}}>
          <ActivityIndicator size='large' color='white'/>
        </View>
        :
        <View style={{width: width,height: height,alignItems:'center'}}>
          <View style={{ height: 50,width: width,alignItems: 'center',justifyContent: 'center' }}>
            <Text style={{ fontSize: 20,fontWeight: 'bold', color: '#fff' }}>Login</Text>
          </View>
          <View style={{width: width,alignItems: 'center',flex: 1}}>
            <View style={{flex:1,width: width}}></View>
            <Image
              style={{ width:width-150, height: (width-150)/5 }}
              source={require('../images/iconn.png')}
            />
            <View style={{flex:1,width: width}}></View>
            <TextInput
              placeholder="E-mail"
              style={{ width: width-40, marginTop: 25, backgroundColor: 'white', padding: 15, borderRadius: 25 }}
              value={this.props.email}
              underlineColorAndroid='transparent'
              keyboardType='email-address'
              onChangeText={email => this.props.emailChanged(email)}
            />
            <TextInput
              placeholder="Password"
              style={{ width: width-40, marginTop: 15, backgroundColor: 'white', padding: 15, borderRadius: 25 }}
              value={this.props.password}
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={password => this.props.passwordChanged(password)}
            />
            <TouchableOpacity onPress={() => this.loginApp()}>
              <View style={{ width: width-40, marginTop: 15, backgroundColor: '#f9a602', padding: 15, borderRadius: 25, alignItems:'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 15,fontWeight: 'bold' }}>Login</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.goSignUpPage()}>
              <Text style={{ fontSize: 15,fontWeight: 'bold', color: '#1DA1F2', marginTop: 10}}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.loginFacebook()}>
              <View style={{ width: width-40, marginTop: 10,marginBottom: 50, backgroundColor: '#3B5998', padding: 15, borderRadius: 25, alignItems:'center', justifyContent: 'center',flexDirection: 'row'}}>
                <Icon name={'facebook-f'} size={15} color={'white'} style={{paddingRight:10}}/>
                <Text style={{ fontSize: 15, fontWeight: 'bold' ,color: 'white'}}>Login with Facebook</Text>
              </View>
            </TouchableOpacity>
            <KeyboardSpacer/>
          </View>
        </View>}
      </View>
    );
  }
}

const mapStateToProps = ({ loginResponse }) => {
  const { email, password,loading } = loginResponse;
  return {
    email,
    password,
    loading,
  };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loadingChanged, loginChanged })(Login);
