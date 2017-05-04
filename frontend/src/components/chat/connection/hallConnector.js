import io from 'socket.io-client';

function hallConnector(hallUrl, joinRoomCallback) {
    this._socket = io.connect(hallUrl, {'forceNew': true});
    this._socket.on('connect', () => {
        this._socket.emit('client-get-partner');
    });
};

module.exports = hallConnector;
