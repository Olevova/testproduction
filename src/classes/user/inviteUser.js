const { By, until } = require('selenium-webdriver');
const Base = require('../base');

class InviteUser extends Base {
  static async findDateInDropDown(array, text) {
    for (const option of array) {
      const dateUser = (await option.getText()).trim().toLowerCase();

      if (dateUser === text.trim().toLowerCase()) {
        await option.click();
        return;
      }
    }
    if (array.length > 0) {
      await array[0].click();
      return;
    }

    throw new Error(`Users list is empty`);
  }

  constructor(driver) {
    super(driver);
    this.driver = driver;
    this.userTitle = ''
    this.startUsersNumber = 0;
    this.endUsersNumber = 0;
    this.usersNumberInUsersList = null
  }

  async goToInviteUsersForm(user='sa') {
    if(user === 'sa'){
    const usersBtn = await this.driver.findElement(By.id('linkUsers'));
    await usersBtn.click();
    // this.startUsersNumber = await this.numberOfItems(this.driver);
    }
    else{
      await this.driver.sleep(2000);
      await this.driver.wait(until.elementLocated(By.id('linkUsersInProject')),10000)
      const userBtnCA = await this.driver.findElement(By.id('linkUsersInProject'))
      await this.driver.wait(until.elementIsEnabled(userBtnCA),10000);
      await userBtnCA.click();
      await this.driver.executeScript('return document.readyState');

      

    }
    await this.driver.wait(until.elementLocated(By.id('btnCreate')),10000);
    const inviteNewUserBtn = await this.driver.findElement(By.id('btnCreate'));
    await this.driver.wait(until.elementIsEnabled(inviteNewUserBtn),10000)
    await inviteNewUserBtn.click();
    const startTime =performance.now();;
    try {
        await this.driver.wait(until.elementLocated(By.css('app-invite-user-form .form-invite')), 10000);
        console.log(`Form located after ${performance.now() - startTime} ms`);
    } catch (error) {
        console.log(`Form not located within 10000 ms, waited ${performance.now() - startTime} ms`);
        throw error;
    }
    // await this.driver.wait(until.elementLocated(By.css('app-invite-user-form .form-invite')),10000);
    await this.driver.sleep(500);
  }

    async checkCreateUserFormOpen(titleForCheck){
    this.userTitle = await this.getFormTitle();
    if(this.userTitle.toLowerCase().trim().includes(titleForCheck.toLowerCase()))
    {console.log('Form title:', this.userTitle.toLowerCase().trim(),'test check create User form passed');
    }
  else{
    throw new Error ('test check create User form failed')
  }
}

  async checkNumberOfUsersInUsersList(user='sa') {
    if(user === 'sa'){
    const usersBtn = await this.driver.findElement(By.id('linkUsers'));
    await usersBtn.click();
    this.startUsersNumber = await this.numberOfItems(this.driver);
    }
    else{
      await this.driver.sleep(1000);
      await this.driver.wait(until.elementLocated(By.id('linkUsersInProject')),10000)
      const userBtnCA = await this.driver.findElement(By.id('linkUsersInProject'))
      await this.driver.wait(until.elementIsEnabled(userBtnCA),10000);
      await userBtnCA.click();
      await this.driver.executeScript('return document.readyState');
    }
    this.usersNumberInUsersList  = await this.numberOfItems(this.driver);
  }

  async checkAvailibleNumberOfUsersInInviteForm() {
    await this.driver.wait(until.elementLocated(By.id('btnCreate')),10000);
    const inviteNewUserBtn = await this.driver.findElement(By.id('btnCreate'));
    await this.driver.wait(until.elementIsEnabled(inviteNewUserBtn),10000)
    await inviteNewUserBtn.click();
    await this.driver.wait(until.elementLocated(By.css('.backdrop[show="true"] .modal')),10000);
    await this.driver.wait(until.elementLocated(By.css('.form-invite')),10000);
    const formTitle = await this.driver.findElement(By.css(".form-modal-title"));
    await this.driver.wait(until.elementIsVisible(formTitle), 3000);
    const userInfo = await formTitle.findElement(By.css(".usersAmount-info"));
    const userInfoText =await userInfo.getText();
    const arrayInfo = await userInfoText.split(" ");
    const arrayOfUser = arrayInfo[arrayInfo.length-1].split('/');
    console.log(`available number of users ${arrayOfUser[0]}, users company plan ${arrayOfUser[1]}`);
    const userInProject = arrayOfUser[1] - arrayOfUser[0];
    console.log(userInProject);
    if (this.usersNumberInUsersList === userInProject){
      console.log("test passed succesful");
    }
    else{
      throw new Error('Test availible number of users failed, check screenshot')
    }
    

  }

  async fillInviteForm(email, company, role) {
    const selectEmail = await this.driver.findElement(By.id('userEmail'));
    await this.driver.wait(until.elementIsVisible(selectEmail), 3000);
    await selectEmail.sendKeys(email);

    const companyDropDown = await this.driver.findElement(By.id('userCompany'));
    await companyDropDown.click();

    await this.driver.wait(
      until.elementsLocated(By.className('ng-option')),
      3000
    );
    const companyList = await this.driver.findElements(
      By.className('ng-option')
    );

    await InviteUser.findDateInDropDown(companyList, company);
    await this.driver.sleep(1000);
    if (role.trim().toLowerCase() !== 'company admin') {
      const roleDropDown = await this.driver.findElement(By.id('userRole'));
      await roleDropDown.click();
      const roleList = await this.driver.findElements(By.css('.ng-option'));
      await InviteUser.findDateInDropDown(roleList, role);
    }

    const sendAnInvite = this.driver.findElement(By.id('btnInvite'));
    // await this.waitForSpecificTime(18, 27) 
    await sendAnInvite.click();

  }
  async fillInviteFormByCA(email, role) {
    await this.driver.wait(until.elementLocated(By.css(".backdrop[show='true']"),10000));
    await this.driver.sleep(1000);
    await this.driver.wait(until.elementLocated(By.id('userEmail')),10000);
    const selectEmail = await this.driver.findElement(By.id('userEmail'));
    await this.driver.wait(until.elementIsEnabled(selectEmail), 3000);
    await selectEmail.sendKeys(email);
    const roleDropDown = await this.driver.findElement(By.id('userRole'));
    await roleDropDown.click();
    await this.driver.wait(until.elementLocated(By.css('.ng-dropdown-panel[role="listbox"]')),10000);
    const roleList =  await roleDropDown.findElements(By.css('.ng-option-label'));
  
    await this.findDateInDropDown(roleList,role)
  

    const sendAnInvite = this.driver.findElement(By.id('btnInvite'));
   
    await sendAnInvite.click();
    

  }

  async checkCreateNewUser(name){
    await this.notificationCheck();
    await this.checkCreateItem('.table-users__row td:nth-child(3)',name )
  }

  async checkNewUser(emailNew, userPage) {
    await this.notificationCheck('id','mainErrorText');
  
    this.endUsersNumber = await this.numberOfItems(this.driver);
    console.log(this.startUsersNumber, this.endUsersNumber);

    try {
      if (this.startUsersNumber >= this.endUsersNumber) {
        throw new Error('user did not create');
      }
      return;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = InviteUser;
