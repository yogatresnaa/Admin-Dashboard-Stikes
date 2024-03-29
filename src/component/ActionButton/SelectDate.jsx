import moment from 'moment'
import React from 'react'
import DatePicker from 'react-datepicker'
import { BiCalendar } from 'react-icons/bi'

export default function SelectDate({ date, onDateChange }) {
    return (
        <div className="d-flex flex-column position-relative">
            <p style={{ fontSize: '0.8rem' }}>Tanggal</p>
            <DatePicker
                dateFormat="dd-MM-yyyy"
                selected={date}
                onChange={onDateChange}
            />
            <BiCalendar
                style={{ position: 'absolute', right: 5, top: 40 }}
                size={20}
                color="gray"
            />
        </div>
    )
}
