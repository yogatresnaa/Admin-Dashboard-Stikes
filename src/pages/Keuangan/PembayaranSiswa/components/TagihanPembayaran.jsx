import React from 'react';
import DataTable from 'react-data-table-component';
import { tagihanPembayaran } from '../../../../utils/dumyDataTransaksi';

function TagihanPembayaran() {

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
                // backgroundColor: '#F8EDFF',
        
				
			},
		},
	},
	cells: {
		style: {
			'&:not(:last-of-type)': {
				borderRightStyle: 'solid',
				borderRightWidth: '1px',
                // borderLeftStyle: 'solid',
                // borderLeftWidth: '1px',
               
         
				
			},
		},
	},
};
 

  const columns = [

    {
	name: 'Rincian Tagihan',
	selector: row => row.RincianTagihan,
	sortable: true,

	},
	{
	name: 'Nominal',
	selector: row => row.Nominal,
	sortable: true,

    

	},

  
]
  return (
    <div>
              <DataTable
                title="History Pembayaran"
                columns={columns}
                customStyles={customStyles}
                data={tagihanPembayaran}
         
              />
    </div>
   
  );
}

export default TagihanPembayaran;