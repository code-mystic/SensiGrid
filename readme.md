# SensiGrid

Grid built on JS for rendering CSV data. Primarily for learning JS.

## Features

* Can render a GRID from a CSV file
* ES6 as a source.
* Exports in a [umd](https://github.com/umdjs/umd) format so your library works everywhere.
* Usage Specification
```
// ES2015 module import
import * as webpackNumbers from 'webpack-numbers';
// CommonJS module require
var webpackNumbers = require('webpack-numbers');
// ...
// ES2015 and CommonJS module use
webpackNumbers.wordToNum('Two');
// ...
// AMD module require
require(['webpackNumbers'], function ( webpackNumbers) {
  // ...
  // AMD module use
  webpackNumbers.wordToNum('Two');
  // ...
});
```
* ES6 test setup with [Mocha](http://mochajs.org/) and [Chai](http://chaijs.com/).
* Linting with [ESLint](http://eslint.org/).

## Process

```
ES6 source files
       |
       |
    webpack
       |
       +--- babel, eslint
       |
  ready to use
     library
  in umd format
```

*Have in mind that you have to build your library before publishing. The files under the `output` folder are the ones that should be distributed.*

## Getting started

## Scripts

* `npm run build` - produces production version of your library under the `lib` folder
* `npm run dev` - produces development version of your library and runs a watcher
* `npm run test` - well ... it runs the tests :)
* `npm run test:watch` - same as above but in a watch mode

