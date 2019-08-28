const FETCH_LOCATION_PENDING = 'FETCH_LOCATION_PENDING';
const FETCH_LOCATION_REJECTED = 'FETCH_LOCATION_REJECTED';
const FETCH_LOCATION_FULFILLED = 'FETCH_LOCATION_FULFILLED';

const LocationReducer = (state = {
    fetching: false,
    fetched: false,
    data: [],
    error: null
}, action) => {
    switch(action.type) {
        case FETCH_LOCATION_PENDING: {
            return {
                ...state,
                fetching: true
            }
            break;
        }
        case FETCH_LOCATION_REJECTED: {
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
            break;
        }
        case FETCH_LOCATION_FULFILLED: {
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

export default LocationReducer;