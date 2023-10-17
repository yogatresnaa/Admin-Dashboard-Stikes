import React from 'react';
import Button from 'react-bootstrap/Button';
import { FaCalendarPlus } from 'react-icons/fa';

function AddAction({ onClickHandler }) {
  return (
    <div>
      <Button variant='dark' className='d-flex text-white align-items-center' onClick={onClickHandler}>
        <FaCalendarPlus />
        &ensp; Tambah
      </Button>
    </div>
  );
}

export default AddAction;
