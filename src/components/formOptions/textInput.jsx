import React from 'react'
import { Form } from 'react-bootstrap'

export default function TextInput({ name, required = false, type, placeholder, value, onChnage, errors, label, disabled = false, onBlur, isInvalid }) {
    return (
        <Form.Group controlId={name}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type ? type : "text"}
                disabled={disabled}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChnage}
                required={required}
                isInvalid={isInvalid}
                onBlur={onBlur}
            />
            <Form.Control.Feedback type="invalid">
                {errors}
            </Form.Control.Feedback>
        </Form.Group>
    )
}
