import { LOGGED_IN, LOGGED_OUT, OTP_VERIFY, ROLE_ACCESS } from "../../utils/constData";

export const userLoggedIn = (data) => {
    return {
        type: LOGGED_IN,
        payload: data
    }
};

export const userLoggedOut = () => {
    return {
        type: LOGGED_OUT
    }
}
export const otpVerification = (data) => {
    return {
        type: OTP_VERIFY,
        payload: data
    };
};

export const saveUserRolesAndAccess = (data) => {
    return {
        type: ROLE_ACCESS,
        payload: data
    };
};
