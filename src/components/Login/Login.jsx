import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import CustomForm from '../Form/Form.jsx';

function Login({ onSubmit, isSubmitting, isLoggedIn }) {
  const handleSubmit = (value) => {
    const { email, password } = value;
    onSubmit(email, password);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/', { replace: true });
    }
  }, [])

  return (
    <div className='login'>
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
