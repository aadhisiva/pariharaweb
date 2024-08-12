import React, { useState } from 'react'
import { Form, Offcanvas, Row } from 'react-bootstrap'
import { ButtonComponent } from '../ButtonComponent'
import TextInput from '../formOptions/textInput';
import SelectOption from '../formOptions/selectOption';

export default function AssignmentOffCanvas({ show, handleClose, title, handleSubmitForm, formData }) {
    const [validated, setValidated] = useState(false);
    const [stateData, setStateData] = useState({
        Role: '',
        Name: "",
        Mobile: ""
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
            ...stateData,
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
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <SelectOption
                                defaultOption="Select Role"
                                options={[""]}
                                name={"Role"}
                                onChange={handleInputChange}
                                value={stateData.Role}
                            />
                            <TextInput
                                label={"Name"}
                                name={"Name"}
                                onChnage={handleInputChange}
                                placeholder={"Enter Name"}
                                value={formData.Name} />
                            <TextInput
                                label={"Mobile"}
                                name={"Mobile"}
                                onChnage={handleInputChange}
                                placeholder={"Enter Mobile"}
                                value={formData.Mobile} />
                            <div className='flex flex-row justify-between'>
                                <ButtonComponent className='mt-2 border-collapse' color='#cc3300' name={"Cancel"} onClick={handleClose} />
                                <ButtonComponent className='mt-2' type="submit" color='#339900' name={"Submit"} />
                            </div>
                        </Form>
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}
