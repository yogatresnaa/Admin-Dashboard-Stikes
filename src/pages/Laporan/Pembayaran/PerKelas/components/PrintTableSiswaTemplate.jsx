/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import { Table } from "reactstrap";
import { statusSiswa } from "../../../../../utils/CONSTANT";

const PrintTableSiswaComponent = forwardRef(({ data }, ref) => {
  return (
    <div className="print-component px-5 py-2" ref={ref}>
      <h1>Data Siswa</h1>
      <Table>
        <thead>
          <tr>
            <th>No.</th>
            <th>NIS</th>
            <th>NISN</th>
            <th>Nama</th>
            <th>Kelas</th>
            <th>Prodi</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{item.student_nis}</td>
              <td>{item.student_nisn}</td>
              <td>{item.student_full_name}</td>
              <td>{item.class_class_name}</td>
              <td>{item.majors_majors_name}</td>
              <td>{statusSiswa[item.student_status]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
});
export default PrintTableSiswaComponent;
