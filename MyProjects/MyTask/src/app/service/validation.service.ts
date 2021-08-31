import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { LanguageService } from "./language.service";

export class ValidationService {
  static translate : any = TranslateService;
  
  public static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config: any = {
      'required': 'This field is required',
      'invalidEmailAddress': 'Invalid email address',
      'minlength': 'Minimum number of characters - ${validatorValue.requiredLength}',
      'maxlength': 'Maximum number of characters - ${validatorValue.requiredLength}',
    };

    return config[validatorName];
  }

  public static emailValidator(control: any) {
    // RFC 2822 compliant regex
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }
}
