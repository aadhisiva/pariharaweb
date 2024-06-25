import { SAVE_USER_PATH } from "../../utils/constData";

const initialState = {
    currentPath: ""
};

export const saveuserPathReducer = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case SAVE_USER_PATH:
            return { ...state, currentPath: payload };
        default:
            return state;
    }
};