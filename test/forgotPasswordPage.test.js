const ForgotPassword = require('../src/classes/auth/forgotPassword');
const { createWebdriverChrom } = require('../src/utils/webdriver');
const { describe } = require('mocha');
const { By, until } = require('selenium-webdriver');
const makeScreenshot = require('../src/utils/makeScreenShot');
const config = require('../src/utils/config');

describe('Check forgot password page, test-case # 3 in the SU', async () => {
  let driverChrome = null;
  
  // const comperaUrl = 'http://localhost:4200/login';

  beforeEach(async () => {
    try {
      driverChrome = await createWebdriverChrom();
    } catch (error) {
      console.log(error.message);
    }
  });

  afterEach(async () => {
    if (driverChrome) {
      await driverChrome.quit();
    }
  });

  it('forgot passsord page', async () => {
     // time and site or lochalhost there tests are going
     console.log(Date().toLocaleLowerCase(), 'date');
    const forgotPasswordTest = new ForgotPassword(driverChrome);
    try {
    await forgotPasswordTest.openFogotPasswordForm(config.urlLoginPage);
    await forgotPasswordTest.checkForgotPasswordPage(config.urlForgotPassword, config.passwordFormTitle)
  
    } catch (error) {
      makeScreenshot(driverChrome, 'forgotpassword');
      throw error;
    }
  })
});
