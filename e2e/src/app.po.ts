import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getList() {
    return element(by.css('.foo'));
  }

  getListItems() {
    return element.all(by.css('li'));
  }

  scrollToBottom(page: number) {
    const y = page * 380;
    const script = `document.getElementById('infinite-scroll').scrollTop = ${y}`;
    browser.executeScript(script);
    browser.sleep(300);
  }
}
