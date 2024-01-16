import { Page } from "@playwright/test";


// Один раз ініціалізуємо об'єкт `Page` у `PageHolder`, і всі підкласи автоматично отримують доступ до цього об'єкта, не повторюючи однаковий код у кожному класі
export abstract class PageHolder {
  constructor(protected page: Page) { }
}
