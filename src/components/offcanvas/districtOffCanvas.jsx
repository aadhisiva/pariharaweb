import React, { useEffect, useState } from 'react'
import { Form, Offcanvas, Row } from 'react-bootstrap'
import { ButtonComponent } from '../ButtonComponent'
import { useForm } from '../formOptions/customValidation';
import TextInput from '../formOptions/textInput';
import SelectOption from '../formOptions/selectOption';
import axiosInstance from '../../axiosInstance';

export default function DistrictOffCanvas({ show, handleClose, title, handleSubmitForm, formData }) {
    const [loading, setLoading] = useState(false);
    const [districtDropdown, seDistrictdropdown] = useState([]);
    const [rolesdropdown, setRolesdropdown] = useState([]);
    const initialValues = {
        DistrictId: formData.DistrictCode,
        Name: formData.Name,
        Mobile: formData.Mobile,
        RoleId: formData.RoleId
    };
    useEffect(() => {
        getIntitalRequest();
    }, []);

    const getIntitalRequest = async () => {
        setLoading(true);
        let { data } = await axiosInstance.post("getMasterDropdown", { ReqType: 1 });
        let response = await axiosInstance.post("addRolesOrGet", { ReqType: "Dropdown" });
        seDistrictdropdown(data.data);
        setRolesdropdown(response.data?.data);
        setLoading(false);
    }
    const validationSchema = {
        DistrictId: {
            validate: (value) => {
                if (!value) {
                    return 'DistrictNameEn is required';
                }
                return null;
            },
        },
        Name: {
            validate: (value) => {
                if (!value) {
                    return 'Name is required';
                }
                return null;
            },
        },
        Mobile: {
            validate: (value) => {
                if (!value) {
                    return 'Mobile is required';
                }
                return null;
            },
        },
        RoleId: {
            validate: (value) => {
                if (!value) {
                    return 'Role is required';
                }
                return null;
            },
        },
    };
    // Handle form submission
    const onSubmit = (values) => {
        values['id'] = formData.id;
        // Handle form data submission here
        handleSubmitForm(values);
    };
    
    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setValues,
    } = useForm({ initialValues, validationSchema, onSubmit });
    return (
        <div>
            <Offcanvas show={show} onHide={handleClose} placement='end' >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{title}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row className="justify-content-md-center mt-2">
                        <Form onSubmit={handleSubmit}>
                            <SelectOption
                                defaultOption="Select Distrcit"
                                options={districtDropdown}
                                name={"DistrictId"}
                                label='District'
                                isCodeAvialable={true}
                                onChange={handleChange}
                                value={values.DistrictId}
                                errors={errors.DistrictId}
                                onBlur={handleBlur}
                                disabled={true}
                                isInvalid={touched.DistrictId && !!errors.DistrictId}
                            />
                            <SelectOption
                                defaultOption="Select Distrcit"
                                options={rolesdropdown}
                                name={"RoleId"}
                                label='Role'
                                isCodeAvialable={true}
                                onChange={handleChange}
                                value={values.RoleId}
                                errors={errors.RoleId}
                                onBlur={handleBlur}
                                isInvalid={touched.RoleId && !!errors.RoleId}
                            />
                            <TextInput
                                label={"Name"}
                                name={"Name"}
                                onChnage={handleChange}
                                placeholder={"Enter Role"}
                                value={values.Name}
                                isInvalid={touched.Name && !!errors.Name}
                                onBlur={handleBlur}
                                errors={errors.Name}
                            />
                            <TextInput
                                label={"Mobile"}
                                name={"Mobile"}
                                onChnage={handleChange}
                                placeholder={"Enter Role"}
                                value={values.Mobile}
                                isInvalid={touched.Mobile && !!errors.Mobile}
                                onBlur={handleBlur}
                                errors={errors.Mobile}
                            />
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
