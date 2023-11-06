import React from 'react';
import CardTransaksi from './CardTransaksi';

function ListTransaksi({ dataTransaksi, color }) {
  return (
    <div className='list-data-tarnsaksi'>
      {dataTransaksi.map((data, index) => (
        <CardTransaksi key={data.id} id={data.id} {...data} style={{ backgroundColor: { color } }} />
      ))}
    </div>
  );
}

export default ListTransaksi;
