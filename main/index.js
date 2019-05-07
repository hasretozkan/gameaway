import React from 'react';
import { Provider } from 'react-redux';
import * as firebase from "firebase";
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Router from './Router';
import reducers from './reducers';

class Main extends React.Component {

  componentWillMount = () => {
    const config = {
      apiKey: "AIzaSyARi4ZdRigpXybdwgT40ew6ooQtcBB-UxA",
      authDomain: "giveaways-e1e33.firebaseapp.com",
      databaseURL: "https://giveaways-e1e33.firebaseio.com",
      projectId: "giveaways-e1e33",
      storageBucket: "giveaways-e1e33.appspot.com",
      messagingSenderId: "291337295181"
    };
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default Main;
