module.exports = {
  webpackDevMiddleware: config => {
    config.watchOoptions.poll = 300;
    return config;
  }
};