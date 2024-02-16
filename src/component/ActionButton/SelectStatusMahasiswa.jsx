import React from 'react';
import Form from 'react-bootstrap/Form';


function SelectStatusMahasiswa({data,onProdiFilterChange,value}) {
  
  return (
    <div className='d-flex flex-column flex-grow-1 '>
      <p style={{fontSize:'0.8rem'}}>Status Mahasiswa</p>
            <Form.Select size="sm" onChange={onProdiFilterChange} value={value} name='status'>
              <option value=''>Semua</option>
              {data.length>0 && data.map((item,index)=>(
              <option value={index} key={index}>{item}</option>
              ))}
              
            </Form.Select>
    
    </div>
  );
}

export default SelectStatusMahasiswa;
