import { Locator, Page } from "@playwright/test"
import { PageHolder } from "../pages/abstractClasses/PageHolder"

export class SearchComponent extends PageHolder {

  readonly searchInput: Locator = this.page.getByPlaceholder('Search...')
  readonly closeButton: Locator = this.page.locator('#cdk-overlay-0').getByRole('button')

  async searchWord(keyword: string) {
    await this.searchInput.fill(keyword)
    await this.page.keyboard.press('Enter')
  }
}