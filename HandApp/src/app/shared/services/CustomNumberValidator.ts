import {FormControl, Validators} from "@angular/forms";

const validCharacters = /[^0-9\.]/;

export class CustomNumberValidator extends Validators {
 static validateCharacters (control: FormControl)
 {
  if(control.value && control.value.length > 0)
  {
    const matches = control.value.match(validCharacters);

    return matches && matches.length ? {invalid_characters: matches} : null;
  } else {
    return null;
  }
 }
}
