import { Component, Input } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent{

  @Input() maxLengthMessage: number = 150 ;
  public contactForm: FormGroup;
  
  constructor() {
    this.contactForm = this.createForm();
  }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  nameFormControl = new FormControl('', [Validators.required, Validators.pattern(/^[A-za-a]*[0-9]+?$/g)]);
  phoneFormControl = new FormControl('', [Validators.required, Validators.pattern(/^\+(\d){12}$/g)]);
  messageFormControl = new FormControl('', [Validators.required, Validators.maxLength(this.maxLengthMessage)]);

  createForm() {
    return new FormGroup({
      email: this.emailFormControl,
      name: this.nameFormControl,
      phone: this.phoneFormControl,
      message: this.messageFormControl,
    });
  }

  emailMatcher = new MyErrorStateMatcher();

  getErrorMessage() {
    if (this.nameFormControl.hasError('required')) {      
      return 'Debes ingresar un nombre';
    }
    return '';
  }

  getTelErrorMessage() {
    if (this.phoneFormControl.hasError('required')) {      
      return 'Debes ingresar un teléfono';
    }

    if (this.phoneFormControl.hasError('pattern')) {      
      return 'El formato del teléfono debe ser +555555555555';
    }    
    
    return '';
  }

  getMessageErrorMessage() {
    if (this.messageFormControl.hasError('required')) {      
      return 'Debes ingresar un mensaje';
    }

    console.log(this.messageFormControl);
    if (this.messageFormControl.hasError('maxlength')) {      
      return 'El mensaje debe de contener máximo ' +  this.maxLengthMessage + ' caracteres.';
    }
    
    return '';
  }

  onSaveForm(){
    if (this.contactForm.valid) {
      console.log("Enviar formulario");
    }
  }

}
