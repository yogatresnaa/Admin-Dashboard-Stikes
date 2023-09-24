import React from 'react';
import Button from 'react-bootstrap/Button';
import { FaRegCalendarPlus } from 'react-icons/fa';

function AddAction() {
  return (
    <>
      <Button variant='primary'>
        <FaRegCalendarPlus />
        &ensp; Tambah
      </Button>
    </>
  );
}

export default AddAction;
