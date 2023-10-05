import React, { useState } from 'react';
import { Col, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './styles/login.css';

import AutoTyping from '../../component/Text/AutoTyping';

import ErrorComponent from '../../component/Form/ErrorComponent';
import FormComponent from '../../component/Form/FormComponent';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PasswordInput from '../../component/Form/PasswordInput';
const initialValues = {
  email: '',
  password: '',
};

function Login() {
  const loginSchema = Yup.object().shape({
    email: Yup.string().required('Email harus diisi').email(),
    password: Yup.string().required('Password harus diisi'),
  });

  const onSubmitHandler = (formBody, { resetForm }) => {};

  return (
    <div className='container-login'>
      <div className='left-wrapper'>
        <div className='logo-wrapper'>
          <img src='./src/assets/images/logo.jpeg' alt='' />
        </div>
      </div>
      <div className='right-wrapper'>
        <div className='right__inner-wrapper'>
          <div className='login-title mb-3'>
            <AutoTyping text='Welcome Back . .' delay={300} />
          </div>
          <h1 className='login-subtitle'>Silahkan Login terlebih dahulu</h1>
          <div className='form-wrapper'>
            <Formik enableReinitialize validateOnBlur={false} validateOnChange={false} initialValues={initialValues} onSubmit={onSubmitHandler} validationSchema={loginSchema}>
              {({ handleChange, handleSubmit, setFieldValue, handleReset, values, errors }) => (
                <Form>
                  <FormComponent id='email' name='email' text='Email' placeholder='Masukkan Email' type='email' error={errors} handler={handleChange('email')} value={values.email} />
                  <PasswordInput error={errors} handler={handleChange('password')} value={values.password} text='Password' />

                  <Button color='primary' className='button-login' onClick={handleSubmit}>
                    Login
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
