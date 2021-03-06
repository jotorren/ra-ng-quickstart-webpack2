[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/jotorren/ra-ng-quickstart-webpack2)
[![Angular Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide)
[![Hex.pm](https://img.shields.io/hexpm/l/plug.svg)](https://github.com/jotorren/ra-ng-quickstart-webpack2/blob/master/LICENSE)

# ra-ng Quickstart with Webpack2

This seed repo serves as an Angular 2 starter for anyone looking to get up and running with Angular 2 and TypeScript.
* Best practices in file and application organization for [Angular 2](https://angular.io/docs/ts/latest/guide/style-guide.html).
* Testing Angular 2 code with [Jasmine](https://jasmine.github.io/) and [Karma](https://karma-runner.github.io/1.0/index.html).
* **Coverage** with [Istanbul](https://github.com/gotwarlost/istanbul/) and [Karma](https://karma-runner.github.io/1.0/index.html).
* End-to-end Angular 2 code using [Protractor](http://www.protractortest.org/).
* Type manager with **@types**.
* Rich UI design with [primeNG](http://www.primefaces.org/primeng/).
* Recommended design patterns and advanced Angular 2 components with [raNG](https://github.com/jotorren/ra-ng).
* Example of **lazy loaded module**. Keep in mind that, once the bundling process is complete, the resulting bundle contains any 'lazy' module.
This means they are loaded when the browser reads the file and therefore they can not longer be considered 'lazy'.
* `TypeScript` compiler target set to `ES5`. Read [John Papa's article](https://johnpapa.net/es5-es2015-typescript/) for further information.
* **Ahead of Time (AoT)** compilation for rapid page loads of your production builds. This is achieved by means 
of [@ngtools/webpack](https://www.npmjs.com/package/@ngtools/webpack).
* **Tree shaking** to automatically remove unused code from your production bundle. Here, it's important to use the target 
`ES5` together with the module-format `ES2015` because [Webpack2](https://github.com/webpack/webpack/) 
**can only Tree Shake ES2015 modules** which have `import` and `export` statements. It's not important that the code itself 
be written with `ES2015` syntax such as `class` and `const`. What matters is that the code uses ES `import` and `export` 
statements rather than `require` statements.
* **Cache busting system** through a content hash that suggests to the browser that, when you made a change in your static 
asset, that new file is actually different and should not be retrieved from the cache, but freshly downloaded.
* Build-time **gzip** bundles using [compression-webpack-plugin](https://github.com/webpack-contrib/compression-webpack-plugin).
* Inspection of the bundles with [webpack-bundle-analyzer](https://github.com/th0r/webpack-bundle-analyzer). 
It analyzes the source map generated with the bundle and draws a map of all dependencies, showing exactly which application 
and Angular modules and classes are included in the bundle.

## Limitations

To bundle **angular lazy routes** this starter uses the version **1.0.2** of [ng-router-loader](https://github.com/shlomiassaf/ng-router-loader).
There's a new version of that loader (**2.1.0** at the moment of writing this document), which requires the route to be defined using the Angular API:

```ts
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome.component';
import { FeatureAModule } from 'app/featureA/featureA.module';

export function featureAFactory() {
    return FeatureAModule;
}

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: 'welcome', pathMatch: 'full' },
            { path: 'welcome', component: WelcomeComponent },

            { path: 'lazy-featureA', loadChildren: featureAFactory }
        ])
    ],
    exports: [
        RouterModule
    ],
    providers: [
    ]
})
export class AppRoutingModule {
    static RoutesMap = {
        welcome: 'welcome',
        featureA: '/lazy-featureA'
    };
}
```

Unfortunately this way of defining lazy routes is not supported by the current version of [@ngtools/webpack](https://www.npmjs.com/package/@ngtools/webpack), 
driving us to define them in the following manner:

```ts
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: 'welcome', pathMatch: 'full' },
            { path: 'welcome', component: WelcomeComponent },

            { path: 'lazy-featureA', loadChildren: './featureA/featureA.module#FeatureAModule' }
        ])
    ],
    exports: [
        RouterModule
    ],
    providers: [
    ]
})
export class AppRoutingModule {
    static RoutesMap = {
        welcome: 'welcome',
        featureA: '/lazy-featureA'
    };
}
```

And also forcing us to keep the 'old' version **1.0.2** of [ng-router-loader](https://github.com/shlomiassaf/ng-router-loader)

### Quick start
```bash
# clone this repo
# --depth 1 removes all but one .git commit history

git clone --depth 1 https://github.com/jotorren/ra-ng-quickstart-webpack2.git my-project

# change directory to your project
cd my-project

# install the dependency with npm
npm install

# install primeNG typescript definitions
typings install

# start the server
npm start
```

Go to [http://0.0.0.0:3000](http://0.0.0.0:3000) or [http://localhost:3000](http://localhost:3000) in your browser

# Table of Contents
* [File Structure](#file-structure)
* [Bootstrap](#bootstrap)
* [Building](#building)
* [Contributors](#contributors)
* [Support, Questions, or Feedback](#support-questions-or-feedback)
* [License](#license)

# File Structure
This starter uses the component approach. This is the new standard for developing Angular apps and a great way to ensure 
maintainable code by encapsulation of our behavior logic. A component is basically a self contained app usually in a single 
file or a folder with each concern as a file: style, template, specs, e2e, and component class. Here's how it looks:
```
my-project/
 ├──config/
 │   ├──helpers.js
 │   ├──karma.conf.js
 │   ├──karma-test-shim.js
 │   ├──webpack.common.js
 │   ├──webpack.dev.js
 │   ├──webpack.prod.js
 │   ├──webpack.prod-aot.js
 │   └──webpack.test.js
 ├──dist/
 ├──doc/
 ├──e2e/
 ├──node_modules/                       
 ├──typings/                       
 ├──src/
 │   ├──api/
 │   ├──environments/
 │   │   └──localhost.json
 │   ├──app/
 │   │   ├──core/
 │   │   │   ├──core.module.ts
 │   │   │   └──index.ts
 │   │   │ 
 │   │   ├──layout/
 │   │   │   ├──aside.component.  [css | html | ts]
 │   │   │   ├──footer.component. [css | html | ts]
 │   │   │   ├──header.component. [css | html | ts]
 │   │   │   ├──sidebar.component.[css | html | ts]
 │   │   │   ├──topnav.component. [css | html | ts]
 │   │   │   ├──index.ts
 │   │   │   └──layout.module.ts
 │   │   │ 
 │   │   ├──featureA/                                 * example of lazy loaded module
 │   │   │   ├──featureA.component.[css | html | ts]
 │   │   │   ├──featureA.module.ts
 │   │   │   ├──featureA.routing.module.ts
 │   │   │   └──index.ts
 │   │   │
 │   │   ├──shared/
 │   │   │   ├──config/
 │   │   │   │   ├──cache.json
 │   │   │   │   ├──log.json
 │   │   │   │   └──config.ts
 │   │   │   │ 
 │   │   │   ├──i18n/
 │   │   │   │   ├──lang_en.json
 │   │   │   │   └──lang_es.json
 │   │   │   │
 │   │   │   ├──constants.ts
 │   │   │   ├──index.ts
 │   │   │   └──shared.module.ts
 │   │   │
 │   │   ├──app.component.css
 │   │   ├──app.component.html
 │   │   ├──app.component.ts
 │   │   ├──app.module.ts
 │   │   ├──app.routing.module.ts
 │   │   ├──main-aot.ts
 │   │   ├──main.ts
 │   │   ├──welcome.component.spec.ts
 │   │   └──welcome.component.ts                      * dummy component
 │   │
 │   ├──assets/
 │   │   ├──css/
 │   │   ├──font-awesome-4.6.3/
 │   │   ├──img/
 │   │   └──js/ 
 │   │
 |   ├──favicon.ico
 |   ├──index.html
 |   ├──polyfills.ts
 |   └──vendor.ts
 │   
 ├──karma.conf.js
 ├──LICENSE
 ├──package.json
 ├──protractor.config.js
 ├──README.md
 ├──tsconfig.json
 ├──tsconfig.prod.json
 ├──tsconfig.prod-aotjson
 ├──tslint.json
 ├──typings.json
 └──webpack.config.json
 ```

# Bootstrap
Before starting the Angular 2 application, the configuration service loads a set of properties that depend on the 
**runtime** environment, which is identified using the URL's **hostname**. Doing so, we can use the same artifact on different
environments without having to rebuild it.

Keep in mind that properties read from the environment always overwrite any potential value defined in the static **Config** 
object literal.

```ts
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ConfigurationLoaderService, LoggerFactory, Logger } from 'ra-ng';

import { Config } from './shared';
import { AppModule } from './app.module';

let selector = location.hostname;
console.log(JSON.stringify({
  logger: 'console',
  message: 'Using configuration selector: [' + selector + ']'
}));

console.log(JSON.stringify({
  logger: 'console',
  message: 'Starting environment: [' + process.env.ENV + ']'
}));
if (process.env.ENV === 'production') {
  enableProdMode();
}

ConfigurationLoaderService.bootstrap(selector, Config).subscribe(
  (loaded) => {
    LoggerFactory.configure(Config);
    const LOG: Logger = LoggerFactory.getLogger('root');

    LOG.info('Imported JSON configuration for modules: ' + loaded);

    // Compile and launch the module
    platformBrowserDynamic().bootstrapModule(AppModule);
  },
  (err) => {
    console.error('Error loading configuration before launching Angular 2 bootstrap: ', err);
  });
```

For example, if we navigate to `http://localhost:3000`, the configuration service will try to load the properties set
in `environments/localhost.json`; on the other hand if we access `http://myserver:80` (supposing the application is published on
that web server), the configuration service will read the `environments/myserver.json` file.

# Building

You can generate the production bundles by means of:

```
npm run build:prod              * JiT compilation
npm run build:prod:aot          * AoT compilation
```

Once the build process is complete, you will get:
```
dist/
 └──public/
     ├──environments/           * runtime configuration json files
     ├──app/                    * i18n and static configuration json files
     ├──assets/                 * static resources (images, fonts, css, js...)
     │   ├──css/                
     │   ├──font-awesome-4.6.3/                
     │   ├──img/                
     │   └──js/                 
     │
     ├──polyfills.[hash].js     * the standard polyfills we require to run Angular applications in most modern browsers
     ├──polyfills.[hash].js.gz  * compressed version of polyfills.[hash].js
     ├──app.[hash].js           * our application code and its dependencies bundled in one minified file
     ├──app.[hash].js.gz        * compressed version of app.[hash].js
     ├──favicon.ico
     ├──index.html              * the application entry point
     └──size.html               * bundle analyzer reports for polyfills.[hash].js and app.[hash].js

```

## Setting bundle's target environment

Note `main.ts` (and also `main-aot.ts`) depends on `process.env` (`nodejs` property containing the user environment). 
That dependency is resolved by `webpack` during the assembly process. 

# Contributors

| Name               | GitHub                                  | Twitter                                   |
| ------------------ | --------------------------------------- | ----------------------------------------- |
| **Jordi Torrente** | [jotorren](https://github.com/jotorren) | [@esrafiki](https://twitter.com/esrafiki) |

I'll accept pretty much everything so feel free to open a Pull-Request

# Support, Questions, or Feedback

> Contact us anytime for anything about this repo 

[![Join the chat at https://gitter.im/ra-ng/general](https://badges.gitter.im/ra-ng/general.svg)](https://gitter.im/ra-ng/general?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# License

Code licensed under an [Apache License](https://github.com/jotorren/ra-ng-quickstart-webpack2/blob/master/LICENSE). Documentation licensed under [CC BY 4.0](http://creativecommons.org/licenses/by/4.0/).

**[Back to top](#table-of-contents)**