import React, { Fragment, useState } from 'react'
import { Form, Offcanvas, Row } from 'react-bootstrap'
import { ButtonComponent } from '../ButtonComponent'
import TextInput from '../formOptions/textInput';
import SelectOption from '../formOptions/selectOption';

export default function ManagementOffCanvas({ show, handleClose, title, handleSubmitForm, formData }) {
    const [validated, setValidated] = useState(false);
    const [stateData, setStateData] = useState({
        ...formData,
    });

    // Handle form submission
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
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
    const { AssignType, DistrictName, TalukNmae, HobliName, VillageName, Role } = stateData;
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
                            {AssignType !== "" && (
                                <Fragment>
                                    <TextInput
                                        label={"DistrictName"}
                                        name={"DistrictName"}
                                        onChnage={handleInputChange}
                                        placeholder={"Enter District"}
                                        disabled={true}
                                        value={DistrictName} />
                                    {AssignType !== "District" && (
                                        <Fragment>
                                            <TextInput
                                                label={"TalukNmae"}
                                                name={"TalukNmae"}
                                                onChnage={handleInputChange}
                                                disabled={true}
                                                placeholder={"Enter Taluk"}
                                                value={TalukNmae} />
                                            {AssignType !== "Taluk" && (
                                                <Fragment>
                                                    <TextInput
                                                        label={"HobliName"}
                                                        name={"HobliName"}
                                                        onChnage={handleInputChange}
                                                        disabled={true}
                                                        placeholder={"Enter Hobli"}
                                                        value={HobliName} />
                                                    {AssignType !== "Hobli" && (
                                                        <TextInput
                                                            label={"VillageName"}
                                                            name={"VillageName"}
                                                            onChnage={handleInputChange}
                                                            disabled={true}
                                                            placeholder={"Enter Village"}
                                                            value={VillageName} />
                                                    )}
                                                </Fragment>
                                            )}
                                        </Fragment>
                                    )}
                                </Fragment>
                            )}
                            <div className='mt-3'>
                                <SelectOption
                                    defaultOption="Select Role"
                                    options={[""]}
                                    name={"Role"}
                                    onChange={handleInputChange}
                                    value={Role}
                                />
                                </div>
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
