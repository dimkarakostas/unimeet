Unichat is an anonymous chat service for university students.

# Overview

Unichat is a service-based architecture system which contains multiple
independent components. The main modules are the registrar, the hall, the
realtime and the backend module.

# Realtime

This component is the intermediary in the communication of two frontend clients.
It consists of multiple chat rooms and is responsible for forwarding chat
messages from one client to all other members in the chat room.

It is implemented in [Node.js](https://nodejs.org/en/).  The websocket API
exposed by the realtime service is explained below.

## client <-> realtime

The client / realtime protocol is implemented using
[socket.io](http://socket.io/) websockets.

### connect

The client initiates the connection with the realtime server, using a hardcoded
URL address. Upon receiving _connect_ from the realtime it proceeds to join a
room.

### client-join-room / server-join-room

The client emits a _client-join-room_ that contains a single __string__ parameter,
the __roomId__. When the realtime listens on this message it puts the client in
the room identified by __roomId__ and emits a _server-join-room_.

### client-message / server-message

When the client wishes a message to the room, it emits a _client-message_ with a
single __string__ parameter, the __message__. Upon receiving a _client-message_
the realtime brodcasts it to the room (except of the original client-sender of
the message) by emitting a _server-message_ witch contains two ordered specific
parameters, a __string__ called __message__ which contains the transmitted
message and a __string__ that contains one of the strings __"partner"__ or
__"me"__ which is used to identify the person that sent the message in case of
multiple frontend clients per person.

### client-next / server-next

When a person wishes to change partner and presses the Next button, the
client emits a _client-next_ message. When the realtime receives such a message,
it removes the client from the room and emits a _server-next_ to all clients in
the room. When a client receives a _server-next_ in turn follows the process as if
the Next button had been pressed on its end. In the end, the room will contain 0
clients.

### disconnect / reconnect

After the client emits the _server-next_ it reconnects to the hall to find a new
partner and no longer needs to hold the connection to the realtime. Therefore it
disconnects from the realtime to save resources and after having been matched
with a new partner it reconnects to the realtime following the described
protocol.

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
