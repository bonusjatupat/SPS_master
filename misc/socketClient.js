import config from './config';

import io from 'socket.io-client';
const socket = io(config.SOCKET_DOMAIN, { 
    transports: ['websocket']
});

function socketConnection(cb) {
    socket.on('connect', () => {
        console.log("[SOCKET] CONNECT STATUS: " + socket.connected + ", ENDPOINT URL: " + config.API_ENDPOINT_URL);
        cb(null);
    });
}

function joinRealTimeParking(ids, cb) {
    socket.emit('startListenRealTimeParking', ids);
    cb(null, ids);
}

function leaveRealTimeParking(ids, cb) {
    socket.emit('endListenRealTimeParking', ids);
    cb(null, ids);
}

function subscribeRealTimeParking(cb) {
    socket.on('refreshRealTimeParking', (slotData) => {
        cb(null, slotData);
    });
}

export { socketConnection, joinRealTimeParking, leaveRealTimeParking, subscribeRealTimeParking };