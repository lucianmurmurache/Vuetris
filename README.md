## Vuetris

### Tetris built with Vue.js

![Screenshot-1](https://github.com/lucianmurmurache/vuetris/blob/master/src/img/vuetris-1.png)
![Screenshot-2](https://github.com/lucianmurmurache/vuetris/blob/master/src/img/vuetris-2.png)
![Screenshot-3](https://github.com/lucianmurmurache/vuetris/blob/master/src/img/vuetris-3.png)

### Installation instructions

- If you'd like to run this on your machine, download/clone the repository, navigate to the root directory and run `npm i`
- Once the installation is complete, still in the root directory, run `npm run start`
- Open your browser and navigate to [http://localhost:8080](http://localhost:8080)

### Hosting on [heroku](https://cli.vuejs.org/guide/deployment.html#heroku)

- Create a new branch `git checkout -B <branch-name>` (Optional)
- Install Heroku CLI (unless you already have it installed)
- Navigate to the root directory and run `git init`
- Build for production: `npm run build:prod`
- Login into your heroku account: `heroku login`
- Create a heroku app: `heroku create` or `heroku create <app-name>`
- Run the following 2 commands: `heroku buildpacks:add heroku/nodejs` `heroku buildpacks:add https://github.com/heroku/heroku-buildpack-static`
- Push to Heroku: `git push heroku <branch-name>:master` or `git push heroku master` if you skipped the 1st step
- More info: [Getting started with SPAs on Heroku](https://gist.github.com/hone/24b06869b4c1eca701f9)

<details>
  <summary>Dependencies</summary>

- babel:

  - babel-core
  - babel-loader
  - babel-polyfill
  - babel-preset-es2015
  - babel-plugin-istanbul

- css-loader
- file-loader
- jquery
- lodash
- node-sass
- push-dir
- sass-loader
- style-loader
- uglify-js
- uglifyjs-webpack-plugin
- vue:
  - vue
  - vue-loader
  - vuejs-loader
  - vue-template-compiler
- webpack:
  - webpack
  - webpack-dev-server
- eslint:
  - eslint
  - eslint-plugin-node
  - eslint-plugin-html
  - eslint-plugin-import
  - eslint-plugin-jasmine
  - eslint-plugin-promise
  - eslint-config-standard
  - eslint-plugin-standard
    </details>

##### [Kanban board](https://trello.com/b/cXdkVkEp/vuetris)
