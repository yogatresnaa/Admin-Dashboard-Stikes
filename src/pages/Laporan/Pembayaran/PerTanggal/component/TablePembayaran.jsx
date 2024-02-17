import React from 'react';
import Table from 'react-bootstrap/Table';

function TablePembayaran() {
  return (
    <div>
            <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>No</th>
          <th>Tanggal</th>
          <th>NIS</th>
          <th>Nama</th>
          <th>Nominal</th>
          <th>Keterangan</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>20-3-2024</td>
          <td>12345</td>
          <td>Zakia</td>
          <td>0</td>
          <td></td>
        </tr>
        <tr>

          <td colSpan={4}>Total Pembayaran</td>
          <td colSpan={2}> Rp. 0</td>
        </tr>
      </tbody>
    </Table>
    </div>
    
  );
}

export default TablePembayaran;