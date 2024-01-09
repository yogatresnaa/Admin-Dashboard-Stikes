import React from 'react';
import DataTable from 'react-data-table-component';
import { transaksiPembayaran } from '../../../../utils/dumyDataTransaksi';

function TransaksiPembayaran() {

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
                // backgroundColor: '#F8EDFF'
        
				
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
	name: 'No. Ref',
	selector: row => row.NoRef,
	sortable: true,
    width: '200px',

	},
	{
	name: 'Tanggal',
	selector: row => row.Tanggal,
	sortable: true,
    width: '200px',
	},
  {
	name: 'Pembayaran',
	selector: row => row.Pembayaran,
	sortable: true,
    width: '200px',
	},
  {
	name: 'Nominal',
	selector: row => row.Nominal,
	sortable: true,
    width: '200px',
	},
]
  return (
    <div>
              <DataTable
                title="Transaksi Pembayaran"
                columns={columns}
                customStyles={customStyles}
                data={transaksiPembayaran}
             
              />
    </div>
   
  );
}

export default TransaksiPembayaran;