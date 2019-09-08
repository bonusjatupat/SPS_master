import { combineReducers } from 'redux';

import parking from './parkingReducer';
import location from './locationReducer';
import userAccount from './userAccountReducer';
import authenModal from './authenModalReducer';
import currentParking from './currentParkingReducer';
import reservation from './reservationReducer';

export default combineReducers({
    parking, location, userAccount, authenModal, currentParking, reservation
});