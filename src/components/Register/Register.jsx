import './Register.css';
import { Link } from 'react-router-dom';
import Form from '../Form/Form.jsx';

function Register() {
  return (
    <div className='register'>
      <div className='register__container'>
        <Link to='/' className='register__logo' alt='Логотип'/>
        <h2 className='register__title'>Добро пожаловать!</h2>
        <Form inputs={['Имя', 'E-mail', 'Пароль']} button={'Зарегистрироваться'}/>
        <p className='register__button-subtitle'>Уже зарегистрированы? <Link to='/signin' className='register__button-subtitle_orange'>Войти</Link></p>
      </div>
    </div>
  );
}

export default Register;
