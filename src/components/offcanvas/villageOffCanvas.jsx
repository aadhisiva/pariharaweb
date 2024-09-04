import React, { useEffect, useState } from 'react'
import { Form, Offcanvas, Row } from 'react-bootstrap'
import { ButtonComponent } from '../ButtonComponent'
import { useForm } from '../formOptions/customValidation';
import TextInput from '../formOptions/textInput';
import SelectOption from '../formOptions/selectOption';
import axiosInstance from '../../axiosInstance';
import { mobileNoValid, nameValid } from '../../utils/Utils';
import { UseAuth } from '../customComponenets/useAuth';

export default function VillageOffCanvas({ show, handleClose, title, handleSubmitForm, formData }) {
    const [loading, setLoading] = useState(false);
    const [districtDropdown, setDistrictDropDown] = useState([]);
    const [rolesdropdown, setRolesdropdown] = useState([]);
    const [talukDropdown, setTalukDropDown] = useState([]);
    const [gpDropdown, setGpDropDown] = useState([]);
    const [villageDropdown, setVillageDropDown] = useState([]);
    const initialValues = {
        DistrictId: formData.DistrictCode,
        TalukId: formData.TalukCode,
        GpId: formData.GpCode,
        VillageId: formData.VillageCode,
        Name: formData.Name,
        Mobile: formData.Mobile,
        RoleId: formData.RoleId
    };
    useEffect(() => {
        getIntitalRequest();
    }, []);
    const [{ RoleId, Mobile }] = UseAuth();

    const getIntitalRequest = async () => {
        setLoading(true);
        let response = await axiosInstance.post("getChildBasedOnParent", { RoleId: RoleId });
        setRolesdropdown(response.data?.data);
        let dResponse = await axiosInstance.post("getMasterDropdown", { ReqType: 1, loginType: "District", ListType: "Gp", Mobile, Type: "Rural" });
        setDistrictDropDown(dResponse?.data.data);
        let tResponse = await axiosInstance.post("getMasterDropdown", { ReqType: 2, UDCode: value, loginType: "Taluk", ListType: "Gp", Mobile, Type: "Rural" })
        setTalukDropDown(tResponse?.data.data);
        let gResponse = await axiosInstance.post("getMasterDropdown", { ReqType: 3, UTCode: value, UDCode: values.DistrictId, loginType: "Gp", ListType: "Gp", Mobile, Type: "Rural" })
        setGpDropDown(gResponse?.data.data);
        let { data } = await axiosInstance.post("getMasterDropdown", { ReqType: 4, UGCode: value, UTCode: values.TalukId, UDCode: values.DistrictId })
        setVillageDropDown(data.data);
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
        VillageId: {
            validate: (value) => {
                if (!value) {
                    return 'Village Name is required';
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
                return nameValid(value);
            },
        },
        Mobile: {
            validate: (value) => {
                if (!value) {
                    return 'Mobile is required';
                }
                return mobileNoValid(value);
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

    const handleTypeSelect = async (e) => {
        const { name, value } = e.target;
        setLoading(true);
        if (values.Type !== value) {
            setValues((prev) => ({
                ...prev,
                Type: value,
                DistrictId: "",
                TalukId: "",
                GpId: "",
                VillageId: ""
            }));
            let { data } = await axiosInstance.post("getMasterDropdown", { ReqType: 1, loginType: "District", ListType: "Gp", Mobile, Type: "Rural" });
            setDistrictDropDown(data.data);
            setLoading(false);
        }
    };

    const handleDistrictSelect = async (e) => {
        const { name, value } = e.target;
        setLoading(true);
        if (values.DistrictId !== value) {
            setValues((prev) => ({
                ...prev,
                DistrictId: value,
                TalukId: "",
                GpId: "",
                VillageId: "",
            }));
            let { data } = await axiosInstance.post("getMasterDropdown", { ReqType: 2, UDCode: value, loginType: "Taluk", ListType: "Gp", Mobile, Type: "Rural" })
            setTalukDropDown(data.data);
        }
        setLoading(false);
    };

    const handleTalukSelect = async (e) => {
        const { name, value } = e.target;
        setLoading(true);
        if (values.TalukId !== value) {
            setValues((prev) => ({
                ...prev,
                TalukId: value,
                GpId: "",
                VillageId: "",
            }));
            let { data } = await axiosInstance.post("getMasterDropdown", { ReqType: 3, UTCode: value, UDCode: values.DistrictId, loginType: "Gp", ListType: "Gp", Mobile, Type: "Rural" })
            setGpDropDown(data.data);
        };
        setLoading(false);
    };

    const handleGpSelect = async (e) => {
        const { name, value } = e.target;
        setLoading(true);
        if (values.GpId !== value) {
            setValues((prev) => ({
                ...prev,
                GpId: value,
                VillageId: "",
            }));
            let { data } = await axiosInstance.post("getMasterDropdown", { ReqType: 4, UGCode: value, UTCode: values.TalukId, UDCode: values.DistrictId })
            setVillageDropDown(data.data);
        };
        setLoading(false);
    };

    const handleVillageSelect = (e) => {
        const { name, value } = e.target;
        if (values.VillageId !== value) {
            setValues((prev) => ({
                ...prev,
                VillageId: value,
            }));
        };
    };

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
                                options={[{ value: "Rural", role: "Rural" }]}
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
                                defaultOption="Select Village"
                                options={villageDropdown}
                                name={"VillageId"}
                                label='Village'
                                isCodeAvialable={true}
                                onChange={handleVillageSelect}
                                value={values.VillageId}
                                errors={errors.VillageId}
                                onBlur={handleBlur}
                                isInvalid={touched.VillageId && !!errors.VillageId}
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
