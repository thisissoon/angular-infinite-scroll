import { ElementRef } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';

import { InfiniteScrollDirective } from './infinite-scroll.directive';

describe('InfiniteScrollDirective', () => {
  let directive: InfiniteScrollDirective;

  beforeEach(() => {
    directive = new InfiniteScrollDirective();
    directive.ngAfterViewInit();
  });

  it('should subscribe to scroll$ directive', () => {
    const spy = spyOn(directive.scroll$, 'subscribe');
    directive.ngAfterViewInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit next value for scroll$ observable', () => {
    const spy = spyOn(directive.scroll$, 'next');
    directive.onScroll(100, 300, 100);
    expect(spy).toHaveBeenCalledWith({ y: 200, height: 300 });
  });

  it(
    'should emit event scrollEnd event',
    fakeAsync(() => {
      const spy = spyOn(directive.scrollEnd, 'emit');

      directive.onScroll(199, 300, 100);
      tick(100);
      expect(spy).not.toHaveBeenCalled();

      directive.onScroll(200, 300, 100);
      tick(100);
      expect(spy).toHaveBeenCalled();
    })
  );

  it(
    'should emit event scrollEnd event with offset',
    fakeAsync(() => {
      const spy = spyOn(directive.scrollEnd, 'emit');
      directive.offset = 50;

      directive.onScroll(149, 300, 100);
      tick(100);
      expect(spy).not.toHaveBeenCalled();

      directive.onScroll(150, 300, 100);
      tick(100);
      expect(spy).toHaveBeenCalled();
    })
  );

  it('should unsubscribe from observable on destroy lifecycle hook', () => {
    const spy = spyOn(directive.scrollEnd, 'emit');
    directive.ngOnDestroy();
    directive.onScroll(200, 300, 100);
    expect(spy).not.toHaveBeenCalled();
  });
});
