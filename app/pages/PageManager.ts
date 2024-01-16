import { PageHolder } from "./abstractClasses/PageHolder";
import { HomePage } from "./HomePage";


export class Application extends PageHolder {
  public pagePath: string;
  public homePage = new HomePage(this.page)
}