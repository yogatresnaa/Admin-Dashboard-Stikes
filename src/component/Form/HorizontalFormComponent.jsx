
import React, { useState } from 'react';
import { Col, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import ErrorComponent from './ErrorComponent';

export default function HorizontalFormComponent({ onEnterClickHandler = null, onChangeHandler, id, name, placeholder, type, handler, value, text, error, disabled = false }) {

  return (
    <FormGroup>
      <div className='d-flex gap-4'>
        <label className='label-form flex-1 text-start align-self-center'>{text}</label>
        <Input className='flex-2'
          id={id}
          name={name}
          placeholder={placeholder}
          type={type}
          onKeyDown={onEnterClickHandler ? (e) => onEnterClickHandler(e, onChangeHandler) : () => { }}
          disabled={disabled}
          value={value}
          onChange={handler}
          invalid={error[name] !== undefined} />

      </div>

      <ErrorComponent text={error[name]} error={error[name]} />

    </FormGroup>
  )
}