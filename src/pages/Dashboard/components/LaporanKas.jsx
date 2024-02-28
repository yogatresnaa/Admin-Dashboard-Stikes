import React from 'react'
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
ChartJS.register(CategoryScale, LinearScale, BarElement)

function LaporanKas() {
    const data = {
        labels: ['Pemasukan', 'Pengeluaran', 'Saldo'],
        datasets: [
            {
                label: 'Laporan Kas Tiap Unit',
                data: [12, 19, 3, 5, 2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    let options = {
        maintainAspectRatio: false,
        scales: {},
        legend: {
            labels: {
                fontSize: 25,
            },
        },
    }
    return (
        <div className="Bar-chart">
            <Bar data={data} height={300} options={options} />
        </div>
    )
}
export default LaporanKas
