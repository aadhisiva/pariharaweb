import React, { useEffect, useState } from 'react'
import { Form, Offcanvas, Row } from 'react-bootstrap'
import { ButtonComponent } from '../ButtonComponent'
import { useForm } from '../formOptions/customValidation';
import TextInput from '../formOptions/textInput';
import SelectOption from '../formOptions/selectOption';
import axiosInstance from '../../axiosInstance';
import { mobileNoValid, nameValid } from '../../utils/Utils';
import { UseAuth } from '../customComponenets/useAuth';

export default function GpOffCanvas({ show, handleClose, title, handleSubmitForm, formData }) {
    const [loading, setLoading] = useState(false);
    const [districtDropdown, setDistrictDropDown] = useState([]);
    const [rolesdropdown, setRolesdropdown] = useState([]);
    const [talukDropdown, setTalukDropDown] = useState([]);
    const [gpDropdown, setGpDropDown] = useState([]);
    const initialValues = {
        DistrictId: formData.DistrictCode,
        TalukId: formData.TalukCode,
        GpId: formData.GpCode,
        Name: formData.Name,
        Mobile: formData.Mobile,
        RoleId: formData.RoleId,
        Type: formData.Type,
    };
    useEffect(() => {
        getIntitalRequest();
    }, []);

    const [{ RoleId, Mobile }] = UseAuth();
    const getIntitalRequest = async () => {
        setLoading(true);
        let response = await axiosInstance.post("getChildBasedOnParent", { RoleId: RoleId });
        let dResponse = await axiosInstance.post("getMasterDropdown", { ReqType: 1, loginType: "District", ListType: "Taluk", Mobile, Type: formData.Type });
        setDistrictDropDown(dResponse?.data.data);
        let tResponse = await axiosInstance.post("getMasterDropdown", { ReqType: 2, UDCode: formData.DistrictCode, loginType: "Taluk", ListType: "Taluk", Mobile, Type: formData.Type })
        setTalukDropDown(tResponse?.data.data);
        let { data } = await axiosInstance.post("getMasterDropdown", { ReqType: 3, UTCode: formData.TalukCode, UDCode: formData.DistrictCode, Type: formData.Type })
        setGpDropDown(data.data);
        setRolesdropdown(response.data?.data);
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
        Type: {
            validate: (value) => {
                if (!value) {
                    return 'Type is required';
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
                };
                return nameValid(value);
            },
        },
        Mobile: {
            validate: (value) => {
                if (!value) {
                    return 'Mobile is required';
                };
                return mobileNoValid(value);
            },
        },
        RoleId: {
            validate: (value) => {
                if (!value) {
                    return 'Role is required';
                };
                return null;
            },
        },
    };


    const handleTypeSelect = async (e) => {
        const { name, value } = e.target;
        if (values.Type !== value) {
            setValues((prev) => ({
                ...prev,
                Type: value,
                DistrictId: "",
                TalukId: "",
                GpId: "",
            }));
            let { data } = await axiosInstance.post("getMasterDropdown", { ReqType: 1, loginType: "District", ListType: "Taluk", Mobile, Type: value });
            setDistrictDropDown(data.data);
            setLoading(false);
        }
    };

    const handleDistrictSelect = async (e) => {
        const { name, value } = e.target;
        if (values.DistrictId !== value) {
            setValues((prev) => ({
                ...prev,
                DistrictId: value,
                TalukId: "",
                GpId: "",
            }));
            let { data } = await axiosInstance.post("getMasterDropdown", { ReqType: 2, UDCode: value, loginType: "Taluk", ListType: "Taluk", Mobile, Type: values.Type })
            setTalukDropDown(data.data);
        }
    };

    const handleTalukSelect = async (e) => {
        const { name, value } = e.target;
        if (values.TalukId !== value) {
            setValues((prev) => ({
                ...prev,
                TalukId: value,
                GpId: "",
            }));
            let { data } = await axiosInstance.post("getMasterDropdown", { ReqType: 3, UTCode: value, UDCode: values.DistrictId, Type: values.Type })
            setGpDropDown(data.data);
        };
    };

    const handleGpSelect = async (e) => {
        const { name, value } = e.target;
        if (values.GpId !== value) {
            setValues((prev) => ({
                ...prev,
                GpId: value,
            }));
            let { data } = await axiosInstance.post("getMasterDropdown", { ReqType: 4, UGCode: value, UTCode: values.TalukId, UDCode: values.DistrictId })
            setVillageDropDown(data.data);
        };
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
                                defaultOption="Select Type"
                                options={[{ value: "Rural", role: "Rural" }, { value: "Urban", role: "Urban" }]}
                                name={"Type"}
                                label='Type'
                                isCodeAvialable={true}
                                onChange={handleTypeSelect}
                                value={values.Type}
                                errors={errors.Type}
                                onBlur={handleBlur}
                                isInvalid={touched.Type && !!errors.Type}
                            />
                            <SelectOption
                                defaultOption="Select District"
                                options={districtDropdown}
                                name={"DistrictId"}
                                label='District'
                                isCodeAvialable={true}
                                onChange={handleDistrictSelect}
                                value={values.DistrictId}
                                errors={errors.DistrictId}
                                onBlur={handleBlur}
                                isInvalid={touched.DistrictId && !!errors.DistrictId}
                            />
                            <SelectOption
                                defaultOption="Select Taluk"
                                options={talukDropdown}
                                name={"TalukId"}
                                label='Taluk'
                                isCodeAvialable={true}
                                onChange={handleTalukSelect}
                                value={values.TalukId}
                                errors={errors.TalukId}
                                onBlur={handleBlur}
                                isInvalid={touched.TalukId && !!errors.TalukId}
                            />
                            <SelectOption
                                defaultOption="Select Panchayat"
                                options={gpDropdown}
                                name={"GpId"}
                                label='Grama Panchayat'
                                isCodeAvialable={true}
                                onChange={handleGpSelect}
                                value={values.GpId}
                                errors={errors.GpId}
                                onBlur={handleBlur}
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
