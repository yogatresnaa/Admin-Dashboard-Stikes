import React from 'react';
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import CardTransaksi from './CardTransaksi';
import ListTransaksi from './components/listTransaksi';
import { getDataTransaksi } from '../../utils/dumyDataTransaksi';

function Dashboard() {
  const [dataTransaksi, setDataTransaksi] = React.useState(() => getDataTransaksi());
  return (
    <div className='page-content'>
      <h3>
        Dashboard <span style={{ fontSize: '0.8em', color: 'gray' }}>List</span>
      </h3>
      <div className='card-transaksi'>
        <ListTransaksi dataTransaksi={dataTransaksi} />
     
      </div>
      <div className='page-dashboar'>
        <BarChart />
        <LineChart />
      </div>
    </div>
  );
}

export default Dashboard;
