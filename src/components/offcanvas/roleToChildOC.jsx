import React, { useEffect, useState } from 'react'
import { Form, Offcanvas, Row } from 'react-bootstrap'
import { ButtonComponent } from '../ButtonComponent'
import { useForm } from '../formOptions/customValidation';
import SelectOption from '../formOptions/selectOption';
import axiosInstance from '../../axiosInstance';

export default function RoleToChildOffCanvas({ show, handleClose, title, handleSubmitForm, formData }) {
    const [loading, setLoading] = useState(false);
    const [rolesdropdown, setRolesdropdown] = useState([]);
    const initialValues = {
        RoleId: formData.RoleId,
        ChildId: formData.ChildId
    };

    useEffect(() => {
        getIntitalRequest();
    }, []);

    const getIntitalRequest = async () => {
        setLoading(true);
        let { data } = await axiosInstance.post("addRolesOrGet", { ReqType: "Dropdown" });
        setRolesdropdown(data?.data);
        setLoading(false);
    }
    const validationSchema = {
        RoleId: {
            validate: (value) => {
                if (!value) {
                    return "RoleId is required";
                }
                return null
            }
        },
        ChildId: {
            validate: (value) => {
                if (!value) {
                    return "Child Name is required";
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
                            defaultOption="Select Child Name"
                            options={rolesdropdown}
                            name={"ChildId"}
                            label='Child'
                            isCodeAvialable={true}
                            onChange={handleChange}
                            value={values.ChildId}
                            errors={errors.ChildId}
                            onBlur={handleBlur}
                            isInvalid={touched.ChildId && !!errors.ChildId}
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
