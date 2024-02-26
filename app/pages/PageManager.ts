import { HomePage } from "./HomePage";
import { FormInputsPage } from "./FormInputsPage";
import { SmartTablePage } from "./SmartTablePage";
import { DatepickerPage } from "./DatepickerPage";
import { BasePage } from "./abstractClasses/BasePage";



export class Application extends BasePage {
  public pagePath: string;
  public onHomePage = new HomePage(this.page)
  public onFormInputsPage = new FormInputsPage(this.page)
  public onSmartTablePage = new SmartTablePage(this.page)
  public onDatepickerPage = new DatepickerPage(this.page)
}

