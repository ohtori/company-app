import { IAuth, IAuthErrors } from "../appInterfaces";

export default function authFormValidate(authState: IAuth, setAuthErrors: React.Dispatch<React.SetStateAction<IAuthErrors>> ) {
  let isValid = true;
  if (authState.email.length > 120 || !authState.email.match(/[^<>/]+@[^<>/]+\.[^<>/]+/)) {
    setAuthErrors((prev: IAuthErrors) => {
      return { ...prev, emailError: 'Некорректный email' }
    });
    isValid = false;
  } else {
    setAuthErrors((prev: IAuthErrors) => {
      return { ...prev, emailError: '' }
    });
  }

  if (authState.password.length < 6 || authState.password.length > 30) {
    setAuthErrors((prev: IAuthErrors) => {
      return { ...prev, passwordError: 'Некорректный пароль' }
    });
    isValid = false;
  } else {
    setAuthErrors((prev: IAuthErrors) => {
      return { ...prev, passwordError: '' }
    });
  }
  return isValid;
}