import { Injectable } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, FormGroup, FormArray } from '@angular/forms';
import { find } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  constructor() { }

  validateAllFormFields(formGroup: UntypedFormGroup | UntypedFormArray){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);

      if(control instanceof UntypedFormControl){
        control.markAsTouched({onlySelf:true});
      } else if(control instanceof UntypedFormGroup || control instanceof UntypedFormArray){
        control.markAsTouched({onlySelf:true});
        this.validateAllFormFields(control);
      }
    });
  }

  getErrorMessage(formGroup:UntypedFormGroup, fieldName: string) {
    const field = formGroup.get(fieldName) as UntypedFormControl;
    return this.getErrorMesssageFromField(field);
  }

  getErrorMesssageFromField(field:UntypedFormControl) {
      if (field?.hasError('required')) {
        return 'Campo Obrigatório';
      }
      if (field?.hasError('minlength')) {
        const requiredLength = field.errors ? field.errors['requiredlength'] : 5;
        return `Tamanho MÍNIMO precisa ser de ${requiredLength} caracteres`;
      }

      if (field?.hasError('maxlength')) {
        const requiredLength = field.errors ? field.errors['requiredlength'] : 50;
        return `Tamanho MÁXIMO é de ${requiredLength} caracteres`;
      }

      return 'Campo Inválido.';
    }

    getFormaArrayFieldErrorMessage(formGroup:UntypedFormGroup, formArrayName:string,
      fieldName:string, index:number) {
       const formArray = formGroup.get(formArrayName) as UntypedFormArray;
       const field = formArray.controls[index].get(fieldName) as UntypedFormControl;
       return this.getErrorMesssageFromField(field);
      }

      isFormArrayRequired(formGroup:UntypedFormGroup, formArrayName:string){
        const formArray = formGroup.get(formArrayName) as UntypedFormArray;
        return !formArray.valid && formArray.hasError('required') && formArray.touched;
      }


}

