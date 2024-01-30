import React from 'react'
import Form from 'react-bootstrap/Form'

function SearchInput({ filterText, setFilterText, style = {} }) {
    return (
        <>
            <div className="input-search" style={{ ...style }}>
                <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Search..."
                    value={filterText}
                    onChange={setFilterText}
                />
            </div>
        </>
    )
}

export default SearchInput
