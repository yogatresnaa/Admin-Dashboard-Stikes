import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaSearch } from 'react-icons/fa';

function SelectStatusMahasiswa({data,onProdiFilterChange,value}) {
  
  return (
    <>
            <Form.Select size="sm" onChange={onProdiFilterChange} value={value} name='status'>
              <option value=''>Semua</option>
              {data.length>0 && data.map((item,index)=>(
              <option value={index} key={index}>{item}</option>
              ))}
              
            </Form.Select>
    
    </>
  );
}

export default SelectStatusMahasiswa;
