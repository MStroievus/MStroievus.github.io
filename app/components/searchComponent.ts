import { Locator, Page } from "@playwright/test"

export class SearchComponent {
  readonly page: Page
  readonly searchInput: Locator
  readonly closeButton: Locator

  constructor(page: Page) {
    this.page = page
    this.searchInput = page.getByPlaceholder('Search...')
    this.closeButton = page.locator('#cdk-overlay-0').getByRole('button')
  }
}