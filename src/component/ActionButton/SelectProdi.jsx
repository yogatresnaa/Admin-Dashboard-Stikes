import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaSearch } from 'react-icons/fa';

function SelectProdi({data,onProdiFilterChange,value,name=null,firstValue=null}) {
  
  return (
    <div className='d-flex flex-column flex-grow-1'>
       <p style={{fontSize:'0.8rem'}}>Program Studi</p>
            <Form.Select id={name} size="sm" onChange={onProdiFilterChange} value={value} name={name||'majors_id'}>
              <option value=''>{firstValue?firstValue:"Semua"}</option>
              {data.length>0 && data.map((item,index)=>(
              <option value={item.majors_id} key={index}>{item.majors_name}</option>
              ))}
              
            </Form.Select>
    
    </div>
  );
}

export default SelectProdi;
