import React from 'react';
import BarChart from './BarChart';
import LineChart from './LineChart';
import ListTransaksi from './listTransaksi';
import { getDataTransaksi } from '../../../utils/dumyDataTransaksi';

function Dashboard() {
  const color = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'];
  const [dataTransaksi, setDataTransaksi] = React.useState(() => getDataTransaksi());
  return (
    <div className='page-content'>
      <h3>
        Dashboard <span style={{ fontSize: '0.8em', color: 'gray' }}>List</span>
      </h3>
      <div className='card-transaksi'>
        <ListTransaksi dataTransaksi={dataTransaksi} color={color} />
      </div>
      <div className='page-dashboar'>
        <BarChart />
        <LineChart />
      </div>
    </div>
  );
}

export default Dashboard;
