import React from 'react'

function MediaSosial() {
    return (
        <div className="form-page">
            <form className="school-info-form">
                <div className="form-groupi">
                    <label>Alamat Email</label>
                    <input type="email" value="" />
                </div>
                <div className="form-groupi">
                    <label>Website Sekolah</label>
                    <input type="text" value="" />
                </div>
                <div className="form-groupi">
                    <label>No Whatsapp</label>
                    <input type="text" value="" />
                </div>
                <div className="form-groupi">
                    <label>Facbook</label>
                    <input type="text" value="" />
                </div>
                <div className="form-groupi">
                    <label>Instagram</label>
                    <input type="text" value="" />
                </div>

                <div className="form-groupi">
                    <label>Youtube</label>
                    <input type="text" value="" />
                </div>

                <button type="submit" className="save-button">
                    Simpan
                </button>
            </form>
        </div>
    )
}

export default MediaSosial
