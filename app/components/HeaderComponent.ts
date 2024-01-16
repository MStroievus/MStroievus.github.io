import { Locator } from '@playwright/test'
import { SearchComponent } from "./SearchComponent";
import { PageHolder } from '../pages/abstractClasses/PageHolder';

export class HeaderComponent extends PageHolder {
  readonly searchComponent: SearchComponent = new SearchComponent(this.page)
  readonly searchButton: Locator = this.page.locator('nb-search').getByRole('button')
}