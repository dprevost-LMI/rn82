const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withRozenite } = require('@rozenite/metro');
const {
  withRozeniteReduxDevTools,
} = require('@rozenite/redux-devtools-plugin/metro');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {};

module.exports = withRozenite(mergeConfig(getDefaultConfig(__dirname), config), {
  enhanceMetroConfig: (metroConfig) => withRozeniteReduxDevTools(metroConfig),
  enabled: true,
});
