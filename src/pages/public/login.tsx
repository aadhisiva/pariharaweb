// src/Components/Login.js
import React, { useEffect, useState } from "react";
import TextInput from "../../components/textInput";
import { Button } from "bootstrap";
import SelectInput from "../../components/selectInput";
import { Row, Form } from "react-bootstrap";
import { postRequest } from "../../axios/axiosRequest";
import { ButtonComponent } from "../../components/ButtonComponent";
import { allRoles } from "../../utils/constData";
import { useDispatch } from "react-redux";
import { otpVerification, userLoggedIn } from "../../redux/actions/userAction";
import UseAuth from "../../components/customComponenets/useAuth";

const Login = () => {
  const [validated, setValidated] = useState(false);
  const [validatedForm2, setValidatedForm2] = useState(false);
  const [usersData, setUsersData] = useState([]);

  const [OtpNo, setOtpNo] = useState("");
  const [RoleId, setRoleId] = useState("");
  const [Mobile, setMobile] = useState("");
  const [isOtpValidate, setIsOtpValidate] = useState(false);
  const [isbuttonActive, setButtonActive] = useState(false);

  const [timer, setTimer] = useState(0);

  const dispatch = useDispatch();
  const [data] = UseAuth();

  // Countdown timer effect
  useEffect(() => {
    let intervalId: any;
    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [timer]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setButtonActive(true);
    event.preventDefault();
    const form = event.currentTarget;
    if (!Mobile) return alert("Enter Mobile");
    if (!RoleId) return alert("Select Role");
    if (form.checkValidity() === true) {
      // make it true when you are using api
      event.stopPropagation();
      let res = await postRequest("sendOtp", { Mobile, RoleId });
      if (res.code === 200) {
        setUsersData(res?.data);
        setIsOtpValidate(true);
        setButtonActive(false);
        setTimer(60);
        let body = {
          RoleId,
          RoleName: allRoles.find(obj => obj.value === Number(RoleId))?.role,
          Mobile
        }
        dispatch(userLoggedIn(body));
      } else {
        setButtonActive(false);
        setIsOtpValidate(false);
        alert(res?.response?.data?.message || "Please try again.");
      }
    }
    setValidated(true);
  };

  const handleSubmitOtp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      // make it true when you are using api
      event.stopPropagation();
      dispatch(otpVerification(""));
    }
    setValidatedForm2(true);
  };

  const handleResendOtp = async () => {};
  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        {!isOtpValidate ? (
          <Form
            noValidate
            className="flex flex-col p-10"
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Row className="mb-4 flex flex-col gap-y-2">
              <span className="pb-2 text-center font-bold">Login</span>
              <SelectInput
                defaultSelect={"Select Role"}
                options={allRoles}
                isValueAdded={true}
                value={RoleId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRoleId(e.target.value)
                }
              />
              <TextInput
                name={"Mobile"}
                placeholder={"Enter Mobile"}
                value={Mobile}
                maxLength={10}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMobile(e.target.value)
                }
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
          <Form
            noValidate
            className="flex flex-col p-10"
            validated={validatedForm2}
            onSubmit={handleSubmitOtp}
          >
            <Row className="mb-4 flex flex-col gap-y-2">
              <span className="pb-2 text-center font-bold">Login</span>
              <SelectInput
                defaultSelect={"Select Role"}
                options={allRoles}
                value={RoleId}
                isValueAdded={true}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRoleId(e.target.value)
                }
              />
              <TextInput
                controlId="validationCustom03"
                name={"Mobile"}
                placeholder={"Mobile"}
                value={Mobile}
                maxLength={10}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMobile(e.target.value)
                }
              />
              <TextInput
                controlId="validationCustom03"
                name={"Otp"}
                placeholder={"Enter Otp"}
                value={OtpNo}
                maxLength={6}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setOtpNo(e.target.value)
                }
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
              disabled={isbuttonActive}
              color="#269DA5"
              type="submit"
              name={"Submit"}
            />
          </Form>
        )}
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Don&apos;t have an account?{" "}
          <a
            className="text-red-600 hover:underline hover:underline-offset-4"
            href="#"
          >
            Register
          </a>
        </div>
      </div>
    </section>
  );
};

export default Login;
