// src/Components/Login.js
import React, { useState } from "react";
import { Row, Form } from "react-bootstrap";
import { ButtonComponent } from "../../components/ButtonComponent";
import { useDispatch } from "react-redux";
import { useForm } from "../../components/formOptions/customValidation";
import axiosInstance from "../../axiosInstance";
import TextInput from "../../components/formOptions/textInput";
import OtpVerifyPage from "./otpVerifyPage";
import { UseAuth } from "../../components/customComponenets/useAuth";
import { mobileNoValid } from "../../utils/Utils";
import LoginPageImage from "../../assets/login_image.png";

const Login = () => {
  const [usersData, setUsersData] = useState([]);

  const [isOtpValidate, setIsOtpValidate] = useState(false);
  const [isbuttonActive, setButtonActive] = useState(false);


  const dispatch = useDispatch();
  const [data] = UseAuth();

  const initialValues = {
    Mobile: "",
  };

  const validationSchema = {
    Mobile: {
      validate: (value) => {
        if (!value) {
          return "Mobile is required";
        };
        return mobileNoValid(value);
      },
    },
  };

  // Handle form submission
  const onSubmit = async (values) => {
    // Handle form data submission here
    let { data } = await axiosInstance.post("checkMobileLogin", {
      Mobile: values.Mobile,
    });
    setUsersData(data.data);
    setIsOtpValidate(true);
    setButtonActive(false);
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
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src={LoginPageImage}
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        {!isOtpValidate ? (
          <Form className="flex flex-col p-10" onSubmit={handleSubmit}>
            <Row className="mb-4 flex flex-col gap-y-2">
              <span className="pb-2 text-center font-bold">Login</span>
              <TextInput
                label={"Mobile"}
                name={"Mobile"}
                onChnage={handleChange}
                placeholder={"Enter Mobile"}
                value={values.Mobile}
                isInvalid={touched.Mobile && !!errors.Mobile}
                onBlur={handleBlur}
                errors={errors.Mobile}
              />
            </Row>
            <ButtonComponent
              disabled={isbuttonActive}
              type="submit"
              name={"Submit"}
              color="#269DA5"
            />
          </Form>
        ) : (
          <OtpVerifyPage rolesData={usersData || []} />
        )}
      </div>
    </section>
  );
};

export default Login;
