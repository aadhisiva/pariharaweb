import { SAVE_USER_PATH } from "../../utils/constData";

export const saveuserPath = (data) => {
    return {
        type: SAVE_USER_PATH,
        payload: data
    }
};
