import { PageHolder } from "./abstractClasses/PageHolder";
import { HomePage } from "./HomePage";
import { FormInputsPage } from "./FormInputsPage";
import { SmartTablePage } from "./SmartTablePage";


export class Application extends PageHolder {
  public pagePath: string;
  public homePage = new HomePage(this.page)
  public formInputsPage = new FormInputsPage(this.page)
  public smartTablePage = new SmartTablePage(this.page)
}