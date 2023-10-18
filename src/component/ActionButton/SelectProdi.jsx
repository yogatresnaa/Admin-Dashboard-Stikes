import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaSearch } from 'react-icons/fa';

function SelectProdi({data,onProdiFilterChange,value}) {
  
  return (
    <>
       
            <Form.Select size="sm" onChange={onProdiFilterChange} value={value} name='majors_id'>
              <option value=''>Semua</option>
              {data.length>0 && data.map((item,index)=>(
              <option value={item.majors_id} key={index}>{item.majors_name}</option>
              ))}
              
            </Form.Select>
    
    </>
  );
}

export default SelectProdi;
