import { Page } from '@playwright/test'

export abstract class BasePage {
  protected page: Page;
  public abstract pagePath: string;

  constructor(page: Page) {
    this.page = page;
  }


  async navigateTo(path?: string) {
    await this.page.goto(path ?? this.pagePath);
  }
}