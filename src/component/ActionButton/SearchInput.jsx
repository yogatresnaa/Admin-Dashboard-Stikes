import React from 'react';
import Form from 'react-bootstrap/Form';

function SearchInput({filterText,setFilterText}) {
  return (
    <>
      <div className='input-search'>
        <Form.Control type='text' placeholder='Search...' value={filterText} onChange={setFilterText} />
      </div>
    </>
  );
}

export default SearchInput;
