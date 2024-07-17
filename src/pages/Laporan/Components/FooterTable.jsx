import React from 'react'
import { rupiahConvert } from '../../../utils/helper'

export default function FooterTable({
    title,
    valueMasuk,
    valueKeluar,
    color = 'wheat',
}) {
    return (
        <div
            className="d-flex gap-5 justify-content-end "
            style={{
                background: color,
                borderRadius: '5px',
                padding: '12px 8px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flex: 5,
                    justifyContent: 'end',
                    fontSize: '0.8rem',
                }}
            >
                {title}
            </div>
            <div style={{ flex: 1, fontSize: '0.8rem', fontWeight: 'bold' }}>
                {rupiahConvert(valueMasuk || 0)}
            </div>
            <div style={{ flex: 1, fontSize: '0.8rem', fontWeight: 'bold' }}>
                {rupiahConvert(valueKeluar || 0)}
            </div>
        </div>
    )
}
