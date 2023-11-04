import React from 'react';
import CardTransaksi from './CardTransaksi';


const color=[
  "red","green","blue",
  "red","green","blue",
  "red","green","blue",
  "red","green","blue",
  "red","green","blue",
  "red","green","blue",
]
function ListTransaksi({ dataTransaksi }) {
  return (
    <div className='list-data-tarnsaksi'>
      {dataTransaksi.map((data,index) => (
        <CardTransaksi key={data.id} id={data.id} {...data} color={color[index]} />
      ))}
    </div>
  );
}

export default ListTransaksi;
