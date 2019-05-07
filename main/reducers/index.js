import { combineReducers } from 'redux';
import loginReducers from './loginReducers';
import signUpReducers from './signUpReducers';
import homeReducers from './homeReducers';
import giveAwayReducers from './giveAwayReducers';
import profileReducers from './profileReducers';
import editProfileReducers from './editProfileReducers';
import earnGCAReducers from './earnGCAReducers';

export default combineReducers({
  loginResponse: loginReducers,
  signUpResponse: signUpReducers,
  homeResponse: homeReducers,
  giveAwayResponse: giveAwayReducers,
  profileResponse: profileReducers,
  editProfileResponse: editProfileReducers,
  earnGCAResponse: earnGCAReducers,
});
