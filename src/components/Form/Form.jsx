import React, { useEffect, useState } from 'react';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useFormikContext,
} from 'formik';
import * as Yup from 'yup';
import './Form.css';
import { useLocation } from 'react-router-dom';

function CustomForm({
  inputs,
  button,
  onSubmit,
  isSubmitting,
}) {
  const initialValues = {};
  const location = useLocation();
  inputs.forEach((input) => {
    initialValues[input.field] = '';
  });

  // схема валидации формы
  const validationSchema = location.pathname === '/signup' ? Yup.object().shape({
    email: Yup.string()
      .email('Некорректный адрес электронной почты')
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Некорректный адрес электронной почты')
      .required('Email обязателен для заполнения'),
    password: Yup.string().required('Пароль обязателен для заполнения'),
    name: Yup.string().required('Имя обязательно для заполнения').min(2, 'Имя должно содержать не менее 2 символов').max(30, 'Имя должно содержать не более 30 символов'),
  }) : Yup.object().shape({
    email: Yup.string()
      .email('Некорректный адрес электронной почты')
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Некорректный адрес электронной почты')
      .required('Email обязателен для заполнения'),
    password: Yup.string().required('Пароль обязателен для заполнения'),
  });

  const handleSubmit = (values) => {
    onSubmit(values);
  };

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
        className={isValid && !isSubmitting ? 'form__submit-button' : 'form__submit-button_disabled'}
        disabled={!isValid || isSubmitting}
      >
        {button}
      </button>
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="form">
        {inputs.map((input) => (
          <div key={input.field}>
            <p className="form__input_title">{input.name}</p>
            <Field
              type={input.field === 'password' ? 'password' : 'text'}
              name={input.field}
              className="form__input"
              placeholder=""
            />
            <ErrorMessage
              name={input.field}
              component="div"
              className="form__error"
            />
          </div>
        ))}
        <CustomButton />
      </Form>
    </Formik>
  );
}

export default CustomForm;
