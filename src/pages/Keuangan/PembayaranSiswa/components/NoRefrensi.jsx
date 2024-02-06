import React from 'react';
import Form from 'react-bootstrap/Form';

function NoRef({text}) {
  return (
    <>
      <div className='input-text'>
        <Form.Control size='sm' type='text' onChange={text} />
      </div>
    </>
  );
}

export default NoRef;