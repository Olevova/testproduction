const LoginPage = require('../src/classes/auth/login');
const CreateCompany = require('../src/classes/company/companyCreate');
const { createWebdriverChrom } = require('../src/utils/webdriver');
const { describe } = require('mocha');
const makeScreenshot = require('../src/utils/makeScreenShot');

describe('Check open form for User create', async () => {
  // add varibalses for testing
  const URL = 'https://app.colorjob.com/login';
  const urlForCheck =
    'https://app.colorjob.com/system/dashboard';
  // const URL = 'http://localhost:4300/login';
  // const urlForCheck = "http://localhost:4300/system/dashboard"
  const email = 'superadmin@gmail.com';
  const password = 'colorjob';
  const companyTitle = "Create Company";
  let driverChrome = null;

  beforeEach(async () => {
    driverChrome = await createWebdriverChrom();
  });

  afterEach(async () => {
    await driverChrome.quit();
  });

  it('Check open User form', async () => {
    // time and site or lochalhost there tests are going
    console.log(Date().toLocaleLowerCase(), 'date', URL);
    try {
      const loginPageTest = new LoginPage(driverChrome, URL);
      const openCompanyForm = new CreateCompany(driverChrome);

      await loginPageTest.openLoginForm();
      await loginPageTest.fillEmailInput(email);
      await loginPageTest.fillPasswordInput(password);
      await loginPageTest.checkSaveForFuture();
      await loginPageTest.login(urlForCheck);
      await openCompanyForm.goToCreateCompanyForm();
      await openCompanyForm.checkCreateCompanyFormOpen(companyTitle);
    } catch (error) {
      // if something wrong make screen in utils/screenshot
      makeScreenshot(driverChrome, 'user_menu_test');
      throw error;
    }
  });
});