// Polyfills

// Add the following dependency inside package.json -> "ie-shim": "^0.1.0",
// import 'ie-shim'; // Internet Explorer 9 support

import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js/dist/zone');

if ('production' === process.env.ENV) {
  // Production

} else {
  // Development

  Error.stackTraceLimit = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}
