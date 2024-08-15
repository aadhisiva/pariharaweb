import React, { useEffect, useState } from 'react'
import { Form, Offcanvas, Row } from 'react-bootstrap'
import { ButtonComponent } from '../ButtonComponent'
import { useForm } from '../formOptions/customValidation';
import TextInput from '../formOptions/textInput';
import SelectOption from '../formOptions/selectOption';
import axiosInstance from '../../axiosInstance';

export default function GpOffCanvas({ show, handleClose, title, handleSubmitForm, formData }) {
    const [loading, setLoading] = useState(false);
    const [districtDropdown, seDistrictdropdown] = useState([]);
    const [rolesdropdown, setRolesdropdown] = useState([]);
    const [talukDropdown, setTalukDropdown] = useState([]);
    const [gpDropdown, setGpDropdown] = useState([]);
    const initialValues = {
        DistrictId: formData.DistrictCode,
        TalukId: formData.TalukCode,
        GpId: formData.GpCode,
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
        let talukRes = await axiosInstance.post("getMasterDropdown", { ReqType: 2 , UDCode: formData.DistrictCode});
        let gpRes = await axiosInstance.post("getMasterDropdown", { ReqType: 3 , UTCode: formData.TalukCode, UDCode: formData.DistrictCode});
        let response = await axiosInstance.post("addRolesOrGet", { ReqType: "Dropdown" });
        seDistrictdropdown(data.data);
        setRolesdropdown(response.data?.data);
        setTalukDropdown(talukRes.data?.data);
        setGpDropdown(gpRes.data?.data);
        setLoading(false);
    }
    const validationSchema = {
        DistrictId: {
            validate: (value) => {
                if (!value) {
                    return 'District Name is required';
                }
                return null;
            },
        },
        TalukId: {
            validate: (value) => {
                if (!value) {
                    return 'Taluk Name is required';
                }
                return null;
            },
        },
        GpId: {
            validate: (value) => {
                if (!value) {
                    return 'Gp Name is required';
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
                                defaultOption="Select District"
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
                                defaultOption="Select Taluk"
                                options={talukDropdown}
                                name={"TalukId"}
                                label='Taluk'
                                isCodeAvialable={true}
                                onChange={handleChange}
                                value={values.TalukId}
                                errors={errors.TalukId}
                                onBlur={handleBlur}
                                disabled={true}
                                isInvalid={touched.TalukId && !!errors.TalukId}
                            />
                            <SelectOption
                                defaultOption="Select Panchayat"
                                options={gpDropdown}
                                name={"GpId"}
                                label='Grama Panchayat'
                                isCodeAvialable={true}
                                onChange={handleChange}
                                value={values.GpId}
                                errors={errors.GpId}
                                onBlur={handleBlur}
                                disabled={true}
                                isInvalid={touched.GpId && !!errors.GpId}
                            />
                            <SelectOption
                                defaultOption="Select Role"
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
