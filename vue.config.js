const path = require('path');

// vue.config.js
module.exports = {
  filenameHashing: true,
  lintOnSave: true,
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.APP_ENV !== 'production',
  },
};
