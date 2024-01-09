import React from 'react';
import Button from 'react-bootstrap/Button';

function CetakButton() {
  return (
    <div className='cetak-button'>
      <Button variant="primary" style={{width: '250px', margin: '10px'}}>Cetak</Button>
      <Button variant="primary" style={{width: '250px', margin: '10px'}}>Cetak Semua Tagihan</Button>{' '}   

    </div>
  );
}

export default CetakButton;