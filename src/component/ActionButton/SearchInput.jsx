import React from 'react';
import Form from 'react-bootstrap/Form';

function SearchInput() {
  return (
    <>
      <div className='input-search'>
        <Form.Control type='text' className='' placeholder='Search...' readOnly />
      </div>
    </>
  );
}

export default SearchInput;
