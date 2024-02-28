import React, { useState } from 'react'
import { Col, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import './style.css'

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import ErrorComponent from './ErrorComponent'

export default function PasswordInput({ handler, value, text, error }) {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <FormGroup>
            <Label for="password">{text}</Label>
            <div className="password-wrapper">
                <Input
                    onChange={handler}
                    id="password"
                    name="password"
                    value={value}
                    placeholder="Masukkan Password"
                    type={isVisible ? 'text' : 'password'}
                />
                {isVisible ? (
                    <AiFillEye
                        className="eye-icon"
                        size={20}
                        onClick={() => setIsVisible(!isVisible)}
                    />
                ) : (
                    <AiFillEyeInvisible
                        className="eye-icon"
                        size={20}
                        onClick={() => setIsVisible(!isVisible)}
                    />
                )}
            </div>
            <ErrorComponent text={error.password} error={error.password} />
        </FormGroup>
    )
}
