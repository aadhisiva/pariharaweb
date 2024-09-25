import React, { useEffect, useState } from 'react'
import { Form, Offcanvas, Row } from 'react-bootstrap'
import { ButtonComponent } from '../ButtonComponent'
import { useForm } from '../formOptions/customValidation';
import TextInput from '../formOptions/textInput';
import SelectOption from '../formOptions/selectOption';
import axiosInstance from '../../axiosInstance';

export default function RoleAccessOffCanvas({ show, handleClose, title, handleSubmitForm, formData }) {
    const [loading, setLoading] = useState(false);
    const [rolesdropdown, setRolesdropdown] = useState([]);
    const initialValues = {
        RoleId: formData.RoleId,
        District: formData.District,
        Taluk: formData.Taluk,
        Gp: formData.Gp,
        Village: formData.Village,
        Type: formData.Type
    };

    useEffect(() => {
        getIntitalRequest();
    }, []);

    const getIntitalRequest = async () => {
        try {
            setLoading(true);
            let { data } = await axiosInstance.post("addRolesOrGet", { ReqType: "Dropdown" });
            setRolesdropdown(data?.data);
            setLoading(false);
        } catch (e) {
            setLoading(false);
        }
    };

    const validationSchema = {
        RoleId: {
            validate: (value) => {
                if (!value) {
                    return "RoleId is required";
                }
                return null
            }
        },
        District: {
            validate: (value) => {
                if (!value) {
                    return "District is required";
                }
                return null
            }
        },
        Taluk: {
            validate: (value) => {
                if (!value) {
                    return "Taluk is required";
                }
                return null
            }
        },
        Gp: {
            validate: (value) => {
                if (!value) {
                    return "Gp is required";
                }
                return null
            }
        },
        Village: {
            validate: (value) => {
                if (!value) {
                    return "Village is required";
                }
                return null
            }
        },
        Type: {
            validate: (value) => {
                if (!value) {
                    return "Type is required";
                }
                return null
            }
        }
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

    const yonDropdownItems = [{ value: "Yes", role: "Yes" }, { value: "No", role: "No" }];
    const RoUDropdownItems = [{ value: "Rural", role: "Rural" }, { value: "Urban", role: "Urban" }, { value: "Both", role: "Both" }, { value: "Admin", role: "Admin" }];
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
                            <SelectOption
                                defaultOption="Select District"
                                options={yonDropdownItems}
                                name={"District"}
                                label='District'
                                isCodeAvialable={true}
                                onChange={handleChange}
                                value={values.District}
                                errors={errors.District}
                                onBlur={handleBlur}
                                isInvalid={touched.District && !!errors.District}
                            />
                            <SelectOption
                                defaultOption="Select Taluk"
                                options={yonDropdownItems}
                                name={"Taluk"}
                                label='Taluk'
                                isCodeAvialable={true}
                                onChange={handleChange}
                                value={values.Taluk}
                                errors={errors.Taluk}
                                onBlur={handleBlur}
                                isInvalid={touched.Taluk && !!errors.Taluk}
                            />
                            <SelectOption
                                defaultOption="Select Grama Panchayat"
                                options={yonDropdownItems}
                                name={"Gp"}
                                label='Gp'
                                isCodeAvialable={true}
                                onChange={handleChange}
                                value={values.Gp}
                                errors={errors.Gp}
                                onBlur={handleBlur}
                                isInvalid={touched.Gp && !!errors.Gp}
                            />
                            <SelectOption
                                defaultOption="Select Village"
                                options={yonDropdownItems}
                                name={"Village"}
                                label='Village'
                                isCodeAvialable={true}
                                onChange={handleChange}
                                value={values.Village}
                                errors={errors.Village}
                                onBlur={handleBlur}
                                isInvalid={touched.Village && !!errors.Village}
                            />
                            <SelectOption
                                defaultOption="Select Type"
                                options={RoUDropdownItems}
                                name={"Type"}
                                label='Type'
                                isCodeAvialable={true}
                                onChange={handleChange}
                                value={values.Type}
                                errors={errors.Type}
                                onBlur={handleBlur}
                                isInvalid={touched.Type && !!errors.Type}
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
