# 한번에,빠르게 moit - backend
### 제1회 Unidthon 대상 수상작
대학생을 위한 배달 서비스
[@Frontend](https://github.com/dionidip/moit-frontend) [@IOS](https://github.com/jaeho0718/moti-ios)

<img src="./assets/HomeView.png" width="250" height="500">


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
