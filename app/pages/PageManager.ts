import { PageHolder } from "./abstractClasses/PageHolder";
import { HomePage } from "./HomePage";
import { FormInputsPage } from "./FormInputsPage";


export class Application extends PageHolder {
  public pagePath: string;
  public homePage = new HomePage(this.page)
  public formInputsPage = new FormInputsPage(this.page)
}