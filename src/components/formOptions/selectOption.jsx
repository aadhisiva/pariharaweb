import React from 'react'
import { Form } from 'react-bootstrap'

export default function SelectOption({ options, isCodeAvialable, defaultOption= false, label='', name, onChange, value }) {
    return (
        <Form.Group controlId={label}>
           {label ? <Form.Label>{label}</Form.Label> : ""}
            <Form.Select onChange={onChange} name={name} value={value} aria-label="Default select example">
                <option value={""}>{defaultOption}</option>
                {isCodeAvialable ? (
                    (options || []).map((obj, i) => (
                        <option key={i} value={obj?.value}>{obj?.name}</option>
                    ))
                ) : (
                    (options || []).map((obj, i) => (
                        <option key={i} value={obj}>{obj}</option>
                    ))
                )}
            </Form.Select>
        </Form.Group>
    )
}
