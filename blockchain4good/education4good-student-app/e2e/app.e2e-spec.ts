import { AngularTestPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('Starting tests for education4good-student-app', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be education4good-student-app', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('education4good-student-app');
    })
  });

  it('navbar-brand should be education4all@0.1.9',() => {
    var navbarBrand = element(by.css('.navbar-brand')).getWebElement();
    expect(navbarBrand.getText()).toBe('education4all@0.1.9');
  });

  
    it('Course component should be loadable',() => {
      page.navigateTo('/Course');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Course');
    });

    it('Course table should have 6 columns',() => {
      page.navigateTo('/Course');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });

  
    it('RequestForProposal component should be loadable',() => {
      page.navigateTo('/RequestForProposal');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('RequestForProposal');
    });

    it('RequestForProposal table should have 10 columns',() => {
      page.navigateTo('/RequestForProposal');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(10); // Addition of 1 for 'Action' column
      });
    });

  
    it('EducationalContract component should be loadable',() => {
      page.navigateTo('/EducationalContract');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('EducationalContract');
    });

    it('EducationalContract table should have 9 columns',() => {
      page.navigateTo('/EducationalContract');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(9); // Addition of 1 for 'Action' column
      });
    });

  

});
