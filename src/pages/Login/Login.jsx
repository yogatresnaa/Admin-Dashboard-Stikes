import React, { useState } from "react";
import { Col, Row, Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./styles/login.css";

import AutoTyping from "../../component/Text/AutoTyping";
import logo from '../../assets/images/logo.jpeg'
import ErrorComponent from "../../component/Form/ErrorComponent";
import FormComponent from "../../component/Form/FormComponent";
import { Formik } from "formik";
import * as Yup from "yup";
import PasswordInput from "../../component/Form/PasswordInput";
import { loginUser } from "../../utils/http";
import { useEffect } from "react";
import { requestWrapper } from "../../utils/helper";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUserActionCreator } from "../../redux/actions/authAction";
import { useNavigate } from "react-router-dom";
const initialValues = {
  email: "",
  password: "",
};

function Login() {
  const dispatch = useDispatch();
  const dataUser = useSelector(({ authState }) => authState);
  const navigate = useNavigate();

  const loginSchema = Yup.object().shape({
    email: Yup.string().required("Email harus diisi").email(),
    password: Yup.string().required("Password harus diisi"),
  });

  const onSubmitHandler = async (formBody, { resetForm }) => {
   await requestWrapper(
    ()=>dispatch(loginUserActionCreator(formBody)),
      toast
    );
  
  };
  useEffect(() => {
    if (dataUser.isFulfilled) {
      toast.success(dataUser.message, {
        theme: "colored",
      });
      const timeout = setTimeout(() => {
        navigate("/");
      }, 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [dataUser.isFulfilled, dataUser.message, navigate]);

  return (
    <div className="container-login">
      <ToastContainer />
      <div className="left-wrapper">
        <div className="logo-wrapper">
          <img src={logo} alt="" />
        </div>
      </div>
      <div className="right-wrapper">
        <div className="right__inner-wrapper">
          <div className="login-title mb-3">
            <AutoTyping text="Welcome Back . ." delay={300} />
          </div>
          <h1 className="login-subtitle">Silahkan Login terlebih dahulu</h1>
          <div className="form-wrapper">
            <Formik
              enableReinitialize
              validateOnBlur={false}
              validateOnChange={false}
              initialValues={initialValues}
              onSubmit={onSubmitHandler}
              validationSchema={loginSchema}
            >
              {({
                handleChange,
                handleSubmit,
                setFieldValue,
                handleReset,
                values,
                errors,
              }) => (
                <Form
                  onSubmit={handleSubmit}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                >
                  <FormComponent
                    id="email"
                    name="email"
                    text="Email"
                    placeholder="Masukkan Email"
                    type="email"
                    error={errors}
                    handler={handleChange("email")}
                    value={values.email}
                  />
                  <PasswordInput
                    error={errors}
                    handler={handleChange("password")}
                    value={values.password}
                    text="Password"
                  />

                  <Button
                    color="primary"
                    className="button-login"
                    onClick={handleSubmit}
                  >
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
