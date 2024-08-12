import React, { useState } from 'react'
import { Form, Offcanvas, Row } from 'react-bootstrap'
import { ButtonComponent } from '../ButtonComponent'
import TextInput from '../formOptions/textInput';
import { useForm } from '../formOptions/customValidation';

export default function RolesOffCanvas({ show, handleClose, title, handleSubmitForm, formData }) {
    const initialValues = {
        RoleName: formData.RoleName
      };

      const validationSchema = {
        RoleName: {
          validate: (value) => {
            if (!value) {
              return 'Role Name is required';
            }
            return null;
          },
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
                            <TextInput
                                label={"RoleName"}
                                name={"RoleName"}
                                onChnage={handleChange}
                                placeholder={"Enter Role"}
                                value={values.RoleName}
                                isInvalid={touched.RoleName && !!errors.RoleName}
                                onBlur={handleBlur}
                                errors={errors.RoleName}
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
