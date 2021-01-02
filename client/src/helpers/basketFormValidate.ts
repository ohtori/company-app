import { IBasketFormState } from 'company-app';

export default function basketFormValidate(formState: IBasketFormState) {
  if (formState.name.length < 2) {
    return {
      nameError: 'Введите корректное имя', 
      phoneError: '', 
      emailError: '',
      serverMessage: ''
    };
  }

  if (formState.phone.length < 6 || !formState.phone.match(/^[0-9-+ ())]+$/)) {
    return {
      nameError: '',
      phoneError: 'Введите корректный телефон',
      emailError: '',
      serverMessage: ''
    };
  }

  if (formState.email.length < 6 || !formState.email.match(/[^<>/]+@[^<>/]+\.[^<>/]+/)) {
    return {
      nameError: '',
      phoneError: '',
      emailError: 'Введите корректный email',
      serverMessage: ''
    };
  }
}