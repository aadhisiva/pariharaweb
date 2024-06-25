import React from 'react'
import { Form } from 'react-bootstrap'

export default function Checkbox({required, label, name, onChange}) {
    return (
        <Form.Group className="mb-3">
            <Form.Check
                required={required}
                label={label}
                name={name}
                onChange={onChange}
                feedback={`Please Select ${label}.`}
                feedbackType="invalid"
            />
        </Form.Group>
    )
}
