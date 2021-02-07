# Wash Your Hands

![Logo of the project](./src/assets/icon.png =100x)

This app notifies you should wash your hands when you stay somewhere after you move and at intervals.

## The reason I made this app public

I was not able to make this app available in Apple Store because this app is related to covid19. I and my partner wanted to contribute to encourage people wash their hands and prevent themselves from being infected, but we couldn't because of Apple guideline. I mean I won't blame Apple because it does make sense. So I made this app public in case anyone can make use of this app codebase.

## Installing / Getting started

A quick introduction of the minimal setup you need to get running.

```shell
yarn install
yarn start
```

In order to install dependencies, you should execute `yarn install`. With `yarn start`, that executes `expo start` internally, which runs expo virtual environment. You can run this app with Expo client on your mobile phone or simulator.

### Initial Configuration

As I told you above, you need to execute `yarn install` in order to download and install dependencies. That command runs expo. You should install [expo cli](https://docs.expo.io/).

## Developing

If you want to start to develop this app, clone this project and install dependencies.

```shell
git clone https://github.com/maaaashin324/wash-your-hands.git
cd wash-your-hands
yarn install
```

### Linter and code formatter

This project uses eslint and Prettier. Please make sure that you have eslint and prettier extension installed on your IDE.

### TDD/BDD

This project uses jest and react-test-renderer. Ideally I should have done TDD/BDD, but I actually did that partially. My future work is to add all of tests that are necessary. (I love TDD/BDD!)

### Building

This project uses expo, which provides features for building with you. In order to build iOS app, you can use the following command.

```shell
expo build:ios
```

When you build an app for Android, the following command is available.

```shell
expo build:android
```

You can know the detail [here](https://docs.expo.io/versions/latest/distribution/building-standalone-apps/).

## Licensing

Masataka Shintoku
