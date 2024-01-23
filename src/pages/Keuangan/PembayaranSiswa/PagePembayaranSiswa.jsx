import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "reactstrap";
import ItemImageSiswa from "./components/ImageSiswa";
import PembayaranBulanan from "./components/PembayaranBulanan";
import PembayaranBebas from "./components/PembayaranBebas";
import SelectTahunAjaran from '../../../component/ActionButton/SelectTahunAjaran';
import SearchInput from "../../../component/ActionButton/SearchInput";
import useRequest from '../../../customHooks/useRequest';
import { getAllTahunAjaran } from '../../../utils/http';
import { useSelector } from "react-redux";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import queryString from "query-string";
import InformasiSantri from "./components/InfoSantri";
import TransaksiPembayaran from "./components/TransaksiPembayaran";
import HistoryPembayaran from "./components/HistoryPembayaran";
import TagihanPembayaran from "./components/TagihanPembayaran";
import Kalkulator from "./components/Kalkulator";
import PilihNoRefrensi from "./components/cetakBuktiPembayaran";
import CetakButton from "./components/ButtonCetak";
import NoRef from "./components/NoRefrensi";
import AkunKas from "./components/AkunKas";


function PagePembayaranSiswa(){
  const {
    data: TahunAjaran,
    setData: setTahunAjaran,
    getData: getDataTahunAjaran,
  } = useRequest();

   const dataUser = useSelector(({ authState }) => authState.data);
     const [queryFilter, setQueryFilter] = useState({
    class_id: "",
    status: "",
    majors_id: "",
  });
    useEffect(() => {
    const query = queryString.stringify(queryFilter);
    console.log("a");
    getDataTahunAjaran(() => getAllTahunAjaran(dataUser.token));
  }, []);


    const onQueryFilterChange = (e) => {
    setQueryFilter((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
    return(
        <div className='page-content'>
            <h3>
                Pembayaran Siswa <span style={{ fontSize: '0.8em', color: 'gray' }}>List</span>
            </h3>

            <div className='table-content'>
                <div className="pembayaran-siswa">
                    <h6 className="filter-data">Filter Data Pembayaran SIswa</h6>
                        <div className="d-flex flex-row gap-5 justify-content-start align-items-center mt-2 thn-ajrn" >
                            <SelectTahunAjaran 
                            data={TahunAjaran.data}
                            onProdiFilterChange={onQueryFilterChange}
                            value={queryFilter}
                            />    
                            <p style={{width:'200px'}}>Cari Nis Siswa <SearchInput /></p>                         
                        </div>
                </div>

                <div className="info-santri">
                  <h6>Informasi Siswa</h6>
                  <InformasiSantri />
                  <ItemImageSiswa />
                </div>

                <div className="jenis-bayar">
                  <h6>Jenis Pembayaran</h6>
                  <div className="no-refrensi">
                       <NoRef />
                       <AkunKas />
                  </div>
                 
                         <Tabs
                              defaultActiveKey="bulanan"
                              transition={false}
                              id="noanim-tab-example"
                              className="mb-3">
                              <Tab eventKey="bulanan" title="Bulanan">
                                <PembayaranBulanan/>
                              </Tab>
                              <Tab eventKey="bebas" title="Bebas">
                                <PembayaranBebas />
                              </Tab>
                            </Tabs>
                </div>

                <div className="Jenis-Pembayaran">
                  <div className="transaksi-historiPembayaran">
                    <div className="pembayaran-history">
                            <Tabs
                              defaultActiveKey="Transaksi"
                              id="uncontrolled-tab-example"
                              className="mb-3"
                            >
                              <Tab eventKey="Transaksi" title="Transaksi Pembayaran">
                              <div>
                                <TransaksiPembayaran />
                              </div>
                              </Tab>
                              <Tab eventKey="History" title="History Pembayaran">
                                <HistoryPembayaran />
                              </Tab>

                                <Tab eventKey="Tagihan" title="Tagihan Pembayaran">
                                <TagihanPembayaran />
                              </Tab>                              
                        </Tabs>
                    </div>
                        
                  </div>
                  <div className="kalkulator">
                    <h6>Kalkulator</h6>
                    <div className="wrapping">
                         <p style={{width:'150px', padding: '5px'}} className="total">Total <Kalkulator /></p>   
                          <p style={{width:'150px', padding: '5px'}} className="dibayar">Dibayar<Kalkulator /></p>
                          <p style={{width:'300px', padding: '5px'}} className="kembalian">Kembalian<Kalkulator /></p>    
                    </div>

                    <div className="bukti-pembayaran">
                      <h6>Cetak Bukti Pembayaran</h6>
                        <PilihNoRefrensi />
                        <CetakButton />
                       
                    </div>
                       
                  </div>
                      


                        
                </div>
                
                

            </div>
        </div>
    )


}

export default PagePembayaranSiswa
