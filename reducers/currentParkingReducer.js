const FETCH_CURRENTPARKING_PENDING = 'FETCH_CURRENTPARKING_PENDING';
const FETCH_CURRENTPARKING_REJECTED = 'FETCH_CURRENTPARKING_REJECTED';
const FETCH_CURRENTPARKING_FULFILLED = 'FETCH_CURRENTPARKING_FULFILLED';

const CurrentParkingReducer = (state = {
    fetching: false,
    fetched: false,
    data: {},
    error: null
}, action) => {
    switch(action.type) {
        case FETCH_CURRENTPARKING_PENDING: {
            return {
                ...state,
                fetching: true
            }
            break;
        }
        case FETCH_CURRENTPARKING_REJECTED: {
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
            break;
        }
        case FETCH_CURRENTPARKING_FULFILLED: {
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

export default CurrentParkingReducer;