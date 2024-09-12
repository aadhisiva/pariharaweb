// src/Components/Login.js
import React, { useEffect, useState } from "react";
import { Row, Form } from "react-bootstrap";
import { ButtonComponent } from "../../components/ButtonComponent";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../../reducers/authReducer";
import { useForm } from "../../components/formOptions/customValidation";
import TextInput from "../../components/formOptions/textInput";
import SelectOption from "../../components/formOptions/selectOption";
import { UseAuth } from "../../components/customComponenets/useAuth";
import axiosInstance from "../../axiosInstance";
import { mobileNoValid, otpValid } from "../../utils/Utils";
import { useNavigate } from "react-router-dom";

const OtpVerifyPage = ({rolesData=[]}) => {
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [data] = UseAuth();

  const initialValues = {
    Mobile: rolesData.Mobile,
    RoleName: "",
    Otp: ""
  };

  // Countdown timer effect
  useEffect(() => {
    let intervalId;
    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [timer]);

  const validationSchema = {
    Mobile: {
      validate: (value) => {
        if (!value) {
          return "Mobile is required";
        }
        return mobileNoValid(value);
      },
    },
    RoleId: {
      validate: (value) => {
        if (!value) {
          return "RoleName is required";
        };
        return null;
      },
    },
    Otp: {
      validate: (value) => {
        if (!value) {
          return "Otp is required";
        }
        return otpValid(value);
      },
    },
  };
  
  // Handle form submission
  const onSubmit = async (values) => {
    // Handle form data submission here
    let response = await axiosInstance.post("verifyOtp", {Mobile: rolesData?.Mobile, Otp: values?.Otp});
    console.log("response?.data",response?.data)
    if(response?.data?.code !== 200) return;
    let findObj = (rolesData.UserData || []).find(obj => obj.RoleId == values.RoleId);
    let {data} = await axiosInstance.post("findAccessById", {RoleId: values.RoleId})
    dispatch(userLoggedIn({...rolesData, ...{RoleName: findObj.RoleName, RoleId: values.RoleId, RoleAccess: data.data}}));
    navigate("/");
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

  const handleResendOtp = async () => {};
  return (
          <Form
            className="flex flex-col p-10"
            onSubmit={handleSubmit}
          >
            <Row className="mb-4 flex flex-col gap-y-2">
              <span className="pb-2 text-center font-bold">Login</span>
               <TextInput
                label={"Mobile"}
                name={"Mobile"}
                onChnage={handleChange}
                placeholder={"Enter Mobile"}
                value={values.Mobile}
                disabled={true}
                isInvalid={touched.Mobile && !!errors.Mobile}
                onBlur={handleBlur}
                errors={errors.Mobile}
              />
              <SelectOption
                defaultOption="Select Role"
                options={(rolesData?.UserData || []).map(obj => {return {role: obj.RoleName, value: obj.RoleId }})}
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
                label={"Otp"}
                name={"Otp"}
                onChnage={handleChange}
                placeholder={"Enter Otp"}
                value={values.Otp}
                isInvalid={touched.Otp && !!errors.Otp}
                onBlur={handleBlur}
                errors={errors.Otp}
              />
              <div className="flex justify-end">
                <a
                  onClick={handleResendOtp}
                  className={`${
                    timer < 1
                      ? "text-red-400 cursor-pointer"
                      : "pointer-events-none text-gray-600"
                  }`}
                >
                  RESEND OTP {timer > 0 && `(${timer})`}
                </a>
              </div>
            </Row>
            <ButtonComponent
              color="#269DA5"
              type="submit"
              name={"Submit"}
            />
          </Form>
  );
};

export default OtpVerifyPage;
