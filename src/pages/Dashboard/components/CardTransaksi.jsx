import React from 'react'

function CardTransaksi({ title, today, thisMonth, thisYear, color, icon }) {
    // console.log(IconComponent)

    return (
        <div
            className="transaksi-item d-flex align-items-center gap-3"
            style={{
                borderLeft: `5px solid white`,
                backgroundColor: `${color}`,
            }}
        >
            <div className="flex-1">{icon}</div>
            <div className="transaksi-item__text w-100">
                <h3 className="transaksi-item__title-transaksi">{title}</h3>
                <div className="justify-content-center align-items-center">
                    <p className="transaksi-item__today">
                        <span className="transaksi-item__key">Hari ini</span>
                        <span className="transaksi-item__colon"> : </span>
                        <span className="transaksi-item__value"> {today} </span>
                    </p>
                    <p className="transaksi-item__this-mounth">
                        <span className="transaksi-item__key">Bulan ini</span>
                        <span className="transaksi-item__colon"> : </span>
                        <span className="transaksi-item__value">
                            {' '}
                            {thisMonth}{' '}
                        </span>
                    </p>
                    <p className="transaksi-item__this-year">
                        {' '}
                        <span className="transaksi-item__key">Tahun ini</span>
                        <span className="transaksi-item__colon"> : </span>
                        <span className="transaksi-item__value">
                            {' '}
                            {thisYear}{' '}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CardTransaksi
