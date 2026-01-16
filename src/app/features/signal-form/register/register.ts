import { Component, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { form, FormField, required, minLength, validate, email, pattern, validateHttp } from '@angular/forms/signals';
import { FieldWrapper } from '@components/field-wrapper/field-wrapper';

interface RegisterModel {
  username: string;
  postalCode: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}
function phoneNumber(field: any, options?: {message?: string}) {
  validate(field, ({value}) => {
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    if (!phoneRegex.test(value() as string)) {
      return {
        kind: 'phoneNumber',
        message: options?.message || 'Phone must be in format: 555-123-4567',
      };
    }
    return null;
  });
}

@Component({
  selector: 'app-register',
  imports: [FieldWrapper, FormField],
  templateUrl: './register.html',
  styleUrl: './register.css'
})

export class RegisterForm {
  http = inject(HttpClient)
  registrationModel = signal<RegisterModel>({
    username: '',
    postalCode: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  registrationForm = form(this.registrationModel, (schemaPath) => {
    required(schemaPath.username, { message: 'Username is required' })
    // validateHttp(schemaPath.username, {
    //   request: ({value}) => `/api/check-username?username=${value()}`,
    //   onSuccess: (response: any) => {
    //     if (response.taken) {
    //       return {
    //         kind: 'usernameTaken',
    //         message: 'Username is already taken'
    //       }
    //     }
    //     return null
    //   },
    //   onError: (error) => ({
    //     kind: 'networkError',
    //     message: 'Could not verify username availability'
    //   })
    // })

    required(schemaPath.email, { message: 'Email is required' })
    email(schemaPath.email, { message: 'Enter a valid email address' })

    phoneNumber(schemaPath.phone)
    pattern(schemaPath.postalCode, /^\d{5}$/, {
      message: 'Postal code must be 5 digits'
    })

    required(schemaPath.password, { message: 'Password is required' })
    minLength(schemaPath.password, 8, { message: 'Password must be at least 8 characters' })

    required(schemaPath.confirmPassword, { message: 'Please confirm your password' })
    validate(schemaPath.confirmPassword, ({value, valueOf}) => {
      const confirmPassword = value()
      const password = valueOf(schemaPath.password)
      if (confirmPassword !== password) {
        return {
          kind: 'passwordMismatch',
          message: 'Passwords do not match'
        }
      }
      return null
    })
  })
  passwordStrength = computed(() => {
    const password = this.registrationForm.password().value();
    if (password.length < 8) return 'weak';
    if (password.length < 12) return 'medium';
    return 'strong';
  });

  resetForm() {
    this.registrationForm().reset()
    this.registrationModel.set({
      username: '',
      postalCode: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    })
  }

  onSubmit() {
    // Wait for any pending async validation
    if (this.registrationForm().pending()) {
      console.log('Waiting for validation...');
      return;
    }

    if (this.registrationForm().invalid()) {
      console.error('Form is invalid');
      return;
    }
    const data = this.registrationModel();
    console.log('Registration Successful', data)
    // await this.api.register(data);
  }
}
