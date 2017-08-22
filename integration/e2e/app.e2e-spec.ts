import { browser, element, by } from 'protractor';

describe('InfiniteScroll Lib E2E Tests', function () {

  function scrollToBottom(page: number) {
    const y = page * 380; ;
    const script = `document.getElementById('infinite-scroll').scrollTop = ${y}`;
    browser.executeScript(script);
    browser.sleep(300);
  }

  beforeEach(() => browser.get(''));

  afterEach(() => {
    browser.manage().logs().get('browser').then((browserLog: any[]) => {
      expect(browserLog).toEqual([]);
    });
  });

  describe('trigger event on scroll end', () => {
    it('should load more numbers when element is scrolled to bottom', () => {
      let el = element(by.css('.foo'));
      let items = element.all(by.css('li'));
      expect(items.count()).toEqual(20);
      scrollToBottom(1);
      expect(items.count()).toEqual(40);
      scrollToBottom(2);
      expect(items.count()).toEqual(60);
    });

    it('should NOT load more numbers when disabled', () => {
      let el = element(by.css('.foo'));
      let items = element.all(by.css('li'));
      expect(items.count()).toEqual(20);
      for (let i = 1; i < 20; i++) {
        scrollToBottom(i);
      }
      expect(items.count()).toEqual(300);
      scrollToBottom(20);
      expect(items.count()).toEqual(300);
      scrollToBottom(21);
      expect(items.count()).toEqual(300);
    });
  });
});
