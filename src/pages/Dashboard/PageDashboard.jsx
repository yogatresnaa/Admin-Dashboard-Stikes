import React from 'react';
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import './css/Chart.css'
import CardTransaksi from './Components/CardTransaksi';
import { getDataTransaksi } from '../../utils/dumyDataTransaksi';
import { BsFillCalculatorFill, BsWallet2 } from 'react-icons/bs'
import { BiMoney, BiWallet } from 'react-icons/bi'

const color = [
  "#C4FFDD", "#c9c9ff", "#ffd7e1",
  "red", "#fff9d1", "blue",
  "red", "green", "blue",
  "red", "green", "blue",
  "red", "green", "blue",
  "red", "green", "blue",
]

const penerimaanIcon = () => <BsFillCalculatorFill size='lg' color='darkgrey' />
function PageDashboard() {
  const [dataTransaksi, setDataTransaksi] = React.useState(() => getDataTransaksi());
  return (
    <div className='page-content'>
      <h3>
        Dashboard <span style={{ fontSize: '0.8em', color: 'gray' }}>List</span>
      </h3>
      <div className='card-transaksi'>
        <div className='list-data-transaksi'>

          <CardTransaksi key={dataTransaksi[0].id} id={dataTransaksi[0].id} {...dataTransaksi[0]} color={color[0]} icon={<BsFillCalculatorFill color='darkgrey' size={40} />} />
          <CardTransaksi key={dataTransaksi[1].id} id={dataTransaksi[1].id} {...dataTransaksi[1]} color={color[1]} icon={<BiMoney color="darkgrey" size={40} />} />
          <CardTransaksi key={dataTransaksi[2].id} id={dataTransaksi[2].id} {...dataTransaksi[2]} color={color[2]} icon={<BiWallet color="darkgrey" size={40} />} />

        </div>

      </div>
      <div className='page-dashboar'>
        <BarChart />
        <LineChart />
      </div>
    </div>
  );
}

export default PageDashboard;
