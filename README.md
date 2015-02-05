Dollar Credit Theme
==============

A generic dollar credit theme for Referral Saasquatch


Setup
-----

To get started, clone the project, install the npm dependencies and start the server. You will need Node.js.

The serve task will compile less and handlebars on changes and reload the page if you install the plugin for  [LiveReload](http://livereload.com/).

```
git clone git@github.com:saasquatch/discount-theme.git
cd discount-theme
npm install -g gulp
npm install
gulp serve
```

Mock Customer Data
------------------

Example mock customer data can be found in `customer.json`.  In the dev environment this data is added to the handlebars context with the `gulp-compile-handlebars` plugin.
