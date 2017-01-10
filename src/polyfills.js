// Polyfills
"use strict";
// Add the following dependency inside package.json -> "ie-shim": "^0.1.0",
// import 'ie-shim'; // Internet Explorer 9 support
// import 'core-js';
require("core-js/es6");
require("core-js/es7/reflect");
require('zone.js/dist/zone');
if ('production' === process.env.ENV) {
}
else {
    // Development
    Error.stackTraceLimit = Infinity;
    require('zone.js/dist/long-stack-trace-zone');
}
//# sourceMappingURL=polyfills.js.map