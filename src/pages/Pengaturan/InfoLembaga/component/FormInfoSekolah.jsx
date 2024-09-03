import React from 'react'

function SchoolInfoForm() {
    return (
        <div className="form-page">
            <form className="school-info-form">
                <div className="form-groupi">
                    <label>Nama Sekolah</label>
                    <input type="text" value="STIKES PELITA ILMU" readOnly />
                </div>
                <div className="form-groupi">
                    <label>Alamat Sekolah</label>
                    <input type="text" value="Jl. Bojongsari No 34" readOnly />
                </div>
                <div className="form-groupi">
                    <label>Nama Kecamatan</label>
                    <input type="text" value="Kec. Bojongsari" readOnly />
                </div>
                <div className="form-groupi">
                    <label>Nama Kota/Kab</label>
                    <input type="text" value="Depok" readOnly />
                </div>
                <div className="form-groupi">
                    <label>Nomor Telepon</label>
                    <input type="text" value="(021) 7409559" readOnly />
                </div>

                <button type="submit" className="save-button">
                    Simpan
                </button>
            </form>
        </div>
    )
}

export default SchoolInfoForm
