import React, { useState } from 'react'
import DataTable from 'react-data-table-component'

const MyDataTable = ({ data }) => {
    const [expandedRows, setExpandedRows] = useState([])

    const handleRowExpand = (row) => {
        const isRowExpanded = expandedRows.includes(row.id)

        if (isRowExpanded) {
            setExpandedRows(expandedRows.filter((id) => id !== row.id))
        } else {
            setExpandedRows([...expandedRows, row.id])
        }
    }

    const isRowExpanded = (row) => expandedRows.includes(row.id)

    const expandableRows = data.map((row) => ({
        ...row,
        onClick: () => handleRowExpand(row),
        isRowExpanded: isRowExpanded(row),
    }))

    const columns = [
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'Position',
            selector: 'position',
            sortable: true,
        },
        {
            name: 'Office',
            selector: 'office',
            sortable: true,
        },
        {
            name: 'Age',
            selector: 'age',
            sortable: true,
        },
    ]

    return (
        <DataTable
            title="Employee Data"
            columns={columns}
            data={expandableRows}
            expandableRows
            // expandableRowsComponent={<ExpandedComponent />}
        />
    )
}

// const ExpandedComponent = ({ data }) => (
//     <div>Additional Data: {data.additionalData}</div>
// )

export default MyDataTable
