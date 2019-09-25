import config from '../misc/config';

import axios from 'axios';

export function fetchCurrentUser() {
    return (dispatch) => {
        dispatch({ type: 'FETCH_USER_ACCOUNT_PENDING' });
        axios.get(`${config.API_ENDPOINT_URL}/authen/account`, null, null)
            .then((response) => {
                if (response.status == 200) {
                    if (response.data.user) {
                        dispatch({ type: 'FETCH_USER_ACCOUNT_FULFILLED', payload: response.data.user });
                    } else {
                        dispatch({ type: 'FETCH_USER_ACCOUNT_REJECTED', payload: 'Error while get current user.' });
                    }
                } else {
                    dispatch({ type: 'FETCH_USER_ACCOUNT_REJECTED', payload: response.data.error });
                }
            })
            .catch((error) => {
                dispatch({ type: 'FETCH_USER_ACCOUNT_REJECTED', payload: { type: 'sys', message: error } });
            });
    }
}

export function signInUser(data) {
    return (dispatch) => {
        dispatch({ type: 'FETCH_USER_ACCOUNT_PENDING' });
        axios.post(`${config.API_ENDPOINT_URL}/authen/signin`, data, null)
            .then((response) => {
                if (response.status == 200) {
                    if (response.data.user) {
                        dispatch({ type: 'FETCH_USER_ACCOUNT_FULFILLED', payload: response.data.user });
                    } else {
                        dispatch({ type: 'FETCH_USER_ACCOUNT_REJECTED', payload: { type: 'sys', message: 'Error while signing in' } });
                    }
                } else {
                    dispatch({ type: 'FETCH_USER_ACCOUNT_REJECTED', payload: response.data.error });
                }
            })
            .catch((error) => {
                dispatch({ type: 'FETCH_USER_ACCOUNT_REJECTED', payload: { type: 'sys', message: error } });
            });
    }
}

export function signUpUser(data) {
    return (dispatch) => {
        dispatch({ type: 'FETCH_USER_ACCOUNT_PENDING' });
        axios.post(`${config.API_ENDPOINT_URL}/authen/signup`, data, null)
            .then((response) => {
                if (response.status == 200) {
                    if (response.data.user) {
                        dispatch({ type: 'FETCH_USER_ACCOUNT_FULFILLED', payload: response.data.user });
                    } else {
                        dispatch({ type: 'FETCH_USER_ACCOUNT_REJECTED', payload: { type: 'sys', message: 'Error while signing up' } });
                    }
                } else {
                    dispatch({ type: 'FETCH_USER_ACCOUNT_REJECTED', payload: response.data.error });
                }
            })
            .catch((error) => {
                dispatch({ type: 'FETCH_USER_ACCOUNT_REJECTED', payload: { type: 'sys', message: error } });
            });
    }
}

export function facebookLogIn(data) {
    return (dispatch) => {
        dispatch({ type: 'FETCH_USER_ACCOUNT_PENDING' });
        axios.post(`${config.API_ENDPOINT_URL}/authen/facebook`, data, null)
            .then((response) => {
                if (response.status == 200) {
                    if (response.data.user) {
                        dispatch({ type: 'FETCH_USER_ACCOUNT_FULFILLED', payload: response.data.user });
                    } else {
                        dispatch({ type: 'FETCH_USER_ACCOUNT_REJECTED', payload: { type: 'sys', message: 'Error while login with Facebook' } });
                    }
                } else {
                    dispatch({ type: 'FETCH_USER_ACCOUNT_REJECTED', payload: response.data.error });
                }
            })
            .catch((error) => {
                dispatch({ type: 'FETCH_USER_ACCOUNT_REJECTED', payload: { type: 'sys', message: error } });
            });
    }
}

export function googleLogIn(data) {
    return (dispatch) => {
        dispatch({ type: 'FETCH_USER_ACCOUNT_PENDING' });
        axios.post(`${config.API_ENDPOINT_URL}/authen/google`, data, null)
            .then((response) => {
                if (response.status == 200) {
                    if (response.data.user) {
                        dispatch({ type: 'FETCH_USER_ACCOUNT_FULFILLED', payload: response.data.user });
                    } else {
                        dispatch({ type: 'FETCH_USER_ACCOUNT_REJECTED', payload: { type: 'sys', message: 'Error while login with Google' } });
                    }
                } else {
                    dispatch({ type: 'FETCH_USER_ACCOUNT_REJECTED', payload: response.data.error });
                }
            })
            .catch((error) => {
                dispatch({ type: 'FETCH_USER_ACCOUNT_REJECTED', payload: { type: 'sys', message: error } });
            });
    }
}

export function updateUserBalance(userId, amount) {
    axios.patch(`${config.API_ENDPOINT_URL}/user/${userId}/${amount}/updateBalance`, null, null)
        .then((response) => {
            console.log("user's balance is updated");
        })
        .catch((error) => {
            console.log("update user'sbalance failed " + error);
        })
}