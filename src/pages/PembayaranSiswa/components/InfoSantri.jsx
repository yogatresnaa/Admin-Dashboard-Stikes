import React from 'react'

function InformasiSantri({ dataValue }) {
    console.log(dataValue)
    return (
        <div className="data-santri">
            <table>
                <tr>
                    <td>Tahun Ajaran</td>
                    <td className="colon">:</td>
                    <td>{dataValue?.period} </td>
                </tr>
                <tr>
                    <td>NIS</td>
                    <td className="colon">:</td>
                    <td>{dataValue?.student_nis}</td>
                </tr>

                <tr>
                    <td>Nama Siswa</td>
                    <td className="colon">:</td>
                    <td>{dataValue?.student_full_name}</td>
                </tr>
                <tr>
                    <td>Unit Sekolah</td>
                    <td className="colon">:</td>
                    <td>SMK</td>
                </tr>
                <tr>
                    <td>Kelas</td>
                    <td className="colon">:</td>
                    <td> {dataValue?.class_class_name}</td>
                </tr>
                <tr>
                    <td>Whatsapp Orang Tua</td>
                    <td className="colon">:</td>
                    <td>{dataValue?.student_parent_phone}</td>
                </tr>
            </table>
        </div>
    )
}

export default InformasiSantri
