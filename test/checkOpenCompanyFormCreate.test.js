const LoginPage = require('../src/classes/auth/login');
const CreateCompany = require('../src/classes/company/companyCreate');
const { createWebdriverChrom } = require('../src/utils/webdriver');
const { describe } = require('mocha');
const makeScreenshot = require('../src/utils/makeScreenShot');
const config = require('../src/utils/config');

describe('Check open form for Company create', async () => {
  // add varibalses for testing
  let driverChrome = null;

  beforeEach(async () => {
    driverChrome = await createWebdriverChrom();
  });

  afterEach(async () => {
    await driverChrome.quit();
  });

  it('Check open Company form', async () => {
    // time and site or lochalhost there tests are going
    console.log(Date().toLocaleLowerCase(), 'date', config.urlLoginPage);
    try {
      const loginPageTest = new LoginPage(driverChrome, config.urlLoginPage);
      const openCompanyForm = new CreateCompany(driverChrome);
      await loginPageTest.userLogIn(
        config.email,
        config.password,
        config.urlHomePageForCheck
      );
      await openCompanyForm.goToCreateCompanyForm();
      await openCompanyForm.checkCreateCompanyFormOpen(config.companyFormTitle);
    } catch (error) {
      // if something wrong make screen in utils/screenshot
      makeScreenshot(driverChrome, 'user_menu_test');
      throw error;
    }
  });
});