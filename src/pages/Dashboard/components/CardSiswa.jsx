import React from 'react'

function Cardsiswa({ title, data, color, icon }) {
    // console.log(IconComponent)

    return (
        <div
            className="transaksi-item d-flex flex-column align-items-center "
            style={{ borderLeft: `5px solid white `, background: `${color}` }}
        >
            <div className=" d-flex flex-row justify-content-between align-items-center m-0 flex-1 w-100">
                <div className="flex-1">{icon}</div>
                <div className="transaksi-item__text w-100">
                    <div className="justify-content-start align-items-center flex-1 d-flex flex-column">
                        <h3 className="transaksi-item__title-transaksi">
                            {title}
                        </h3>
                        <p className="transaksi-item__today text-center">
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
        </div>
    )
}

export default Cardsiswa
