const FETCH_PARKING_PENDING = 'FETCH_PARKING_PENDING';
const FETCH_PARKING_REJECTED = 'FETCH_PARKING_REJECTED';
const FETCH_PARKING_FULFILLED = 'FETCH_PARKING_FULFILLED';

const ParkingReducer = (state = {
    fetching: false,
    fetched: false,
    data: [],
    error: null
}, action) => {
    switch(action.type) {
        case FETCH_PARKING_PENDING: {
            return {
                ...state,
                fetching: true
            }
            break;
        }
        case FETCH_PARKING_REJECTED: {
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
            break;
        }
        case FETCH_PARKING_FULFILLED: {
            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.payload
            }
            break;
        }
    }
    return state;
}

export default ParkingReducer;