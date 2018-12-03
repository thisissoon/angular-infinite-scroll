# Angular Infinite Scroll

[![Build Status][circleci-badge]][circleci-badge-url]
[![Coverage Status][coveralls-badge]][coveralls-badge-url]
[![Commitizen friendly][commitizen-badge]][commitizen]
[![code style: prettier][prettier-badge]][prettier-badge-url]

A simple, lightweight infinite scrolling directive for [Angular][angular] which emits an event when an element has been scrolled to the bottom.

This is a simple library for [Angular][angular], implemented in the [Angular Package Format v5.0](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/edit#heading=h.k0mh3o8u5hx).

## Install

`npm i @thisissoon/angular-infinite-scroll --save`

`app.module.ts`

```ts
import { InfiniteScrollModule } from '@thisissoon/angular-infinite-scroll';

@NgModule({
  imports: [InfiniteScrollModule],
})
export class AppModule {}
```

## Example

A working example can be found inside [/src](https://github.com/thisissoon/angular-infinite-scroll/tree/master/src) folder

### `app.component.html`

```html
<div
  class="foo"
  snInfiniteScroll
  (scrollEnd)="onScrollEnd()"
  [offset]="100"
  [disabled]="disabled"
></div>
```

### `app.component.ts`

```ts
export class AppComponent {
  onScrollEnd() {
    // Do something here
  }
}
```

## Options

- `offset` (number): distance in px from bottom of element to trigger `scrollEnd` event (default: 0)
- `disabled` (boolean): If true directive will not trigger `scrollEnd` event

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Making Commits

This repo uses [Commitizen CLI](http://commitizen.github.io/cz-cli/) and [Conventional Changelog](https://github.com/conventional-changelog/conventional-changelog) to create commits and generate changelogs. Instead of running `git commit` run `git cz` and follow the prompts. Changelogs will then be generated when creating new releases by running `npm run release`.

## Making Releases

Run `npm run release` to create a new release. This will use [Standard Version](https://github.com/conventional-changelog/standard-version) to create a new release. [Standard Version](https://github.com/conventional-changelog/standard-version) will generate / update the changelog based on commits generated using [Commitizen CLI](http://commitizen.github.io/cz-cli/), update the version number following semantic versioning rules and then commit and tag the commit for the release. Simply run `git push --follow-tags origin master`.

[circleci-badge]: https://circleci.com/gh/thisissoon/angular-infinite-scroll.svg?style=shield
[circleci-badge-url]: https://circleci.com/gh/thisissoon/angular-infinite-scroll
[coveralls-badge]: https://coveralls.io/repos/github/thisissoon/angular-infinite-scroll/badge.svg?branch=master
[coveralls-badge-url]: https://coveralls.io/github/thisissoon/angular-infinite-scroll?branch=master
[angular]: https://angular.io/
[angular-inviewport]: https://github.com/thisissoon/angular-inviewport
[prettier-badge]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=shield
[prettier-badge-url]: https://github.com/prettier/prettier
[commitizen]: http://commitizen.github.io/cz-cli/
[commitizen-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
