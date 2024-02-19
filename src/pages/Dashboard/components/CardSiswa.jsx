import React from 'react'

function Cardsiswa({ title, data, color, icon }) {
    // console.log(IconComponent)

    return (
        <div
            className="transaksi-item d-flex align-items-center gap-2"
            style={{ borderLeft: `5px solid ${color}` }}
        >
            {icon}
            <div className="transaksi-item__text w-100">
                <h3 className="transaksi-item__title-transaksi">{title}</h3>
                <div className="justify-content-center align-items-center flex-1">
                    <p className="transaksi-item__today">
                        <span
                            className="transaksi-item__value"
                            style={{ fontSize: '1.2rem' }}
                        >
                            {data}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Cardsiswa
