import config from '../misc/config';
import { calculateDistance } from '../misc/utils';

import axios from 'axios';
import { joinRealTimeParking } from '../misc/socketClient';

export function fetchNearBy(curLocation, dstLocation) {
    return (dispatch) => {
        axios.get(`${config.API_ENDPOINT_URL}/parking/find/${curLocation.lat}/${curLocation.long}`, null, null)
            .then((response) => {
                var parkingSpotRegions = [];
                const arrPromises = response.data.parking.map((item, index) => {
                    return new Promise((resolve) => {
                        parkingSpotRegion = {};
                        parkingSpotRegion = item;
                        parkingSpotRegion.id = index;
                        parkingSpotRegion.opened = true;
                        parkingSpotRegion.star = 3;
                        if(item.numberSlot.total > 0){
                            parkingSpotRegion.available = ((item.numberSlot.total - item.numberSlot.used) / item.numberSlot.total) * 100;
                        }else{
                            parkingSpotRegion.available = 0;
                        }
                            /*if (item.slotCounter.totalSlot > 0) {
                            parkingSpotRegion.available = item.slotCounter.availableSlot / item.slotCounter.totalSlot * 100;
                        } else {
                            parkingSpotRegion.available = 0;
                        }*/
                        parkingSpotRegion.distance = calculateDistance(item.address.location.coordinates[1], item.address.location.coordinates[0], dstLocation.lat, dstLocation.long).toFixed(2);
                        parkingSpotRegions.push(parkingSpotRegion);
                        resolve();
                    });
                });
                Promise.all(arrPromises)
                    .then(() => {
                        if (parkingSpotRegions.length > 0) {
                            parkingSpotRegions.sort(function(a, b) {
                                return parseFloat(a.distance) - parseFloat(b.distance);
                            });
                           
                            // JOIN INTO Real-Time Socket
                            let parkingIDs = parkingSpotRegions.map((x) => { return x._id });
                            joinRealTimeParking(parkingIDs, (err, ids) => {
                                dispatch({ type: 'FETCH_PARKING_FULFILLED', payload: parkingSpotRegions });
                            });
                        } else {
                            dispatch({ type: 'FETCH_PARKING_FULFILLED', payload: [] });
                        }
                    });
            })
            .catch((error) => {
                dispatch({ type: 'FETCH_PARKING_REJECTED', payload: error });
            });
    }
}

export function refreshRealTimeParking(parkingData) {
    return (dispatch) => {
        dispatch({ type: 'FETCH_PARKING_REJECTED', payload: error });
    }
}