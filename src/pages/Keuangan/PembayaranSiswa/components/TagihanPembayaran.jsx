import React from 'react'
import DataTable from 'react-data-table-component'
import { tagihanPembayaran } from '../../../../utils/dumyDataTransaksi'
import { dateConvert, rupiahConvert } from '../../../../utils/helper'
import { Button } from 'reactstrap'

function TagihanPembayaran({ data, onClickCetakTagihanPembayaranHandler }) {
    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
            }}
        >
            <Button
                color="danger"
                size="sm"
                onClick={onClickCetakTagihanPembayaranHandler}
                style={{ alignSelf: 'flex-end', marginRight: '1rem' }}
            >
                Cetak Tagihan
            </Button>
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    maxHeight: '300px',
                    overflow: 'scroll',
                }}
            >
                <table className="history-pembayaran-table">
                    <thead>
                        <th>Rincian Tagihan</th>
                        <th>Nominal</th>
                    </thead>
                    <tbody>
                        {data.monthly_type?.map((item) =>
                            item.monthly_payment.map((itemDetail) => (
                                <tr key={itemDetail.detail_payment_rate_id}>
                                    <td>
                                        {item.pos_pay_name}-{item.period_start}/
                                        {item.period_end} (
                                        {itemDetail.month_name})
                                    </td>
                                    <td>
                                        {rupiahConvert(
                                            itemDetail.payment_rate_bill
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                        {data.free_type?.map((item) =>
                            item.detail_payment.map((itemDetail) => (
                                <tr key={itemDetail.detail_payment_rate_id}>
                                    <td>
                                        {item.pos_pay_name}-{item.period_start}/
                                        {item.period_end} ({item.payment_type})
                                    </td>

<<<<<<< HEAD
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
=======
                                    <td>
                                        {rupiahConvert(
                                            itemDetail.payment_rate_bill
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-between">
                <p style={{ flex: 2, fontSize: '0.8rem' }}>Total</p>
                <p style={{ flex: 1, fontSize: '0.8rem', fontWeight: 'bold' }}>
                    {rupiahConvert(data.total_tagihan)}
                </p>
            </div>
        </div>
    )
>>>>>>> d894630831aac458fdc2c70bf6206a70b16ba451
}

export default TagihanPembayaran
