# generator-underhood

[![Greenkeeper badge](https://badges.greenkeeper.io/iamstarkov/generator-underhood.svg)](https://greenkeeper.io/)

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][depstat-image]][depstat-url]

> Yeoman generator to create collective twitter website

## Installation

    npm i -g yo generator-underhood

## Usage

    yo underhood

## Pre-requisite for first time

Obviously, GitHub Repo for site and Collective Twitter account itself.

1. [Get Twitter API tokens][twapi] logged in with your collective Twitter account.
2. [Get GitHub Access token][gat]
3. Enable project on travis: https://travis-ci.org/profile/  
  ![][travisci-enable]
4. Add you Twitter Tokens and Github Access Token to settings page, with following names: `TWITTER_CONSUMER_KEY`, `TWITTER_CONSUMER_SECRET`, `TWITTER_ACCESS_TOKEN_KEY`, `TWITTER_ACCESS_TOKEN_SECRET` and `GITHUB_TOKEN`
  ![][travisci-settings]
5. 🎈 you are ready to run `yo underhood` for first time!

[twapi]: https://iamstarkov.com/get-twitter-tokens/
[gat]: https://help.github.com/articles/creating-an-access-token-for-command-line-use/
[travisci-enable]: https://camo.githubusercontent.com/1ed4c296fcb041d80373d41ef5baa568f55d615d/687474703a2f2f692e696d6775722e636f6d2f6d4e34457668432e706e67
[travisci-settings]: http://i.imgur.com/dRp8ptv.png


## License

MIT © [Vladimir Starkov](https://iamstarkov.com/)

[npm-url]: https://npmjs.org/package/generator-underhood
[npm-image]: https://img.shields.io/npm/v/generator-underhood.svg?style=flat-square

[travis-url]: https://travis-ci.org/iamstarkov/generator-underhood
[travis-image]: https://img.shields.io/travis/iamstarkov/generator-underhood.svg?style=flat-square

[depstat-url]: https://david-dm.org/iamstarkov/generator-underhood
[depstat-image]: https://david-dm.org/iamstarkov/generator-underhood.svg?style=flat-square
