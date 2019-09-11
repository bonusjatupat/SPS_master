import config from '../misc/config';

const FETCH_RESERVATION_PENDING = 'FETCH_RESERVATION_PENDING';
const FETCH_RESERVATION_REJECTED = 'FETCH_RESERVATION_REJECTED';
const FETCH_RESERVATION_FULFILLED = 'FETCH_RESERVATION_FULFILLED';

const ReservationReducer = (state = {
    fetching: false,
    fetched: false,
    data: {},
    error: null
}, action) => {
    switch(action.type) {
        case FETCH_RESERVATION_PENDING: {
            return {
                ...state,
                fetching: true
            }
            break;
        }
        case FETCH_RESERVATION_REJECTED: {
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
            break;
        }
        case FETCH_RESERVATION_FULFILLED: {
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

export default ReservationReducer;