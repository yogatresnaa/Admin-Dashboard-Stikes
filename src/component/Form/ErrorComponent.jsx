
import React, { useState } from 'react';
import './style.css'

export default function ErrorComponent({ text, error }) {

  return (
    <div className={`error-wrapper ${error != undefined && 'show'}`}>
      <span>{text}</span>
    </div>
  )
}