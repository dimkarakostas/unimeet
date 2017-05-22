import io from 'socket.io-client';

function realtimeConnector(cookie, realtimeUrl, roomId, handleNewMessageCallback, handleNextCallback, disableChatCallback) {
    this._chatting = false;
    this._socket = io.connect(realtimeUrl, {'forceNew': true});
    this._socket.on('connect', () => {
        this._socket.emit('client-join-room', roomId, cookie);
    });
    this._socket.on('server-start-chatting', () => {
        // If already chatting, ignore this message
        if (!this._chatting) {
            disableChatCallback(false);
            this._chatting = true;
        }
    });
    this._socket.on('server-message', (message, from) => {
        handleNewMessageCallback(message, from);
    });
    this._socket.on('server-next', () => {
        handleNextCallback('server');
        this.disableChat();
    });
    this._socket.on('disconnect', () => {
        handleNextCallback('server');
        this.disableChat();
    });
    this.broadcastMessage = function(message) {
        this._socket.emit('client-message', message);
    };
    this.broadcastNext = function() {
        this._socket.emit('client-next');
        this.disableChat();
    };
    this.disableChat = function() {
        disableChatCallback(true);
        this._chatting = false;
    }
    this.disconnect = function() {
        this._socket.disconnect();
    }
    this.reconnect = function() {
        this._socket.connect();
    }
};

module.exports = realtimeConnector;
