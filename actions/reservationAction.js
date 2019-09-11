import config from '../misc/config';
import axios from 'axios';

export function fetchReserveInfo(userId, parkingId, floor){
    return (dispatch) => {
        dispatch({ type: "FETCH_RESERVATION_PENDING" });
        axios.get(`${config.API_ENDPOINT_URL}/reservationProcess/${userId}/${parkingId}/${floor}/reserveInformation`, null, null)
            .then((response) => {
                var reservation = response.data;
                dispatch({ type: 'FETCH_RESERVATION_FULFILLED', payload: reservation });
                console.log("reservationAction = " + reservation._id);
            })
            .catch((error) => {
                dispatch({ type: 'FETCH_RESERVATION_REJECTED', payload: error});
                console.log("reservationAction fetching error");
                console.log(error);
            });
    }
}

export function insertReservation(data){
    axios.post(`${config.API_ENDPOINT_URL}/reservation/`, data, null)
        .then((response) => {
            console.log("reservation success " + response);
        })
        .catch((error) => {
            console.log("reservation failed" + error);
        })

    //update slot available through hardware
}