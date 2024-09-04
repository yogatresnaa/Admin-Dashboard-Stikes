import React from 'react'

function UploadLogo() {
    return (
        <div className="form-page">
            <form className="school-info-form">
                <div className="form-group">
                    <label>Upload Logo Sekolah</label>
                    <input type="file" className="file-input" />
                    <p>Ukuran Logo 50x50 pixel</p>
                </div>

                <div className="form-group">
                    <label>Kartu Depan</label>
                    <input type="file" className="file-input" />
                    <p>Ukuran Gambar 321x203 pixel</p>
                </div>

                <div className="form-group">
                    <label>Kartu Belakang</label>
                    <input type="file" className="file-input" />
                    <p>Ukuran Gambar 321x203 pixel</p>
                </div>

                <button type="submit" className="save-button">
                    Simpan
                </button>
            </form>
        </div>
    )
}

export default UploadLogo
