import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import CustomForm from '../Form/Form.jsx';

function Register({ onSubmit, isSubmitting, isLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/', { replace: true });
    }
  }, [])

  return (
    <div className='register'>
      <div className='register__container'>
        <Link to='/' className='register__logo' alt='Логотип'/>
        <h2 className='register__title'>Добро пожаловать!</h2>
        <CustomForm inputs={[
          { name: 'Имя', field: 'name' },
          { name: 'E-mail', field: 'email' },
          { name: 'Пароль', field: 'password' },
        ]} button={'Зарегистрироваться'} onSubmit={onSubmit} isSubmitting={isSubmitting}/>
        <p className='register__button-subtitle'>Уже зарегистрированы? <Link to='/signin' className='register__button-subtitle_orange'>Войти</Link></p>
      </div>
    </div>
  );
}

export default Register;
