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

### Frontend

- Install the dependencies by running:

```sh
unimeet/frontend $ npm install
```

- Start the development server by running:

```sh
unimeet/frontend $ npm start
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

## Tests

Please test your code! New code that is not tested __will not__ be merged to
master.

## Contributing code

In order to contribute code open a Pull Request at [Unimeet's Github
repo](https://github.com/dimkarakostas/unimeet).
