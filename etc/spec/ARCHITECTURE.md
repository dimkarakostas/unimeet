Unichat is an anonymous chat service for university students.

# Overview

Unichat is a service-based architecture system which contains multiple
independent components, which will be described in following sections.

# Realtime

This component is responsible for bringing together two clients. It listens for
new client connections, creates the appropriate chat rooms and forwards messages
from the clients.

It is implemented in [Node.js](https://nodejs.org/en/).  The websocket API
exposed by the realtime service is explained below.

## client <-> realtime protocol

The client / real-time protocol is implemented using
[socket.io](http://socket.io/) websockets.

### client-hello / server-hello

The initialization of the connection between the client and the realtime is
achieved by the _client-hello_ and _server-hello_ requests. When the client
connects for the first time, it emits a _client-hello_ request, to which the
server responds with _server-hello_.

### join-room

Upon receival of the _server-hello_ request, the client emits a _join-room_
request, which contains the _roomId_ of the chat room it wishes to join. The
realtime will then subscribe the client to the _socket.io_ room identified by
_roomId_.


### client-leave-room

When the client wishes to leave a room, it emits a _client-leave-room_ request
containing the _roomId_ of the room it wishes to leave. The realtime will then
unsubscribe this client from said room.


### send / message

When the client wishes to send data to a room, it emits a _send_ request that
contains the following parameters: _roomId_ and _message_. _roomId_ identifies
the room that the client wishes to send the data to, while _message_ contains
the data to be sent.

Upon receival of a _send_ request, the realtime emits a _message_ request to the
chat room identified by _roomId_. That way it forwards the data identified by
the _message_ field of the _send_ request to all members in this room. Note:
Since the sender client is a member of this room, it will also receive a
_message_ request regarding the data it originally sent.

# Registrar

This component is responsible for client registration, database management and
user manipulation.

It is implemented in [Node.js](https://nodejs.org/en/) and
[Sequelize](http://docs.sequelizejs.com/en/v3/). The websocket API
exposed by the registrar service is explained below.

## client <-> registrar protocol

The client / real-time protocol is implemented using
[socket.io](http://socket.io/) websockets.

### client-hello / server-hello

Same as with the realtime communication, the initialization of the connection
between the client and the registrar is achieved by the _client-hello_ and
_server-hello_ requests.

### register / server-register

The client emits a _register_ request in order to register a new user with the
registrar. This request includes the following data fields:
    email - the user's email address,
    sex - the user's sex (false -> male, true -> female),
    password - the user's chosen password,
    password_confirmation - the password verification field,
    UniversityId - the database id of the user's university.
The server emits a _server-register_ request when the process is complete and
sends a message, either of registration verification or an error that occured.

### start-chat / server-start-chat

The client emits a _start-chat_ in order to initiate a chat conversation. The
server then is responsible for finding a proper partner and alerting both the
client and the partner with _server-start-chat_ requests. These requests contain
two fields:
    partnerEmail - the email address of the chosen chat partner,
    roomId - the Id of the room in the realtime server.
