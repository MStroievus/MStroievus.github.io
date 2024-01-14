import { HomePage } from '../app/pages/homePage';
import { test } from '../fixture/FixtureBase';
import { HeaderComponent } from '../app/components/HeaderComponent';

test('first', async ({ page }) => {
  const homePage = new HomePage(page)
  const header = new HeaderComponent(page)
  await page.goto("/")
  await header.searchButton.click()
  await page.pause()
  await header.searchComponent.closeButton.click()

});

