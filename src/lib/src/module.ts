import { NgModule } from '@angular/core';

import { InfiniteScrollDirective } from './infinite-scroll/infinite-scroll.directive';

/**
 * A simple infinite scrolling module for Angular (2/4+) that detects
 * when the user has scrolled to the bottom of an element and emits
 * an event
 *
 * @export
 * @class InfiniteScrollModule
 */
@NgModule({
  declarations: [
    InfiniteScrollDirective
  ],
  exports: [
    InfiniteScrollDirective
  ]
})
export class InfiniteScrollModule { }
