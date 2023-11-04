import React from 'react';
import BarChart from './BarChart';
import LineChart from './LineChart';
import CardTransaksi from './CardTransaksi';
import ListTransaksi from './listTransaksi';
import { getDataTransaksi } from '../../../utils/dumyDataTransaksi';

function Dashboard() {
  const [dataTransaksi, setDataTransaksi] = React.useState(() => getDataTransaksi());
  return (
    <div className='page-content'>
      <h3>
        Dashboard <span style={{ fontSize: '0.8em', color: 'gray' }}>List</span>
      </h3>
      <div className='card-transaksi'>
        <ListTransaksi dataTransaksi={dataTransaksi} />
        {/* <CardTransaksi />
        <CardTransaksi />
        <CardTransaksi /> */}
      </div>
      <div className='page-dashboar'>
        <BarChart />
        <LineChart />
      </div>
    </div>
  );
}

export default Dashboard;
