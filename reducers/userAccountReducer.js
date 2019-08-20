import config from '../misc/config';

const FETCH_USER_ACCOUNT_PENDING = 'FETCH_USER_ACCOUNT_PENDING';
const FETCH_USER_ACCOUNT_REJECTED = 'FETCH_USER_ACCOUNT_REJECTED';
const FETCH_USER_ACCOUNT_FULFILLED = 'FETCH_USER_ACCOUNT_FULFILLED';

const UserAccountReducer = (state = {
    fetching: false,
    fetched: false,
    data: {},
    error: null
}, action) => {
    switch(action.type) {
        case FETCH_USER_ACCOUNT_PENDING: {
            return {
                ...state,
                fetching: true
            }
            break;
        }
        case FETCH_USER_ACCOUNT_REJECTED: {
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
            break;
        }
        case FETCH_USER_ACCOUNT_FULFILLED: {
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

export default UserAccountReducer;