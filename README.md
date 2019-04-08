# Electron Twig
[![npm](https://img.shields.io/npm/v/electron-twig.svg)](https://www.npmjs.com/package/electron-twig)
[![npm](https://img.shields.io/npm/dt/electron-twig.svg)](https://www.npmjs.com/package/electron-twig)
[![David](https://img.shields.io/david/tattali/electron-twig.svg)](https://www.npmjs.com/package/electron-twig)

Get [Twig.js](https://github.com/twigjs/twig.js) the JS implementation of the Twig Templating Language on [electron](https://github.com/atom/electron) projects.

This package is a simple `file protocol interceptor` which compiles files with `.twig` extension.

## Installation

```
npm install electron-twig
```

## Usage

```js
const {app, BrowserWindow} = require('electron')
const twig                 = require('electron-twig')

app.on('ready', () => {
  let win = new BrowserWindow({width: 800, height: 600})

  win.loadURL(`file://${__dirname}/views/index.html.twig`)

  // etc.
})
```

Put variables in template

```js
const {app, BrowserWindow} = require('electron')
const twig                 = require('electron-twig')

app.on('ready', () => {
  let win = new BrowserWindow({width: 800, height: 600})

  win.loadURL(`file://${__dirname}/views/index.html.twig`)
  twig.view = {
    foo: 'bar'
  }

  // etc.
})
```

If you have an error like that :
```
you are using twig.js in sync mode in combination with async extensions
```

You have to use the async version.


For async version add a variable `is_async: true`

```js
const {app, BrowserWindow} = require('electron')
const twig                 = require('electron-twig')

app.on('ready', () => {
  let win = new BrowserWindow({width: 800, height: 600})

  new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve();
    }, 300);
  }).then(() => {

    win.loadURL(`file://${__dirname}/views/index.html.twig`)
    twig.view = {
      foo: 'bar',
      is_async: true
    }

  });

  // etc.
})
```
