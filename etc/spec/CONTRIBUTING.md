# Contributor Guidelines

In order to set up Unimeet locally see [Installation](#installation) below.

Before contributing code, read the [Architecture
specification](ARCHITECTURE.md).

In order to understand the design choices and structure of Unimeet read the [UX
specification](UXSPECIFICATION.md).

## Installation

- Clone the repo
- Set up the development environment for each module

Unimeet is developed in [Python 2.7](https://www.python.org/) and [Node.js
6.3](https://nodejs.org/). Make sure you have installed these packages to your
system before proceeding.

You can install all dependencies by running the standard installation script

```sh
unimeet $ ./install.sh
```

and start the modules by using the provided script (ignore the Nginx prompt):

```sh
unimeet $ ./start.sh
```

Otherwise, you can setup each module separately.

### Frontend

- Install the dependencies by running:

```sh
unimeet/frontend $ npm install
```

- Start the development server by running:

```sh
unimeet/frontend $ npm start
```

- Create a production build by running:

```sh
unimeet/frontend $ npm run build
```

### Presence

- Install the dependencies by running:

```sh
unimeet/presence $ npm install
```

- Start the development server by running:

```sh
unimeet/presence $ npm start
```

### Realtime

- Install the dependencies by running:

```sh
unimeet/realtime $ npm install
```

- Start the development server by running:

```sh
unimeet/realtime $ npm start
```

### Matchmaker

- Install the dependencies by running:

```sh
unimeet/matchmaker $ npm install
```

- Start the development server by running:

```sh
unimeet/matchmaker $ npm start
```

### Backend

- Create and activate a virtual environment:

```sh
unimeet/backend $ virtualenv env
unimeet/backend $ source env/bin/activate
```

- Install the backend dependencies:

```sh
unimeet/backend $ pip install -r requirements.txt
```

- Start the backend server:

```sh
unimeet/backend $ python manage.py runserver
```

## Nginx setup

In order to test Unimeet in production environment you need to set it up for
[Nginx](https://nginx.org/en/). Install Nginx on your system and add a virtual
host for Unimeet.

We provide a basic virtual host for Unimeet [here](../config/nginx/unimeet.gr).
In order for it to work you need to make a few changes:

- Change _/path/to_ for the frontend to the directory of your built frontend
  (usually this would be _/var/www/unimeet.gr_). Make sure the necessary access
  permissions are met.

- Change _/path/to_ for the uwsgi backend socket. Same as before check the
  permissions (usually use _/var/www/unimeet.gr_).

You also need to change the backend uwsgi ini file:

- Change the base path to the __absolute__ path of the directory where you have
  cloned unimeet. For example, if you cloned unimeet to _/tmp_ then the
  base should be _/tmp/unimeet/backend_.

- Change _/path/to_ for the socket to be the same as the one you used at the
  nginx virtual host (if you followed the recommendations, that is
  _/var/www/unimeet.gr_).

You may also change the _/etc/hosts_ file of your system, so that the module
domains point to your localhost as below:

```
127.0.0.1       unimeet.gr
127.0.0.1       backend.unimeet.gr
127.0.0.1       realtime.unimeet.gr
127.0.0.1       presence.unimeet.gr
127.0.0.1       matchmaker.unimeet.gr
```

Finally, when running __start.sh__, don't forget to answer __y__ when asked
about Nginx.

## Tests

Please test your code! New code that is not tested __will not__ be merged to
master.

## Contributing code

In order to contribute code open a Pull Request at [Unimeet's Github
repo](https://github.com/dimkarakostas/unimeet).
