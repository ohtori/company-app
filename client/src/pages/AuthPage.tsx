import { BaseSyntheticEvent, useContext, useState } from 'react';
import { AuthContext } from '../App';
import { IAuth, IAuthErrors } from '../appInterfaces';
import authFormValidate from '../helpers/authValidate';


export function AuthPage(): JSX.Element {
  const [authState, setAuthState] = useState({ email: '', password: '' });
  const [authErrors, setAuthErrors] = useState({ emailError: '', passwordError: '', serverError: '' });

  const {login} = useContext(AuthContext);  

  const inputHandler = (e: BaseSyntheticEvent) => {
    setAuthState((prev: IAuth) => {
      return { ...prev, [e.target.name]: e.target.value }
    });
  }

  const authSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    
    if (!authFormValidate(authState, setAuthErrors)) return;

    const response = await fetch('/admin/auth', {
      method: 'POST',
      body: JSON.stringify(authState)
    });

    if (response.status >= 500) {
      return setAuthErrors((prev: IAuthErrors) => {
        return { ...prev, serverError: "Ошибка сервера, попробуйте позже" }
      });
    }
    
    const result = await response.json();
    if (result.isError) {
      return setAuthErrors((prev: IAuthErrors) => {
        return { ...prev, serverError: result.message }
      });
    } else {
      setAuthErrors((prev: IAuthErrors) => {
        return { ...prev, serverError: '' }
      });
      localStorage.setItem('currentUser', JSON.stringify(result));
      login(result);
    }
  }

  return (
    <form onSubmit={authSubmit} action="/" method="POST" className="auth-form">
    <h1>Авторизация:</h1>
    <div>
      <input
        onInput={inputHandler}
        value={authState.email} 
        type="email" 
        name="email"
        placeholder="Email"
        className={`auth-form-field ${authErrors.emailError || authErrors.serverError ? 'validation-error' : ''}`}
      />
    </div>
    <div>
      <input 
        onInput={inputHandler}
        value={authState.password} 
        type="password" 
        name="password" 
        placeholder="Password" 
        className={`auth-form-field ${authErrors.passwordError || authErrors.serverError ? 'validation-error' : ''}`}
      />
    </div>
    <button className="auth-form-send">Войти</button>
    <p>{authErrors.emailError || authErrors.passwordError || authErrors.serverError}</p>
    <a className="auth-form-back" href="/">Вернутся в приложение</a>
  </form>
  )
}