import React from 'react';
import Button from 'react-bootstrap/Button';
import { FaRegCalendarPlus } from 'react-icons/fa';

function AddAction({onClickHandler}) {
  return (
   
      <div>
        <Button variant='dark' onClick={onClickHandler}>
          <FaRegCalendarPlus />
          &ensp; Tambah
        </Button>
      </div>
   
  );
}

export default AddAction;
