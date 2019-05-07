import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Login from './screens/Login';
import Home from './screens/Home';
import SignUp from './screens/SignUp';
import Giveaway from './screens/Giveaway';
import Profile from './screens/Profile';
import EditProfile from './screens/EditProfile';
import BuyGCA from './screens/BuyGCA';
import EarnGCA from './screens/EarnGCA';
import * as firebase from "firebase";


const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="Login" component={Login} title="Login" hideNavBar={true} />
        <Scene key="Home" component={Home} title="Home" hideNavBar={true} />
        <Scene key="SignUp" component={SignUp} title="SignUp" hideNavBar={true} />
        <Scene key="Giveaway" component={Giveaway} title="Giveaway" hideNavBar={true} />
        <Scene key="Profile" component={Profile} title="Profile" hideNavBar={true} />
        <Scene key="EditProfile" component={EditProfile} title="EditProfile" hideNavBar={true} />
        <Scene key="EarnGCA" component={EarnGCA} title="EarnGCA" hideNavBar={true} />
        <Scene key="BuyGCA" component={BuyGCA} title="BuyGCA" hideNavBar={true} />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
