import io from 'socket.io-client';

function presenceConnector(token, presenceUrl, joinRoomCallback, alreadyConnectedCallback) {
    this._socket = io.connect(presenceUrl, {'forceNew': true});
    this._socket.on('connect', () => {
        this._socket.emit('client-get-partner', token);
    });
    this._socket.on('server-join-room', (realtimeUrl, roomId, partnerInfo) => {
        joinRoomCallback(realtimeUrl, roomId, partnerInfo);
    });
    this._socket.on('server-already-connected', () => {
        alreadyConnectedCallback();
        setTimeout(() => {
           this._socket.emit('client-get-partner', token);
        }, 10000);
    });
    this.isConnected = function() {
        return this._socket.connected;
    }
    this.disconnect = function() {
        this._socket.disconnect();
    }
    this.reconnect = function() {
        this._socket.connect();
    }
};

module.exports = presenceConnector;
