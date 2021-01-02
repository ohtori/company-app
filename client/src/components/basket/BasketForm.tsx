import { BaseSyntheticEvent, useContext, useEffect, useState } from 'react';
import { IBasketFormProps } from 'company-app';
import basketFormValidate from '../../helpers/basketFormValidate';
import { BasketContext } from '../../pages/Main';

export default function BasketForm({ basketGoods, totalPrice, setBasketGoods }: IBasketFormProps ): JSX.Element {
  const [ formState, setFormState] = useState({ name: '', phone: '', email: '', goods: basketGoods, totalPrice: totalPrice});
  const [ formError, setFormError ] = useState({ nameError: '', phoneError: '', emailError: '', serverMessage: '' });
  const { setBasketState } = useContext(BasketContext);

  const inputHandler = (e: BaseSyntheticEvent) => {
    setFormState((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    });
  }

  useEffect(() => {
    setFormState({ name: '', phone: '', email: '', goods: basketGoods, totalPrice: totalPrice});
  }, [basketGoods, totalPrice])

  const submitHandler = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    if (!basketGoods.length) {
      return setFormError({ nameError: '', phoneError: '', emailError: '', serverMessage: 'Нет ни одного товара в корзине!' });
    }
    
    const validationResult = basketFormValidate(formState);

    if (validationResult) {
      return setFormError(validationResult);
    } else {
      setFormError({ nameError: '', phoneError: '', emailError: '', serverMessage: '' });
    }

    const response = await fetch('/basket', {
      method: 'POST',
      body: JSON.stringify(formState)
    });

    if (response.status >= 400) {
      return setFormError((prev) => {
        return { ...prev, serverMessage: "Ошибка, попробуйте позже" }
      });
    }

    setFormError((prev) => {
      return { ...prev, serverMessage: "Заказ успешно оформлен!" }
    });

    setBasketState([]);
    setBasketGoods([]);
    localStorage.removeItem('basket');
  }

  return (
    <form onSubmit={submitHandler} action="/" method="POST" className="basket-form">
      <h2>Контактные данные:</h2>
      <div>
        <input 
          onInput={inputHandler}
          type="text" name="name"
          placeholder="Ваше имя"
          className={`basket-form-field ${formError.nameError ? 'validation-error': ''}`}
        />
      </div>
      <div>
        <input
          onInput={inputHandler}
          type="phone" name="phone"
          placeholder="Ваш телефон"
          className={`basket-form-field ${formError.phoneError ? 'validation-error': ''}`}          
        />
      </div>
      <div>
        <input
          onInput={inputHandler}
          type="text" name="email"
          placeholder="Ваш e-mail"
          className={`basket-form-field ${formError.emailError ? 'validation-error': ''}`}
        />
      </div>
      <p className="form-error-message">{formError.nameError || formError.emailError || formError.phoneError || formError.serverMessage || ''}</p>
      <button className="basket-form-send">Оформить заказ</button>
    </form>
  );
}