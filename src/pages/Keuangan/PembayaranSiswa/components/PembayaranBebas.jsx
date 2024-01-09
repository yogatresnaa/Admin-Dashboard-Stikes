import React from 'react';
import DataTable from 'react-data-table-component';
import { pembayaran1 } from '../../../../utils/dumyDataTransaksi';

function PembayaranBebas() {

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
                backgroundColor: '#F8EDFF',
            
        
				
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
        border: 'solid',
        color: 'black'
   
	},
	{
		name: 'Jenis Pembayaran',
		selector: row => row.JenisBayar,
		sortable: true,
         width: '200px',

	},
	{
		name: 'Tagihan',
		selector: row => row.Tagihan,
		sortable: true,
        width: '200px',
	},
  {
		name: 'Diskon',
		selector: row => row.Diskon,
		sortable: true,
        width: '200px',
	},
  {
		name: 'Tagihan-Diskon',
		selector: row => row.TagihanDiskon,
		sortable: true,
        width: '200px',
 
	},
  {
		name: 'Dibayar',
		selector: row => row.Dibayar,
		sortable: true,
        width: '300px',
	},
  {
		name: 'Sisa',
		selector: row => row.Sisa,
		sortable: true,
         width: '300px',
	},
  {
		name: 'Status',
		selector: row => row.Status,
		sortable: true,
        width: '300px',
	},
  {
		name: 'Bayar',
		selector: row => row.Bayar,
		sortable: true,
         width: '300px',
	},
]
  return (
    <div>
              <DataTable
                title="Bebas"
                columns={columns}
                customStyles={customStyles}
                data={pembayaran1}
                dense
              />
    </div>
   
  );
}

export default PembayaranBebas;