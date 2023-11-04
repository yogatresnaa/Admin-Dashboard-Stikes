import React from 'react';

function CardTransaksi({ title, toDay, thisMonth, thisYear,color, }) {
  return (
    <div className='transaksi-item' style={{backgroundColor:color}}>
      <h3 className='transaksi-item__title-transaksi'>{title}</h3>
      <p className='transaksi-item__today'>Hari ini : {toDay}</p>
      <p className='transaksi-item__this-mounth'>Bulan ini : {thisMonth}</p>
      <p className='transaksi-item__this-year'>Tahun ini : {thisYear}</p>
    </div>
  );
}

export default CardTransaksi;
