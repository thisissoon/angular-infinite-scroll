import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('InfiniteScroll Lib E2E Tests', function () {
  let page: AppPage;

  beforeEach(() => page = new AppPage());

  beforeEach(() => page.navigateTo());

  afterEach(() => {
    browser.manage().logs().get('browser').then((browserLog: any[]) => {
      expect(browserLog).toEqual([]);
    });
  });

  describe('trigger event on scroll end', () => {
    it('should load more numbers when element is scrolled to bottom', () => {
      const el = page.getList();
      const items = page.getListItems();
      expect(items.count()).toEqual(20);
      page.scrollToBottom(1);
      expect(items.count()).toEqual(40);
      page.scrollToBottom(2);
      expect(items.count()).toEqual(60);
    });

    it('should NOT load more numbers when disabled', () => {
      const el = page.getList();
      const items = page.getListItems();
      expect(items.count()).toEqual(20);
      for (let i = 1; i < 20; i++) {
        page.scrollToBottom(i);
      }
      expect(items.count()).toEqual(300);
      page.scrollToBottom(20);
      expect(items.count()).toEqual(300);
      page.scrollToBottom(21);
      expect(items.count()).toEqual(300);
    });
  });
});
