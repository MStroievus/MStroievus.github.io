import { Locator, Page } from "@playwright/test"
import { PageHolder } from "../pages/abstractClasses/PageHolder"

export class SearchComponent extends PageHolder {

  readonly searchInput: Locator = this.page.getByPlaceholder('Search...')
  readonly closeButton: Locator = this.page.locator('#cdk-overlay-0').getByRole('button')

  // Проста функція яка вводить в пошук слово та шукає його
  async fillKeywordInSearch(keyword: string) {
    await this.searchInput.fill(keyword)
    await this.page.keyboard.press('Enter')
  }
}