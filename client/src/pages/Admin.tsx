import { useContext } from 'react';
import { UploadPage } from './UploadPage';
import { AuthPage } from './AuthPage';
import { AuthContext } from '../App';
import '../assets/css/admin.css';

export default function Admin(): JSX.Element {
  const { token, role } = useContext(AuthContext);
  
  return (
    <>
      {token && role === 'Admin' ? <UploadPage/> : <AuthPage/>}
    </>
  )
}