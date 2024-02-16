import React from 'react';
import Form from 'react-bootstrap/Form';

function JenisPembayaran() {
  return (
    <div className='d-flex flex-column flex-grow-1 '>
        <p style={{fontSize:'0.8rem'}}>Jenis Pembayaran</p>
        <Form.Select size="sm" onChange={''} value={''} name='status'>
            <option>Pilih Tagihan</option>
            <option value="1">LKS SMK</option>
    </Form.Select>
    </div>
   
  );
}

export default JenisPembayaran;