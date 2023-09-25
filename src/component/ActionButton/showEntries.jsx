import React from 'react';
import Form from 'react-bootstrap/Form';

function ShowDataEnteris() {
  return (
    <>
      <div>
        <Form className='show-data'>
          <p>Show &nbsp;</p>
          <div className='d-flex'>
            <Form.Select>
              <option>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
            </Form.Select>
          </div>
          <p>&nbsp; Entries</p>
        </Form>
      </div>
    </>
  );
}

export default ShowDataEnteris;
