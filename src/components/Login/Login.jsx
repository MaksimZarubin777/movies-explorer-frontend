import './Login.css';
import { Link } from 'react-router-dom';
import CustomForm from '../Form/Form.jsx';
import PopupLogin from '../Popup/PopupLogin';

function Login({ onSubmit, isSubmitting, isOpen, onClose }) {
  const handleSubmit = (value) => {
    const { email, password } = value;
    onSubmit(email, password);
  };

  return (
    <div className='login'>
      <PopupLogin isOpen={isOpen} onClose={onClose}/>
      <div className='login__container'>
        <Link to='/' className='login__logo' alt='Логотип'/>
        <h2 className='login__title'>Рады видеть!</h2>
        <CustomForm inputs={[
          { name: 'E-mail', field: 'email' },
          { name: 'Пароль', field: 'password' },
        ]} button={'Войти'} onSubmit={handleSubmit} isSubmitting={isSubmitting}/>
        <p className='login__button-subtitle'>Ещё не зарегистрированы? <Link to='/signup' className='login__button-subtitle_orange'>Регистрация</Link></p>
      </div>
    </div>
  );
}

export default Login;
