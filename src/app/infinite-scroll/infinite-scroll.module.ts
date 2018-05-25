import { NgModule } from '@angular/core';

import { InfiniteScrollDirective } from './infinite-scroll.directive';

/**
 * A simple infinite scrolling module for Angular which
 * emits an event when an element has been scrolled to the bottom.
 */
@NgModule({
  declarations: [InfiniteScrollDirective],
  exports: [InfiniteScrollDirective]
})
export class InfiniteScrollModule {}
