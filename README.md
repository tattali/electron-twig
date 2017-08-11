# electron twig
This module is a simple `file` protocol interceptor for [electron](https://github.com/atom/electron) which compiles all (local) URLs to files with `.twig` extension.

It's inspired by [yan-foto/electron-pug](https://github.com/yan-foto/electron-pug)

# Installation

```
npm install electron-twig
```

# Usage
Just initialize this module with [Twig](https://www.npmjs.com/package/twig) package trougth `electron-twig`:

```js
const {app, BrowserWindow} = require('electron')
const twig                 = require('electron-twig')

app.on('ready', () => {
  let win = new BrowserWindow({width: 800, height: 600})

  win.loadURL(`file://${__dirname}/view/index.html.twig`)

  // etc.
})
```
