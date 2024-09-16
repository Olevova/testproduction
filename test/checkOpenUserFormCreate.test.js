const LoginPage = require('../src/classes/auth/login');
const CreateCompany = require('../src/classes/company/companyCreate');
const InviteUser = require('../src/classes/user/inviteUser')
const { createWebdriverChrom } = require('../src/utils/webdriver');
const { describe } = require('mocha');
const makeScreenshot = require('../src/utils/makeScreenShot');
const config = require('../src/utils/config');

describe('Check open form for User create', async () => {
  // add varibalses for testing
  let driverChrome = null;

  beforeEach(async () => {
    driverChrome = await createWebdriverChrom();
  });

  afterEach(async () => {
    await driverChrome.quit();
  });

  it('Check open User form for the SA', async () => {
    // time and site or lochalhost there tests are going
    console.log(Date().toLocaleLowerCase(), 'date', config.urlLoginPage);
    try {
      const loginPageTest = new LoginPage(driverChrome, config.urlLoginPage);
      const openUserForm = new InviteUser(driverChrome);
      await loginPageTest.userLogIn(
        config.email,
        config.password,
        config.urlHomePageForCheck
      );
      await openUserForm.goToInviteUsersForm();
      await openUserForm.checkCreateUserFormOpen(config.userFormTitle);
    } catch (error) {
      // if something wrong make screen in utils/screenshot
      makeScreenshot(driverChrome, 'user_menu_test_SA');
      throw error;
    }
  });

  it('Check open User form for the CA', async () => {
    // time and site or lochalhost there tests are going
    console.log(Date().toLocaleLowerCase(), 'date', config.urlLoginPage);
    try {
      const loginPageTest = new LoginPage(driverChrome, config.urlLoginPage);
      const openUserForm = new InviteUser(driverChrome);

      await loginPageTest.userLogIn(
        config.emailCA,
        config.passwordCA,
      );
      await openUserForm.goToInviteUsersForm('ca');
      await openUserForm.checkCreateUserFormOpen(config.userFormTitle);
    } catch (error) {
      // if something wrong make screen in utils/screenshot
      makeScreenshot(driverChrome, 'user_menu_test_CA');
      throw error;
    }
  });

  it('Check open User form for the PM', async () => {
    // time and site or lochalhost there tests are going
    console.log(Date().toLocaleLowerCase(), 'date', config.urlLoginPage);
    try {
      const loginPageTest = new LoginPage(driverChrome, config.urlLoginPage);
      const openUserForm = new InviteUser(driverChrome);
      await loginPageTest.userLogIn(
        config.emailPM,
        config.passwordPM,
      );
      
      await openUserForm.goToInviteUsersForm('pm');
      await openUserForm.checkCreateUserFormOpen(config.userFormTitle);
    } catch (error) {
      // if something wrong make screen in utils/screenshot
      makeScreenshot(driverChrome, 'user_menu_test_PM');
      throw error;
    }
  });
});