const { By, until } = require('selenium-webdriver');
const path = require('path');

class Base {
  async waitListDate(selector, lgh) {
    let element;
    let counter = 0;

    while (!element || element.length < 2) {
      element = await this.driver.findElements(By.css(selector)); // Use the provided selector

      if (element.length < lgh) {
        await this.driver.sleep(1000);
        console.log(counter, 'counter');
      }
      counter += 1;
      if (counter >= 10) {
        break;
      }
    }
  }

  async getFormTitle() {
    await this.driver.wait(
      until.elementLocated(By.css('.backdrop')),
      10000
    );
    
    // const createForm = this.driver.findElement(By.className('modal'));
    const formElement = await this.driver.findElement(
      By.css('form.form-invite')
    );
    const formTitleEl = await formElement.findElement(
      By.css('.form-modal-title')
    );
    const title = await formTitleEl.getText();
    return title;
  }

  async findAndClickOnLinInTheList(link, selector) {
    await this.waitListDate(selector, 1);
    const listOfLink = await this.driver.findElements(By.css(selector));
    let notFindeLink = true;
    for (let linkTag of listOfLink) {
      const linkText = await linkTag.getText();
      // console.log(link, 'link', (await linkText.toLowerCase().trim()) === link.toLowerCase(),await linkText.toLowerCase().trim(), link.toLowerCase() );
      
      if ((await linkText.toLowerCase().trim()) === link.toLowerCase()) {
        await this.driver.wait(until.elementIsEnabled(linkTag), 10000);
        await linkTag.click();
        notFindeLink = false;
        await this.driver.sleep(500);
        break;
      }
    }
    if (notFindeLink) {
      throw new Error('It is not such link');
    }
  }

//The method go to the projects page from the dashboard

async goToProjectsPageViaCompany(company) {
  const companiesLink = await this.driver.findElement(
    By.id('linkCompanies')
  );
  await this.driver.wait(until.elementIsEnabled(companiesLink), 10000);
  await companiesLink.click();
  await this.waitListDate('.company-name', 2);
  await this.findAndClickOnLinkInTheList(
    company,
   '.company-name'
  );

  const projectList = await this.driver
    .wait(until.elementsLocated(By.css('li.table-projects__row')), 1000)
    .catch(() => null);
  if (projectList === null) {
    console.log('Has no projects in the project list');
    return false;
  }
  const firstProject = await this.driver.findElements(
    By.css('li.table-projects__row'),
  );
  await this.driver.wait(until.elementIsEnabled(firstProject[0]));
}

// The method for finding a link in a list and clicking on it
async findAndClickOnLinkInTheList(link, selector) {
  await this.waitListDate(selector, 1);
  const listOfLink = await this.driver.findElements(By.css(selector));
  let notFindeLink = true;
  for (let linkTag of listOfLink) {
   const linkText = await linkTag.getText();
    if (await linkText.trim().toLowerCase() === link.toLowerCase()) {
      await this.driver.wait(until.elementIsEnabled(linkTag), 10000);
      await linkTag.click();
      notFindeLink = false;
      await this.driver.sleep(500);
      break;
    }
  }
  if (notFindeLink) {
    throw new Error('It is not such link');
  }
}

}

module.exports = Base;
