import { loginUser, logoutUser } from "../../utils/http";
import { loginUserAction, logoutUserAction, refreshTokenAction } from "./actionsTypes";

export const loginUserActionCreator = (body) => ({
        type: loginUserAction,
        payload: loginUser(body),
    });
export const logoutUserActionCreator = (token) => ({
        type: logoutUserAction,
        payload: logoutUser({refreshToken:token}),
    });


