<a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>

<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
[![Codecov Coverage](https://img.shields.io/codecov/c/github/moit/moit-server/<develop>.svg?style=flat-square)](https://codecov.io/gh/moit/moit-server/)

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Prerequisite

```bash
# install ts-node (may need sudo)
$ npm -g install ts-node

# install sqlite3 (for test)
$ sudo apt-get install sqlite3
$ sqlite3 --version

# install global ts-node
$ npm install -g ts-node
```

## Running the app

```bash
# local
$ npm run start

# production mode
$ npm run start:prod
```

## Test

```bash
# unit test
$ npm run test

# e2e test
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Lint

use settings.json in VSCode

open settings

```bash
# cmd + shift + p (or ctrl + shift + p)
```

write lint settings

```json
"editor.formatOnSave": true,
"[typescript]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```
