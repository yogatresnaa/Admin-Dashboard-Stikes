
import React, { useState } from 'react';
import { Col, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './styles/login.css';
import AutoTyping from '../../component/Text/AutoTyping';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
function Login() {
    const [isVisible, setIsVisible] = useState(false)



    return (
        <div className="container-login">

            <div className='left-wrapper' >
                <div className='login-title'>

                    <AutoTyping text="Welcome Back . ." delay={300} />
                </div>
            </div>
            <div className='right-wrapper'>
                <div className='right__inner-wrapper'>
                    <h1 className='login-subtitle'>
                        Login
                    </h1>
                    <div className='form-wrapper'>
                        <Form>
                            <FormGroup>
                                <Label for="exampleEmail">
                                    Email
                                </Label>
                                <Input
                                    id="exampleEmail"
                                    name="email"
                                    placeholder="Masukkan Email"
                                    type="email"
                                />

                            </FormGroup>
                            <FormGroup>
                                <Label for="password">
                                    Password
                                </Label>
                                <div className='password-wrapper'>
                                    <Input

                                        id="password"
                                        name="password"
                                        placeholder="Masukkan Password"
                                        type={isVisible ? "text" : "password"}
                                    />
                                    {isVisible ?
                                        <AiFillEye className='eye-icon' size={20} onClick={() => setIsVisible(!isVisible)} />
                                        : <AiFillEyeInvisible className='eye-icon' size={20} onClick={() => setIsVisible(!isVisible)} />
                                    }
                                </div>

                            </FormGroup>
                            <Button color="primary" className='button-login'>
                                Login
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>


        </div>
    )
}
export default Login;