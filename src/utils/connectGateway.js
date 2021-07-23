import io from 'socket.io-client';

const gateWayUrl = window.env ? window.env.REACT_APP_ADMIN_API_WEB_SOCKET : process.env.REACT_APP_ADMIN_API_WEB_SOCKET;

let socket = io(gateWayUrl);

export const initiateSocket = () => {
    if (socket) socket.on('connection', data => console.log(data));
}

export const disconnectSocket = () => {
    if (socket) socket.disconnect();
}

export const subscribeToEmails = (callback) => {
    if (!socket) return (true);
    socket.on('getEmails', msg => {
        return callback(null, msg);
    });
}

export const subscribeToImapAccounts = (callback) => {
    if (!socket) return (true);
    socket.on('getImapAccounts', msg => {
        return callback(null, msg);
    });
}

export const unSubscribeFromSocket = (props) => {
    return socket.off(props)
}

export const subscribeToCount = (callback) => {
    if (!socket) return (true);
    socket.on('getCount', msg => {
        return callback(null, msg);
    });
}


export const socketIo = () => {
    return socket;
}

