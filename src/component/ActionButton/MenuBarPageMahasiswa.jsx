import React from 'react';
import Button from 'react-bootstrap/Button';
import { FaUpload, FaMobileScreen, FaRegFilePdf } from 'react-icons/fa6';
import { FaRegCalendarPlus } from 'react-icons/fa';
function MenuBarPageMahasiswa() {
  return (
    <>
      <div className='menuBar'>
        <div>
          <Button variant='primary' className='text-white item1'>
            <FaRegCalendarPlus />
            &ensp; Tambah
          </Button>
        </div>
        <div>
          <Button variant='primary' className='text-white item1 text-right'>
            <FaUpload />
            &ensp; Upload Siswa
          </Button>
        </div>
        <div>
          <Button variant='primary' className='text-white item1'>
            <FaMobileScreen />
            &ensp;Kontak Wali Murid
          </Button>
        </div>

        <div>
          <Button variant='primary' className='text-white item1'>
            &ensp; Export Xls
          </Button>
        </div>

        <div>
          <Button variant='primary' className='text-white item1'>
            <FaRegFilePdf />
            &ensp; Cetak Pdf
          </Button>
        </div>
      </div>
    </>
  );
}

export default MenuBarPageMahasiswa;
