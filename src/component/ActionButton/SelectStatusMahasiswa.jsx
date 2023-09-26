import React from 'react';
import Form from 'react-bootstrap/Form';

function SelectStatusMahasiswa() {
  return (
    <>
      <div>
        <Form className='menu-status'>
          <div className='d-flex'>
            <Form.Select>
              <option>Status</option>
              <option value='1'>Aktif</option>
              <option value='2'>Tidak Aktif</option>
              <option value='3'>Tamat</option>
            </Form.Select>
          </div>
        </Form>
      </div>
    </>
  );
}

export default SelectStatusMahasiswa;
