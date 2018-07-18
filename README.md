# Simplex

HTML5 Boilerplate and Bulma CSS framework for a starting template.


# [HTML5 Boilerplate](https://html5boilerplate.com/)

[![Build Status](https://travis-ci.org/h5bp/html5-boilerplate.svg)](https://travis-ci.org/h5bp/html5-boilerplate)
[![devDependency Status](https://david-dm.org/h5bp/html5-boilerplate/dev-status.svg)](https://david-dm.org/h5bp/html5-boilerplate#info=devDependencies)

HTML5 Boilerplate is a professional front-end template for building
fast, robust, and adaptable web apps or sites.

This project is the product of years of iterative development and
community knowledge. It does not impose a specific development
philosophy or framework, so you're free to architect your code in the
way that you want.

* Homepage: [https://html5boilerplate.com/](https://html5boilerplate.com/)
* Source: [https://github.com/h5bp/html5-boilerplate](https://github.com/h5bp/html5-boilerplate)
* Twitter: [@h5bp](https://twitter.com/h5bp)


## Quick start

Choose one of the following options:

1. Download the latest stable release from
   [html5boilerplate.com](https://html5boilerplate.com/).
2. Clone the git repo — `git clone
   https://github.com/h5bp/html5-boilerplate.git` - and checkout the
   [tagged release](https://github.com/h5bp/html5-boilerplate/releases)
   you'd like to use.
3. Run `npm install html5-boilerplate` and pull in what you need from the resulting `node_modules/html5-boilerplate/dist`


## Features

* HTML5 ready. Use the new elements with confidence.
* Designed with progressive enhancement in mind.
* Includes:
  * [`Normalize.css`](https://necolas.github.com/normalize.css/)
    for CSS normalizations and common bug fixes
  * [`jQuery`](https://jquery.com/) via CDN with [SRI Hash](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) and a local fallback
  * A custom build of [`Modernizr`](https://modernizr.com/) for feature
    detection
  * [`Apache Server Configs`](https://github.com/h5bp/server-configs-apache)
    that, among other, improve the web site's performance and security
* Placeholder CSS Media Queries.
* Useful CSS helper classes.
* Default print styles, performance optimized.
* An optimized version of the Google Universal Analytics snippet.
* Protection against any stray `console` statements causing JavaScript
  errors in older browsers.
* "Delete-key friendly." Easy to strip out parts you don't need.
* Extensive inline and accompanying documentation.


## Browser support

* Chrome *(latest 2)*
* Edge *(latest 2)*
* Firefox *(latest 2)*
* Internet Explorer 9+
* Opera *(latest 2)*
* Safari *(latest 2)*

*This doesn't mean that HTML5 Boilerplate cannot be used in older browsers,
just that we'll ensure compatibility with the ones mentioned above.*

If you need legacy browser support you
can use [HTML5 Boilerplate v4](https://github.com/h5bp/html5-boilerplate/tree/v4) (IE 6+, Firefox 3.6+, Safari 4+),
or [HTML5 Boilerplate v5](https://github.com/h5bp/html5-boilerplate/tree/v5.0.0) (IE8+). They are no longer actively developed.


## Documentation

Take a look at the [documentation table of contents](doc/TOC.md).
This documentation is bundled with the project which makes it
available for offline reading and provides a useful starting point for
any documentation you want to write about your project.


## Contributing

Hundreds of developers have helped to make the HTML5 Boilerplate. Anyone is welcome to [contribute](https://github.com/h5bp/html5-boilerplate/blob/master/.github/CONTRIBUTING.md),
however, if you decide to get involved, please take a moment to review
the [guidelines](https://github.com/h5bp/html5-boilerplate/blob/master/.github/CONTRIBUTING.md):

* [Bug reports](https://github.com/h5bp/html5-boilerplate/blob/master/.github/CONTRIBUTING.md#bugs)
* [Feature requests](https://github.com/h5bp/html5-boilerplate/blob/master/.github/CONTRIBUTING.md#features)
* [Pull requests](https://github.com/h5bp/html5-boilerplate/blob/master/.github/CONTRIBUTING.md#pull-requests)


## License

The code is available under the [MIT license](LICENSE.txt).


# [Bulma](https://bulma.io)

Bulma is a **modern CSS framework** based on [Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes).

[![npm](https://img.shields.io/npm/v/bulma.svg)](https://www.npmjs.com/package/bulma)
[![npm](https://img.shields.io/npm/dm/bulma.svg)](https://www.npmjs.com/package/bulma)
[![Join the chat at https://gitter.im/jgthms/bulma](https://badges.gitter.im/jgthms/bulma.svg)](https://gitter.im/jgthms/bulma)
[![Build Status](https://travis-ci.org/jgthms/bulma.svg?branch=master)](https://travis-ci.org/jgthms/bulma)

<a href="https://bulma.io"><img src="https://raw.githubusercontent.com/jgthms/bulma/master/docs/images/bulma-banner.png" alt="Bulma: a Flexbox CSS framework" style="max-width:100%;" width="600" height="315"></a>

## Quick install

Bulma is constantly in development! Try it out now:

### NPM

```sh
npm install bulma
```

**or**

### Yarn

```sh
yarn add bulma
```

### Bower

```sh
bower install bulma
```

### Import
After installation, you can import the CSS file into your project using this snippet:

```sh
import 'bulma/css/bulma.css'
```

### CDN

[https://cdnjs.com/libraries/bulma](https://cdnjs.com/libraries/bulma)

Feel free to raise an issue or submit a pull request.

## CSS only

Bulma is a **CSS** framework. As such, the sole output is a single CSS file: [bulma.css](https://github.com/jgthms/bulma/blob/master/css/bulma.css)

You can either use that file, "out of the box", or download the Sass source files to customize the [variables](https://bulma.io/documentation/overview/variables/).

There is **no** JavaScript included. People generally want to use their own JS implementation (and usually already have one). Bulma can be considered "environment agnostic": it's just the style layer on top of the logic.

## Browser Support

Bulma uses [autoprefixer](https://github.com/postcss/autoprefixer) to make (most) Flexbox features compatible with earlier browser versions. According to [Can I use](https://caniuse.com/#feat=flexbox), Bulma is compatible with **recent** versions of:

* Chrome
* Edge
* Firefox
* Opera
* Safari

Internet Explorer (10+) is only partially supported.

## Documentation

The documentation resides in the [docs](https://github.com/jgthms/bulma/blob/master/docs) directory, and is built with the Ruby-based [Jekyll](https://jekyllrb.com/) tool.

Browse the [online documentation here.](https://bulma.io/documentation/overview/start/)

## Related projects

| Project                                                                            | Description                                                        |
|------------------------------------------------------------------------------------|--------------------------------------------------------------------|
| [Bulma with Attribute Modules](https://github.com/j5bot/bulma-attribute-selectors) | Adds support for attribute-based selectors.                        |
| [Bulma with Rails](https://github.com/joshuajansen/bulma-rails)                    | Integrates Bulma with the rails asset pipeline                     |
| [Vue Admin](https://github.com/vue-bulma/vue-admin)                                | Vue Admin framework powered by Bulma                               |
| [Bulmaswatch](https://github.com/jenil/bulmaswatch)                                | Free themes for Bulma                                              |
| [Goldfish](https://github.com/Caiyeon/goldfish)                                    | Vault UI with Bulma, Golang, and Vue Admin                         |
| [ember-bulma](https://github.com/open-tux/ember-bulma)                             | Ember addon providing a collection of UI components for Bulma      |
| [Bloomer](https://bloomer.js.org)                                                  | A set of React components for Bulma                                |
| [Re-bulma](https://github.com/bokuweb/re-bulma)                                    | Bulma components build with React                                  |
| [React-bulma](https://github.com/kulakowka/react-bulma)                            | React.js components for Bulma                                      |
| [Buefy](https://buefy.github.io)                                                   | Lightweight UI components for Vue.js based on Bulma                |
| [vue-bulma-components](https://github.com/vouill/vue-bulma-components)             | Bulma components for Vue.js with straightforward syntax            |
| [BulmaJS](https://github.com/VizuaaLOG/BulmaJS)                                    | Javascript integration for Bulma. Written in ES6 with a data-* API |
| [Bulma.styl](https://github.com/log1x/bulma.styl)                                  | 1:1 Stylus translation of Bulma                                    |
| [elm-bulma](https://github.com/surprisetalk/elm-bulma)                             | Bulma + Elm                                                        |
| [elm-bulma-classes](https://github.com/ahstro/elm-bulma-classes)                   | Bulma classes prepared for usage with Elm                          |
| [Bulma Customizer](https://bulma-customizer.bstash.io/)                            | Bulma Customizer &#8211; Create your own **bespoke** Bulma build   |
| [Fulma](https://mangelmaxime.github.io/Fulma/)                                     | Wrapper around Bulma for [fable-react](https://github.com/fable-compiler/fable-react)   |
| [Laravel Enso](https://github.com/laravel-enso/enso)                               | SPA Admin Panel built with Bulma, VueJS and Laravel 			      |
| [Django Bulma](https://github.com/timonweb/django-bulma)                           | Integrates Bulma with Django 			    |
| [Bulma Templates](https://github.com/dansup/bulma-templates)                       | Free Templates for Bulma                       |
| [React Bulma Components](https://github.com/couds/react-bulma-components)          | Another React wrap on React for Bulma.io                           |
| [purescript-bulma](https://github.com/sectore/purescript-bulma)                    | PureScript bindings for Bulma                                      |
| [Vue Datatable](https://github.com/laravel-enso/vuedatatable)                      | Bulma themed datatable based on Vue, Laravel & JSON templates      |
| [bulma-fluent](https://mubaidr.github.io/bulma-fluent/)                            | Fluent Design Theme for Bulma inspired by Microsoft’s Fluent Design System      |

## Copyright and license

Code copyright 2018 Jeremy Thomas. Code released under [the MIT license](https://github.com/jgthms/bulma/blob/master/LICENSE).
