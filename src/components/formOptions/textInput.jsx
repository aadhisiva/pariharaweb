import React from 'react'
import { Form } from 'react-bootstrap'

export default function TextInput({ name, placeholder, value, onChnage, label }) {
    return (
        <Form.Group controlId={name}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type="text"
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChnage}
                required
            />
            <Form.Control.Feedback type="invalid">
                {`Please provide a ${label}.`}
            </Form.Control.Feedback>
        </Form.Group>
    )
}
