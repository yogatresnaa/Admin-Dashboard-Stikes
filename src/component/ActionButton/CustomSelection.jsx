import React from 'react'
import Form from 'react-bootstrap/Form'

function CustomSelection({
    data,
    value,
    label1,
    title,
    label2 = null,
    labelValue,
    onChangeHandler,
    defaultName,
}) {
    return (
        <div className="d-flex flex-column">
            <p
                style={{
                    fontSize: '0.8rem',
                    marginBottom: '8px',
                    marginTop: '3px',
                }}
            >
                {title}
            </p>
            <Form.Select
                aria-label="Default select example"
                value={value}
                onChange={onChangeHandler}
            >
                <option value={null}>{defaultName}</option>
                {data?.map((item) => (
                    <option key={item[labelValue]} value={item[labelValue]}>
                        {item[label1]}-{label2 && item[label2]}
                    </option>
                ))}
            </Form.Select>
        </div>
    )
}

export default CustomSelection
