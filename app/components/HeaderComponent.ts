import { Locator, Page } from '@playwright/test'
import { SearchComponent } from "./searchComponent";

export class HeaderComponent {
  protected page: Page
  readonly searchComponent: SearchComponent

  readonly searchButton: Locator

  constructor(page: Page) {
    this.searchComponent = new SearchComponent(page)
    this.page = page
    this.searchButton = page.locator('nb-search').getByRole('button')
  }


}