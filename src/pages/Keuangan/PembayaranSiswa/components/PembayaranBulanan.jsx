import React from 'react';
import DataTable from 'react-data-table-component';
import { pembayaran1 } from '../../../../utils/dumyDataTransaksi';

function PembayaranBulanan() {

  const customStyles = {
	header: {
		style: {
			minHeight: '100px',
		},
	},
	headRow: {
		style: {
			borderTopStyle: 'solid',
			borderTopWidth: '1px',
			
		},
	},
	headCells: {
		style: {
			'&:not(:last-of-type)': {
				borderRightStyle: 'solid',
				borderRightWidth: '1px',
        borderBottomtWidth: '1px',
        minHeight: '50px',
        backgroundColor: '#F8EDFF'
        
				
			},
		},
	},
	cells: {
		style: {
			'&:not(:last-of-type)': {
				borderRightStyle: 'solid',
				borderRightWidth: '1px',
        
				
			},
		},
	},
};
 

  const columns = [
	{
	name: 'No',
	selector: (row,index) => index + 1,
	sortable: true,
    width: '70px',
   
	},
	{
	name: 'Nama Pembayran',
	selector: row => row.NamaPembayaran,
	sortable: true,
    width: '200px',

	},
	{
	name: 'Sisa Tagihan',
	selector: row => row.SisaTagihan,
	sortable: true,
    width: '200px',
	},
  {
	name: 'Juli',
	selector: row => row.Juli,
	sortable: true,
    width: '200px',
	},
  {
	name: 'Agustus',
	selector: row => row.SisaTagihan,
	sortable: true,
    width: '200px',
 
	},
  {
	name: 'September',
	selector: row => row.Agustus,
	sortable: true,
    width: '300px',
	},
  {
	name: 'Oktober',
	selector: row => row.Oktober,
	sortable: true,
    width: '300px',
	},
  {
	name: 'November',
	selector: row => row.November,
	sortable: true,
    width: '300px',
	},
  {
	name: 'Desember',
	selector: row => row.Desember,
	sortable: true,
    width: '300px',
	},

    {
	name: 'Januari',
	selector: row => row.Januari,
	sortable: true,
    width: '200px',
	},
  {
	name: 'Februri',
	selector: row => row.Februri,
	sortable: true,
    width: '200px',
	},
  {
	name: 'Maret',
	selector: row => row.Maret,
	sortable: true,
    width: '200px',
	},
  {
	name: 'April',
	selector: row => row.April,
	sortable: true,
    width: '200px',
	},
  {
	name: 'Mei',
	selector: row => row.Mei,
	sortable: true,
    width: '200px',
	},
  {
	name: 'Juni',
	selector: row => row.Juni,
	sortable: true,
    width: '200px',
	},
]
  return (
    <div>
              <DataTable
                title="Bulanan"
                columns={columns}
                customStyles={customStyles}
                data={pembayaran1}
                dense
              />
    </div>
   
  );
}

export default PembayaranBulanan;