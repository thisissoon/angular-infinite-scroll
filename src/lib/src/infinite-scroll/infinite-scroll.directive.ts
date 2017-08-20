import { Directive, AfterViewInit, OnDestroy, HostListener, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { Scroll } from '../scroll.model';
import * as events from '../events';

@Directive({
  selector: '[snInfiniteScroll]'
})
export class InfiniteScrollDirective implements AfterViewInit {
  /**
   * Event that will be triggered when user has scrolled to
   * bottom of the element
   *
   * @type {EventEmitter<void>}
   * @memberof InfiniteScrollDirective
   */
  @Output()
  public onScrollEnd: EventEmitter<void> = new EventEmitter<void>();
  /**
   * An offset from the bottom of the element to trigger
   * `onScrollEnd` event
   *
   * @type {number}
   * @memberof InfiniteScrollDirective
   */
  @Input()
  public offset = 0;
  /**
   * Specify debounce duration in ms
   *
   * @type {number}
   * @memberof InfiniteScrollDirective
   */
  @Input()
  public debounce = 0;
  /**
   * If true then `onScrollEnd` event should NOT be emitted
   *
   * @type {boolean}
   * @memberof InfiniteScrollDirective
   */
  @Input()
  public disabled = false;
  /**
   * Emits a new value on element scroll event
   *
   * @type {Subject<Scroll>}
   * @memberof InfiniteScrollDirective
   */
  public scroll$: Subject<Scroll> = new Subject<Scroll>();
  /**
   * Completes on component destroy lifecycle event
   * used to unsubscribe from infinite observables
   *
   * @type {Subject<void>}
   * @memberof InfiniteScrollDirective
   */
  private ngUnsubscribe$ = new Subject<void>();
  /**
   * Subscribe to `scroll$` observable and emit `onScrollEnd` event
   * when element scroll position is at the end of the element
   *
   * @memberof InfiniteScrollDirective
   */
  public ngAfterViewInit(): void {
    this.scroll$
      .takeUntil(this.ngUnsubscribe$)
      .debounceTime(100)
      .map((scroll) => {
        const y = scroll.y + this.offset;
        return {y, height: scroll.height};
      })
      .filter(() => !this.disabled)
      .filter((scroll) => scroll.y >= scroll.height)
      .subscribe(() => this.onScrollEnd.emit());
  }
  /**
   * On element scroll event emit next `scroll$` observable value
   *
   * @param {number} scrollY
   * @param {number} scrollheight
   * @param {number} offsetHeight
   * @memberof InfiniteScrollDirective
   */
  @HostListener(events.eventScroll, events.eventPathScroll)
  public onScroll(scrollY: number, scrollheight: number, offsetHeight: number): void {
    const height = scrollheight;
    const y = scrollY + offsetHeight;
    this.scroll$.next({y, height});
  }
  /**
   * trigger `ngUnsubscribe` complete on
   * component destroy lifecycle hook
   *
   * @memberof InfiniteScrollDirective
   */
  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
