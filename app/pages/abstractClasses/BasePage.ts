import { PageHolder } from "./PageHolder";

// Клас BasePage розширює PageHolder, щоб мати доступ до об'єкта Page
// Абстрактна властивість pagePath повинна бути реалізована в класі-нащадку

export abstract class BasePage extends PageHolder {

  public abstract pagePath: string;

  async navigateTo(path?: string) {
    await this.page.goto(path ?? this.pagePath);
  }

}