import { Locator, expect } from "@playwright/test";
import { HeaderComponent } from "../components/HeaderComponent";
import { BasePage } from "./abstractClasses/BasePage";

export class HomePage extends BasePage {
  public pagePath: string = '/';

  //header
  public header: HeaderComponent = new HeaderComponent(this.page)

  //sideBar
  protected sidebar: Locator = this.page.locator('nb-menu')
  protected sidebarMenuItems: Locator = this.page.getByRole('link').locator('.ng-star-inserted')
  public formsDropDown: Locator = this.page.getByRole('link', { name: 'Forms' })
  public formsInputsCategory: Locator = this.page.getByRole('link', { name: 'Form Inputs' })
  public tablesDataDropDown: Locator = this.page.getByRole('link', { name: 'Tables & Data' })
  public smartTableCategory: Locator = this.page.getByRole('link', { name: 'Smart Table' })










  /**
   * 
   * @param keyword - це  ключове слово яке буде шукатися в масиві,  нажаль на данному  сайті не реалізований пошук це команда не буде працювати, але в теорії   цей  метод можна модифікувати нащо ви  будети хотіти, змінити провірку на плейврайтівську що більш рекомендовано.
   * Я вибрав  сайд бар як приклад як можна працювати з одинаковими елементами для провірки що ключове слово присутнє в тексті кожного із цих елементів
   */
  async checkIfKeywordExistsOnSideBar(keyword: string) {
    for (let item of await this.sidebarMenuItems.all()) {
      // const itemText = item.innerText()
      // expect(itemText).toContain(keyword)
      await item.click()
    }
  }



}


