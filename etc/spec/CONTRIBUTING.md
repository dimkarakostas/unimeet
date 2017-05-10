# Contributor Guidelines

In order to set up Unichat locally see [Installation](#installation) below.

Before contributing code, read the [Architecture
specification](ARCHITECTURE.md).

In order to understand the design choices and structure of Unichat read the [UX
specification](UXSPECIFICATION.md).

## Installation

- Clone the repo
- Set up the development environment for each module

Unichat is developed in [Python 2.7](https://www.python.org/) and [Node.js
6.3](https://nodejs.org/). Make sure you have installed these packages to your
system before proceeding.

### Frontend

- Install the dependencies by running:

```sh
unichat/frontend $ npm install
```

- Start the development server by running:

```sh
unichat/frontend $ npm start
```

### Presence

- Install the dependencies by running:

```sh
unichat/presence $ npm install
```

- Start the development server by running:

```sh
unichat/presence $ npm start
```

### Realtime

- Install the dependencies by running:

```sh
unichat/realtime $ npm install
```

- Start the development server by running:

```sh
unichat/realtime $ npm start
```

## Tests

Please test your code! New code that is not tested __will not__ be merged to
master.

## Contributing code

In order to contribute code open a Pull Request at [Unichat's Github
repo](https://github.com/dimkarakostas/unichat).
