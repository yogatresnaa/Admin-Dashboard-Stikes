import React from 'react'
import { FaCoins } from 'react-icons/fa'

function BackUpData() {
    const handleDownload = () => {
        // Replace this URL with the actual endpoint to download the SQL backup
        const url = '/path/to/your/backup.sql'
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'backup.sql') // Specify the filename
        document.body.appendChild(link)
        link.click()
        link.remove()
    }

    return (
        <div className="page-content">
            <h3>
                Backup Data{' '}
                <span style={{ fontSize: '0.8em', color: 'gray' }}>List</span>
            </h3>
            <button
                onClick={handleDownload}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                }}
            >
                <FaCoins
                    style={{
                        marginRight: '10px',
                        color: 'blue',
                        width: '40px',
                        height: '40px',
                    }}
                />
                Download Backup
            </button>
        </div>
    )
}

export default BackUpData
