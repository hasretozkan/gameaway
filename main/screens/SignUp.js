import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,ActivityIndicator,TextInput,Dimensions,Image,Alert } from 'react-native';
import { connect } from 'react-redux';
import * as firebase from "firebase";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Actions, ActionConst } from 'react-native-router-flux';
import Icon from '@expo/vector-icons/FontAwesome'
const { width, height }= Dimensions.get('window');
import { emailChangedSignUp, passwordChangedSignUp, loadingSuccesChanged, loadingFailChanged } from '../actions';

class SignUp extends React.Component {
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(auth=>{
      if (auth) {
        Actions.reset('Home');
      }
    })
  }

  signUpApp = () => {
    this.props.loadingSuccesChanged();
    firebase.auth().createUserWithEmailAndPassword(this.props.email, this.props.password).then((auth) =>
    {
      uid=auth.user.uid;
      const userData = { email:this.props.email,
        balance:0,
        photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mHvngBtfLispQtKTfcljYtbxRJ1rcEVqCGYNdXzvSYihT_w2',
        username:'',
        first_name:'',
      }
      this.createUser(uid, userData);
    }).catch ((e)=> {
      this.props.loadingFailChanged();
      var errorCode = e.code;
      Alert.alert(
        'Sign Up Failed',
        errorCode,
        [{text:'Okay' }]
      );
    });
  }

  createUser = (uid,userData) => {
    const defaults={
      uid,
    }
    firebase.database().ref('users').child(uid).update({...userData,...defaults})
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
            <Text style={{ fontSize: 20,fontWeight: 'bold', color: '#fff' }}>Sign Up</Text>
          </View>
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
            keyboardType='email-address'
            underlineColorAndroid='transparent'
            onChangeText={email => this.props.emailChangedSignUp(email)}
          />
          <TextInput
            placeholder="Password"
            style={{ width: width-40, marginTop: 15, backgroundColor: 'white', padding: 15, borderRadius: 25 }}
            value={this.props.password}
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={password => this.props.passwordChangedSignUp(password)}
          />
          <TouchableOpacity onPress={() => this.signUpApp()}>
            <View style={{ width: width-40, marginTop: 15, backgroundColor: '#f9a602', padding: 15, borderRadius: 25, alignItems:'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 15,fontWeight: 'bold' }}>Sign Up</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.pop()}>
            <Text style={{ fontSize: 15,fontWeight: 'bold', color: '#1DA1F2', marginTop: 10,marginBottom: 50}}>Already has account?</Text>
          </TouchableOpacity>
          <KeyboardSpacer/>
        </View>}
      </View>
    );
  }
}

const mapStateToProps = ({ signUpResponse }) => {
  const { email, password,loading } = signUpResponse;
  return {
    email,
    password,
    loading,
  };
};

export default connect(mapStateToProps, { emailChangedSignUp, passwordChangedSignUp, loadingSuccesChanged, loadingFailChanged })(SignUp);
