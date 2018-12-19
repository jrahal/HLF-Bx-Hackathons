import { CredentialFabricPage } from './app.po';

describe('credential-fabric App', () => {
  let page: CredentialFabricPage;

  beforeEach(() => {
    page = new CredentialFabricPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
