import React, { useState } from 'react'
import { Form, Offcanvas, Row } from 'react-bootstrap'
import { ButtonComponent } from '../ButtonComponent'
import TextInput from '../formOptions/textInput';

export default function RolesOffCanvas({ show, handleClose, title, handleSubmitForm }) {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        Role: ''
    });

    // Handle form submission
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            handleSubmitForm(formData);
        }
        setValidated(true);
        // Handle form data submission here
    };

    // Handle input change
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    return (
        <div>
            <Offcanvas show={show} onHide={handleClose} placement='end' >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{title}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row className="justify-content-md-center mt-2">
                        {/* <Col > */}
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <TextInput
                                label={"Role"}
                                name={"Role"}
                                onChnage={handleInputChange}
                                placeholder={"Enter Role"}
                                value={formData.Role} />
                            <div className='flex flex-row justify-between'>
                                <ButtonComponent className='mt-2 border-collapse' color='#cc3300' name={"Cancel"} onClick={handleClose} />
                                <ButtonComponent className='mt-2' type="submit" color='#339900' name={"Submit"} />
                            </div>
                        </Form>
                        {/* </Col> */}
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}
