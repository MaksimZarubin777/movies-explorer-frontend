import './Login.css';
import { Link } from 'react-router-dom';
import Form from '../Form/Form.jsx';

function Login() {
  return (
    <div className='login'>
      <div className='login__container'>
        <Link to='/' className='login__logo' alt='Логотип'/>
        <h2 className='login__title'>Рады видеть!</h2>
        <Form inputs={['E-mail', 'Пароль']} button={'Войти'} />
        <p className='login__button-subtitle'>Ещё не зарегистрированы? <Link to='/signup' className='login__button-subtitle_orange'>Регистрация</Link></p>
      </div>
    </div>
  );
}

export default Login;
