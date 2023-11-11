import { Table } from "reactstrap";
import DetailTextItem from "./DetailTextItem";
import '../css/detail-text.css'
import { dateConvert } from "../../../../../utils/helper";
export default function DetailText({ data }) {
  return (
    <div className="d-flex flex-column">
        <DetailTextItem title="NIS Siswa" value={data.student_nis}/>
        <DetailTextItem title="NISN Siswa" value={data.student_nisn}/>
        <DetailTextItem title="Nama Siswa" value={data.student_full_name}/>
        <DetailTextItem title="Jenis Kelamin" value={data.student_gender =="P"?"Perempuan": "Laki-laki"}/>
        <DetailTextItem title="Tempat,Tanggal Lahir" value={`${data.student_born_place}, ${dateConvert(data.student_born_date)}` }/>
        <DetailTextItem title="Hobi" value={data.student_hobby }/>
        <DetailTextItem title="No. Handphone" value={data.student_phone }/>
        <DetailTextItem title="Alamat" value={data.student_address }/>
        <DetailTextItem title="Nama Ibu Kandung" value={data.student_name_of_mother }/>
        <DetailTextItem title="Nama Ayah Kandung" value={data.student_name_of_father }/>
        <DetailTextItem title="Program Studi" value={data.majors_majors_name }/>
        <DetailTextItem title="Kelas" value={data.class_class_name }/>
    </div>
  );
}
