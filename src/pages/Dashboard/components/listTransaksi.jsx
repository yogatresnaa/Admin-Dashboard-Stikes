import React from 'react';
import CardTransaksi from './CardTransaksi';

function ListTransaksi({ dataTransaksi }) {
  return (
    <div className='list-data-tarnsaksi'>
      {dataTransaksi.map((data) => (
        <CardTransaksi key={data.id} id={data.id} {...data} />
      ))}
    </div>
  );
}

export default ListTransaksi;
