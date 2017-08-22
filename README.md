# Angular Infinite Scroll
[![Build Status][travis-badge]][travis-badge-url]
[![Coverage Status][coveralls-badge]][coveralls-badge-url]

Simple, lightweight infinite scrolling directive for [Angular (2/4+)][angular] with no other dependencies which emits and event when element has scrolled to the end.

This is a simple library for [Angular][angular], implemented in the [Angular Package Format v4.0](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/edit#heading=h.k0mh3o8u5hx).


## Install

`npm i @thisissoon/angular-infinite-scroll --save`

`app.module.ts`
```ts
import { InfiniteScrollModule } from '@thisissoon/angular-infinite-scroll';

@NgModule({
  imports: [
    InfiniteScrollModule
  ]
})
export class AppModule { }
```


## Example

a working example can be found inside [/src/demo](https://github.com/thisissoon/angular-infinite-scroll/tree/master/src/demo) folder

### `app.component.html`

```html
<div
  class="foo"
  snInfiniteScroll
  (onScrollEnd)="onScrollEnd()"
  [offset]="100"
  [disabled]="disabled">
</div>
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

* `offset` (number): distance in px from bottom of element to trigger `onSctollEnd` event (default: 0)
* `disabled` (boolean): If true directive will not trigger event

[travis-badge]: https://travis-ci.org/thisissoon/angular-infinite-scroll.svg?branch=master
[travis-badge-url]: https://travis-ci.org/thisissoon/angular-infinite-scroll
[coveralls-badge]: https://coveralls.io/repos/github/thisissoon/angular-infinite-scroll/badge.svg?branch=master
[coveralls-badge-url]: https://coveralls.io/github/thisissoon/angular-infinite-scroll?branch=master
[angular]: https://angular.io/
[angular-inviewport]: https://github.com/thisissoon/angular-inviewport
