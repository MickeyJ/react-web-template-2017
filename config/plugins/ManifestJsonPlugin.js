const hash = require('object-hash');

function ManifestJsonPlugin(manifest) {
  this.manifest = manifest;
  this.manifestJSON = JSON.stringify(manifest, null, 2);
  this.fileHash = hash.MD5(manifest);
}

ManifestJsonPlugin.prototype.apply = function(compiler) {
  const filename = 'manifest.' + this.fileHash + '.json';
  const fileContent = this.manifestJSON.toString();
  const themeColor = this.manifest.theme_color || '#FFF';

  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
      htmlPluginData.html = htmlPluginData.html.replace(
        /(<\/head>)/i, `
          <link rel="manifest" href="/${filename}">
          <meta name="mobile-web-app-capable" content="yes">
          <meta name="apple-mobile-web-app-capable" content="yes">
          <meta name="theme-color" content="${themeColor}">
        </head>`
      );
      callback(null, htmlPluginData);
    });
  });

  compiler.plugin('emit', function(compilation, callback) {
    compilation.assets[filename] = {
      source: function() {
        return fileContent;
      },
      size: function() {
        return fileContent.length;
      }
    };
    callback();
  });

};

module.exports = ManifestJsonPlugin;