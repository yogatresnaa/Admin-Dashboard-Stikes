import React from 'react';
import Button from 'react-bootstrap/Button';
import { FaUpload, FaMobileScreen, FaRegFilePdf } from 'react-icons/fa6';

function MenuBarPageMahasiswa() {
  return (
    <>
      <div>
        <Button variant='primary' className='text-white'>
          <FaUpload />
          &ensp; Upload Siswa
        </Button>
      </div>
      <div>
        <Button variant='primary' className='text-white'>
          <FaMobileScreen />
          &ensp; HP Orang Tua Murid
        </Button>
      </div>

      <div>
        <Button variant='primary' className='text-white'>
          &ensp; Export Xls
        </Button>
      </div>

      <div>
        <Button variant='primary' className='text-white'>
          <FaRegFilePdf />
          &ensp; Cetak Pdf
        </Button>
      </div>
    </>
  );
}

export default MenuBarPageMahasiswa;
