import React from 'react';
import Form from 'react-bootstrap/Form';

function SelectUnitKelas() {
  return (
    <>
      <div>
        <Form className='menu-kelas'>
          <div className='d-flex'>
            <Form.Select>
              <option>Pilih Unit Kelas</option>
              <option value='1'>One</option>
              <option value='2'>Two</option>
              <option value='3'>Three</option>
            </Form.Select>
          </div>
        </Form>
      </div>
    </>
  );
}

export default SelectUnitKelas;
