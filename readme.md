# SensiGrid

Grid built on JS for rendering CSV data. Primarily for learning JS.

## Features

* Can render a GRID from a CSV file
* ES6 as a source.
* Exports in a [umd](https://github.com/umdjs/umd) format so your library works everywhere.

## Usage Specification
```
Very basic usage - through conventional script inclusion
    <script src="../output/SensiGrid.js"></script>
    <script type="text/JavaScript">
        var grid;
        window.onload = function() {
            grid = new SensiGrid('table_container', 500, 80, './data/JIRA-sample.csv');
            //debugger;
            grid.caption = 'A basic Table';
        }
        
    </script>
    <div id='table_container'></div>
```
* ES6 test setup with [Mocha](http://mochajs.org/) and [Chai](http://chaijs.com/).

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
```

*Have in mind that you have to build your library before publishing. The files under the `output` folder are the ones that should be distributed.*

## Basic usage
* Refer the `example` folder for a working sample
* Completely customizable through CSS. look for the `style.css` in `css` folder under `example` folder.
* CSS `class-names` are pre-fixed as of now.

## Examples
A complete working sample has been provided in the `example` folder.

## Scripts

* `npm run build` - produces production version of your library under the `lib` folder
* `npm run dev` - produces development version of your library
* `npm run test` - well ... it runs the tests :)
* `npm run start` - starts a local server (port: 8080) and watches the files 

