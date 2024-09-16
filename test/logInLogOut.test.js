const LogOut = require('../src/classes/auth/logOut');
const LoginPage = require('../src/classes/auth/login');
const { createWebdriverChrom } = require('../src/utils/webdriver');
const { describe } = require('mocha');
const makeScreenshot = require('../src/utils/makeScreenShot');
const config = require('../src/utils/config');

describe('Log In and Log Out Production, test-cases #1, 2', async () => {
  // add varibalses for testing //
  let driverChrome = null;

  beforeEach(async () => {
    driverChrome = await createWebdriverChrom();
  });

  afterEach(async () => {
    await driverChrome.quit();
  });

  it('Log In and Log Out the Coloradojob production', async () => {
    // time and site or lochalhost there tests are going
    console.log(Date().toLocaleLowerCase(), 'date', config.urlLoginPage);
    try {
      const loginPageTest = new LoginPage(driverChrome, config.urlLoginPage);
      const logOutUserTest = new LogOut(driverChrome);

      await loginPageTest.userLogIn(
        config.email,
        config.password,
        config.urlHomePageForCheck
      );
      
      await logOutUserTest.findUserMenu();
      await logOutUserTest.userLogOut(config.urlLoginPage);
      console.log('test passed');
    } catch (error) {
      // if something wrong make screen in utils/screenshot
      makeScreenshot(driverChrome, 'auth_test');
      throw error;
    }
  });
});
