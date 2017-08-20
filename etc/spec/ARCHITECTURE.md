# Overview

Unimeet is a service-based architecture system which contains multiple
independent components. The main modules are the registrar, the presence, the
realtime and the backend module.

# Frontend

The frontend client component is the code that runs on the user's browser. It is
implemented with [React](https://facebook.github.io/react/).

## Pages

The frontend consists of two main dynamic pages and multiple static pages. The
common component across all pages is the topbar that contains the Unimeet logo
and a navigation menu when necessary.

See the [UX specification](UXSPECIFICATION.md) for more information.

## Code structure

The code is structured on directories based on the functionality in the context
of the Unimeet website. It is structured in the common React project structure,
with a _public_ and a _src_ folder.

The _public_ folder contains _index.html_. This file is the React HTML template
and is used to include links to CSS libraries used across Unimeet. These
libraries are [__Bootstrap__](http://getbootstrap.com/),
[__font-awesome__](http://fontawesome.io/) and
[__react-bootstrap-table__](http://allenfang.github.io/react-bootstrap-table/).

The base file is the _index.js_ that exists in the _src_ folder. This file
contains the routes to the different pages of Unimeet, imports the CSS
code that is common across the website and serves as the root of the React code.

The components are then structured in the _components_ folder inside _src_.
Therefore there are the _welcome_, _chat_ etc folders for the different pages,
as well as the _common_ folder for the React components that are used in more
that one pages.

A page's folder contains the _index.js_ file, that exports whatever is
necessary, the root page JS file whose name is the capitalized name of the page
(e.g. __Chat.js__ for the chat page, __Welcome.js__ for the welcome page etc),
and the _styles.css_ file that contains the CSS code for the specific page. The
rest of the page's code is structured in directories based on its functionality.
Therefore there may exist a folder called _navigation_, that contains the React
components that form the topbar navigation menu, a _body_ folder for the page's
body components, a _communication_ folder for the libraries responsible for
communication with the backend, or any other folder the developer deems
necessary.

# Matchmaker

This component is responsible for making the matches between users. It
communicates with the presence services to have an accurate state of the
connected clients, it keeps track of the state of all presence/realtime
services and communicates with the backend to get user information.

## presence/realtime <-> matchmaker

The matchmaker communicates with all presence and realtime services over a
websocket established using [socket.io](http://socket.io/), the matchmaker
being the client side of the communication.

### register-matchmaker

When the matchmaker establishes a connection with a presence/realtime service,
it emits a _register-matchmaker_ message, in order for the service to know which
socket.io client corresponds to the matchmaker service.

### presence-find-partner / matchmaker-send-to-room

The matchmaker receives a _presence-find-partner_ message from a presence
service in order to start searching for a match for the given user, who is
identified by the cookie that is included in the message request. The matchmaker
then searches for a match based on the user's preferences and interests. When
such a match is found, it emits a _matchmaker-send-to-room_ message to the
presence service that originally sent the _presence-find-partner_ message,
which includes the cookie of the user, the realtime URL and the room Id that the
user should connect to.

# Presence

This component is the stage after a user has logged in and while waiting to be
matched with a partner. It is responsible for keeping track of all non-chatting
logged-in users and communicating with the matchmaker service to make matches.

## Structure

The presence implements a single server for websocket connections. Both the
matchmaker service and the frontend clients connect to the presence using the
same client object, therefore the websocket exposed to the matchmaker and the
frontend is the same.

It is important to **always** check that a message corresponding to a matchmaker
communication, i.e. a message that normally comes only from the matchmaker
service, actually came from the registered matchmaker, otherwise a malicious
frontend client might impersonate the matchmaker.

## frontend/matchmaker <-> presence

The frontend client and the matchmaker service connect with the presence using
[socket.io](http://socket.io/) websockets.

### connect

The client initiates the connection with the presence server using a hardcoded URL
address. Upon receiving the _connect_ message from the presence it proceeds to find
a partner.

### client-get-partner / presence-find-partner

When the client wishes to start chatting it emits a _client-get-partner_
message. Upon receiving it, the presence sends a _presence-find-partner_ to the
matchmaker service to try and find a match for the user based on its interests
and preferences. Both message requests include the client's cookie, in order to
identify the user that made the request.

The presence keeps a list of the cookies all clients that have not been matched
yet. If the matchmaker connection drops, upon reconnection it reissues the
_presence-find-partner_ message for all clients so that the matchmaker can start
its process again.

### matchmaker-send-to-room / server-join-room

When a match has been found, the matchmaker has sent a _matchmaker-send-to-room_
message with the realtime, roomId and cookie parameters to the presence. When
the presence receives it, it emits a _server-join-room_ to the client identified
by the cookie that contains the realtime URL that the client should connect to
and the room id that it should join.

### disconnect / reconnect

After the client has been matched and received a _server-join-room_ it
disconnects from the presence server in order to avoid unnecessary resource
allocation. When the client leaves the chat room, it will reconnect to the
presence and start the process again from the beginning.

# Realtime

This component is the intermediary in the communication of two frontend clients.
It consists of multiple chat rooms and is responsible for forwarding chat
messages from one client to all other members in the chat room.

## Structure

The realtime's structure is similar to the presence's described above. Please
look at that description for important notes

## client <-> realtime

The frontend client and the matchmaker service connect with the realtime using
[socket.io](http://socket.io/) websockets.

### connect

The client initiates the connection with the realtime server, using a hardcoded
URL address. The React code then to join a realtime room.

### client-join-room / server-start-chatting

The client emits a _client-join-room_ that contains a single __string__
parameter, the __roomId__. When the realtime listens on this message it puts the
client in the room identified by __roomId__ and waits until its partner has also
joined the room. When at least two clients coming from different people have
joined the room the conversation can begin, so it emits a
_server-start-chatting_ in the entire room in order to notify all clients that
they can start sending messages. Each time a new client joins the room, the
realtime will also emit a _server-start-chatting_ message in the room, which
already chatting clients should ignore.

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

After the client emits the _server-next_ it reconnects to the presence to find a
new partner and no longer needs to hold the connection to the realtime.
Therefore it disconnects from the realtime to save resources and after having
been matched with a new partner it reconnects to the realtime following the
described protocol. If the client disconnects due to a connection crash or if
the user closes the browser, the realtime checks if the only client in the room
is the user's partner, in which case it emits a _server-next_ message to the
entire room to notify the user's partner to search for a new partner.

# Backend

This component is responsible for client registration, logging in and database
management.

It is implemented in [Django](https://www.djangoproject.com/). The API exposed by the
backend service is explained below.

## API

The backend offers a RESTful API that is explained below.

### /signup

POST parameters:
- email: The academic email of the user

If the email is valid, it registers the user to the database and responds with
200, otherwise it responds with 400.

### /login

POST parameters:
- email: The academic email of the user
- password: The user's password

If the email/password match, then it logs the user in, sets the Django auth
cookies and responds with a 200 and the React frontend code redirects to the
chat page, otherwise it responds with 400.

### /logout

GET request that is accessed using the Django auth cookies. If the cookies are
valid it responds with 200 otherwise 400.

### /is\_user\_logged\_in

If the GET request includes valid Django auth cookies, then it responds with 200
JSON response with the email and the Unimeet auth token of the user. If no
cookies are offered, it responds with a redirect to the Unimeet welcome page.

### /user\_info

For a GET request, it must either offer the Django auth cookies or the Unimeet
auth token for a user. In that case it responds with 200 JSON that contains the
gender and school info of the user. Otherwise it responds with 400.

For a POST request, it must offer the Django auth cookies and set the POST
parameters:
- gender: The new gender setting of the user (integer)

In that case it updates the user's gender and responds with 200, otherwise 400.

### /user\_interests

Authenticates exactly as the /user\_info.

GET response JSON contains the gender the user is interested in and the list of
school codes.

POST request parameters:
- interestedInGender: The new gender setting of the user (integer)
- interestedInSchools: A list of school codes for the new interests of the user

### /change\_password

Needs Django auth cookies for authentication.

POST parameters:
- oldPassword: the current active password for the user
- newPassword: the new password
- newPasswordVerification: the new password verification

If the new password matches the verification and the old password the current,
it updates the password and the Django session cookies and responds with 200,
otherwise 400.

### /delete\_user

Needs Django auth cookies for authentication and accepts only DELETE requests.
In that case, it deletes the user from the database and responds with 200
otherwise 400.

### /forgot\_password

POST parameters:
- email: the email of the user

If the user exists in the database, it updates its password, sends an email to
the given address with the new password and then responds with 200, otherwise
400.

Note: This is a design choice that results in information leakage. Specifically,
anybody can try email addresses and, in case of 200, can recognise that the
address is signed up for Unimeet.

### /contact

POST parameters:
- name: The name of the user
- email: The email of the user
- message: The contact form message

It tries to send a self-email to the Unimeet email address with the contact form
message and then a reassuring email to the user's address. If all go well it
responds with 200, otherwise 400.
