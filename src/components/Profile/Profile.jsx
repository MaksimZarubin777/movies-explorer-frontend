import React, { useContext, useEffect, useState } from 'react';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useFormikContext,
} from 'formik';
import * as Yup from 'yup';
import CurrentUserContext from '../../context/CurrentUserContext.jsx';
import './Profile.css';

function Profile({ handleUpdateUser, logOut }) {
  const currentUser = useContext(CurrentUserContext);
  const [edit, setEdit] = useState(true);
  // функция разблокировки редактирования
  const handleEdit = () => {
    setEdit(false);
  };

  const initialValues = {
    name: currentUser.data?.name || '',
    email: currentUser.data?.email || '',
  };

  // схема валидации
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Некорректный адрес электронной почты')
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Некорректный адрес электронной почты')
      .required('Email обязателен для заполнения'),
    name: Yup.string().required('Имя обязательно для заполнения').min(2, 'Имя должно содержать не менее 2 символов').max(30, 'Имя должно содержать не более 30 символов'),
  });

  const handleSubmit = (values) => {
    handleUpdateUser(values);
    setEdit(true);
  };

  // настройки кнопки сабмита
  const CustomButton = () => {
    const formik = useFormikContext();
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
      const formValidation = async () => {
        try {
          await validationSchema.validate(formik.values);
          setIsValid(true);
        } catch (error) {
          setIsValid(false);
        }
      };

      formValidation();
    }, [formik.values, validationSchema]);

    return (
      <button
        type="submit"
        className={isValid && formik.dirty ? 'profile__button' : 'profile__button profile__button_disabled'}
        disabled={!isValid && formik.dirty}
      >
        Сохранить
      </button>
    );
  };

  return (
    <div className="profile">
      <h2 className="profile__title">Привет, {currentUser.data.name}!</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="profile__form-edit">
          <div className="profile__form-edit_element">
            <p className="profile__form-edit_title">Имя</p>
            <Field
              type="text"
              name="name"
              className="profile__form-edit_input"
              disabled={edit}
            />
          </div>
          <ErrorMessage name="name" component="div" className="form__error" />
          <div className="profile__form-edit_element">
            <p className="profile__form-edit_title">E-mail</p>
            <Field
              type="email"
              name="email"
              className="profile__form-edit_input"
              disabled={edit}
            />
          </div>
          <ErrorMessage name="email" component="div" className="form__error" />
          {edit ? (
          <>
            <p className="profile__options" onClick={ handleEdit }>Редактировать</p>
            <p className="profile__options" onClick={ logOut }>Выйти из аккаунта</p>
          </>
          ) : (
      <>
        <CustomButton />
      </>
          )}
        </Form>
      </Formik>
    </div>
  );
}

export default Profile;