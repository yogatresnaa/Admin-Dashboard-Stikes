import React from "react";

function CardTransaksi({ title, toDay, thisMonth, thisYear, color, icon }) {
  // console.log(IconComponent)
  console.log('aaa')

  return (
    <div className="transaksi-item d-flex align-items-center gap-2" style={{ borderLeft: `5px solid ${color}` }}>
      {icon}
      <div className="transaksi-item__text w-100">

        <h3 className="transaksi-item__title-transaksi">{title}</h3>
        <p className="transaksi-item__today">
          <span className="transaksi-item__key">Hari ini</span>
          <span className="transaksi-item__colon"> : </span>
          <span className="transaksi-item__value"> {toDay} </span>
        </p>
        <p className="transaksi-item__this-mounth">
          <span className="transaksi-item__key">Bulan ini</span>
          <span className="transaksi-item__colon"> : </span>
          <span className="transaksi-item__value"> {thisMonth} </span>

        </p>
        <p className="transaksi-item__this-year"> <span className="transaksi-item__key">Tahun ini</span>
          <span className="transaksi-item__colon"> : </span>
          <span className="transaksi-item__value"> {thisYear} </span>
        </p>
      </div>
    </div>
  );
}

export default CardTransaksi;
