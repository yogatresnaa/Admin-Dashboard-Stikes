import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaSearch } from 'react-icons/fa';

function SelectBasicExample() {
  return (
    <>
      <div>
        <Form className='menu-select'>
          <div className=' d-flex'>
            <Form.Select>
              <option>---- Pilih Prodi ----</option>
              <option value='1'>One</option>
              <option value='2'>Two</option>
              <option value='3'>Three</option>
            </Form.Select>
          </div>
          <Button className='select-prodi'>
            <FaSearch /> Search
          </Button>
        </Form>
      </div>
    </>
  );
}

export default SelectBasicExample;
