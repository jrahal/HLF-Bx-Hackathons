import { AngularTestPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('Starting tests for care-pay', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be care-pay', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('care-pay');
    })
  });

  it('navbar-brand should be care-pay@0.1.10',() => {
    var navbarBrand = element(by.css('.navbar-brand')).getWebElement();
    expect(navbarBrand.getText()).toBe('care-pay@0.1.10');
  });

  
    it('Hash component should be loadable',() => {
      page.navigateTo('/Hash');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Hash');
    });

    it('Hash table should have 5 columns',() => {
      page.navigateTo('/Hash');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });

  
    it('Patient component should be loadable',() => {
      page.navigateTo('/Patient');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Patient');
    });

    it('Patient table should have 4 columns',() => {
      page.navigateTo('/Patient');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });

  

});
