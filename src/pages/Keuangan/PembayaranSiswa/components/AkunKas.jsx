import React from 'react';
import Form from 'react-bootstrap/Form';

function AkunKas() {
  return (
    <Form.Select aria-label="Default select example">
      <option>Pilih Akun Kas</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
  );
}

export default AkunKas;