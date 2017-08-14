'use strict';

const {app, protocol} = require('electron')
const path            = require('path')
const fs              = require('fs')
const twig            = require('twig')
const mime            = require('mime')


const getPath = url => {
  let parsed = require('url').parse(url);
  let result = decodeURIComponent(parsed.pathname);

  // Local files in windows start with slash if no host is given
  // file:///c:/something.pug
  if(process.platform === 'win32' && !parsed.host.trim()) {
    result = result.substr(1);
  }

  return result;
}

app.on('ready', () => {
  protocol.interceptBufferProtocol('file', (request, callback) => {
    let twigOptions = {}
    if (typeof module.exports.view !== 'undefined') {
      twigOptions = module.exports.view
    }
    let file = getPath(request.url);

    // See if file actually exists
    try {
      let content = fs.readFileSync(file);

      let ext = path.extname(file);
      if (ext === '.twig') {
        twig.renderFile(file, twigOptions, (err, html) => {
          return callback({data: new Buffer(html), mimeType:'text/html'});
        })
      } else {
        return callback({data: content, mimeType: mime.lookup(ext)});
      }
    } catch (e) {
      // All error wrt. Twig are rendered in browser
      if (e.code.startsWith('TWIG:')) {
        return callback({data: new Buffer(`<pre style="tab-size:1">${e}</pre>`), mimeType:'text/html'});
      }

      // See here for error numbers:
      // https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h
      if (e.code === 'ENOENT') {
       // NET_ERROR(FILE_NOT_FOUND, -6)
       return callback(-6);
      }

      // All other possible errors return a generic failure
      // NET_ERROR(FAILED, -2)
      return callback(-2);
    }
  }, (error) => {
    if (error) console.error('Failed to intercept protocol')
  })
})

