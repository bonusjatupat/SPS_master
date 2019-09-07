import { combineReducers } from 'redux';

import parking from './parkingReducer';
import location from './locationReducer';
import userAccount from './userAccountReducer';
import authenModal from './authenModalReducer';
import currentParking from './currentParkingReducer';

export default combineReducers({
    parking, location, userAccount, authenModal, currentParking
});