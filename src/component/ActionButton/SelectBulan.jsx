import React from 'react'
import Form from 'react-bootstrap/Form'

function SelectBulan() {
    return (
        <div className="d-flex flex-column flex-grow-1 ">
            <p style={{ fontSize: '0.8rem' }}></p>
            <Form.Select size="sm" onChange={''} value={''} name="status">
                <option>===pilih bulan===</option>
                <option value="1">Juli</option>
                <option value="2">Agustus</option>
                <option value="3">September</option>
                <option value="4">Oktober</option>
                <option value="5">November</option>
                <option value="6">Desember</option>
                <option value="7">Januari</option>
                <option value="8">Februari</option>
                <option value="9">Maret</option>
                <option value="10">April</option>
                <option value="11">Mei</option>
                <option value="12">Juni</option>
            </Form.Select>
        </div>
    )
}

export default SelectBulan
