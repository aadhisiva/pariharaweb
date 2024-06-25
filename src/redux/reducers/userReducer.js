import { CLEAR_TIMEOUT_ID, LOGGED_IN, LOGGED_OUT, OTP_VERIFY, ROLE_ACCESS, SET_TIMEOUT_ID } from "../../utils/constData";

const initialState = {
    isLoggedIn: true,
    Otp : null,
    Mobile: "",
    userCodes: [],
    RoleId: "",
    RoleName: "",
    access: []
};

export const userReducers = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case SET_TIMEOUT_ID:
            return { ...state, timeoutId: payload };
        case LOGGED_IN:
            return { ...state, Mobile: payload.Mobile, Otp: payload.Otp, RoleId: payload.RoleId };
        case LOGGED_OUT:
            return initialState;
        case ROLE_ACCESS:
            return {...state, childRoles: payload?.childRoles, accessOfMasters: payload?.accessOfMasters};
        case OTP_VERIFY:
            return { ...state, isLoggedIn: true, RoleName: payload.RoleName, access: payload?.access};
        case CLEAR_TIMEOUT_ID:
            return initialState;
        default:
            return state;
    }
};