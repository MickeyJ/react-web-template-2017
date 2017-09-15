const config = require('./');

module.exports = {
  name: config.APP_NAME,
  short_name: 'React Web',
  description: 'React web app boilerplate with redux',
  orientation: 'landscape',
  display: 'standalone',
  start_url: '/#/?utm_source=homescreen',
  background_color: '#ffffff',
  theme_color: '#ffffff',
  icons: [
    {
      src: 'images/launch-icon.png',
      size: '144x144',
      type: 'image/png',
    },
    {
      src: 'images/apple-touch-icon.png',
      size: '144x144',
      type: 'image/png'
    },
    {
      src: 'favicon.ico',
      size: '144x144',
      type: 'image/png',
    },
  ],
};
