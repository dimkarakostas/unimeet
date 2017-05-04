import io from 'socket.io-client';

function hallConnector(hallUrl) {
    this._socket = io.connect(hallUrl, {'forceNew': true});
    this._socket.on('connect', () => {
    });
};

module.exports = hallConnector;
