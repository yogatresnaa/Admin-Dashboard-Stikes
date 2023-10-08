
import React, { useState } from 'react';
import { Col, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import ErrorComponent from './ErrorComponent';

export default function FormComponent({ id, name, placeholder, type, handler,value,text,error }) {
   
    return (
    <FormGroup>
        <Label for={id}>
            {text}
        </Label>
        <Input
            id={id}
            name={name}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={handler}
            invalid={error[name] !== undefined}
        />
       <ErrorComponent text={error[name]} error={error[name] }/> 

    </FormGroup>
    )
}