import { PageHolder } from "./abstractClasses/PageHolder";
import { HomePage } from "./HomePage";
import { InputPage } from "./Inputs";


export class Application extends PageHolder {
  public pagePath: string;
  public homePage = new HomePage(this.page)
  public inputsPage = new InputPage(this.page)
}