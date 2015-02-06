Dollar Credit Theme
==============

A generic dollar credit theme for Referral Saasquatch


Setup
-----

To get started, clone the project, install the npm dependencies and start the server. You will need Node.js.

The serve task will compile less and handlebars on changes and reload the page if you install the plugin for  [LiveReload](http://livereload.com/).

```
git clone git@github.com:saasquatch/dollar-credit-theme.git
cd dollar-credit-theme
npm install -g gulp
npm install
gulp serve
```

Mock Customer Data
------------------

Example mock customer data can be found in `customer.json`.  In the dev environment this data is added to the handlebars context with the `gulp-compile-handlebars` plugin.

License
-------

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this work except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
