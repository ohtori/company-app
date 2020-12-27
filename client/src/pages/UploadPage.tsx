import { BaseSyntheticEvent, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';
import exitImg from '../assets/images/exit.svg';

export function UploadPage(): JSX.Element {
  const [uploadState, setUploadState] = useState('');
  const { logout, token } = useContext(AuthContext);

  const logoutHandler = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    logout();
  }

  const uploadFile = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    const file =  e.target[0].files[0];
    
    if (!file || !file.name.match(/[^]+\.csv$/)) {
      return setUploadState('Выбирите файл в формате .csv');
    };
    if (file.size > 2e6) {
      return setUploadState('Файл слишком большой, попробуйте разделить его на части');
    };
    const response = await fetch('/admin/upload', {
      method: 'POST',
      body: file,
      headers: {
        ['Authorization']: token
      }
    });
    const result = await response.json();
    setUploadState(result.message);
    if (result.isError) {
      logout();
    }
  }

  return (
    <>
      <a className="exit" href="/" onClick={logoutHandler}>Выход<img src={exitImg} alt="" /></a>
      <form onSubmit={uploadFile} action="/admin/upload" method="POST" encType="multipart/form-data" className="admin-form">
        <h1>Загрузите ваш файл в формате .csv:</h1>
        <div>
          <input multiple={true} type="file" name="file" className="auth-form-field" />
        </div>
        <p>{uploadState}</p>
        <button className="auth-form-send">Загрузить</button>
        <Link className="auth-form-back" to="/">Вернутся в приложение</Link>
      </form>
    </>
  );
}