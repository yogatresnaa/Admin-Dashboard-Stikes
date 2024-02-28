import {
    pending,
    rejected,
    fulfilled,
    loginUserAction,
    logoutUserAction,
    refreshTokenAction,
} from '../actions/actionsTypes'
const initialValues = {
    data: {},
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    error: null,
    message: '',
    isRejectedRefreshToken: false,
}

const dataUser = (prevState = initialValues, action) => {
    switch (action.type) {
        case loginUserAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
                isRejectedRefreshToken: false,
            }
        case loginUserAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                isFulfilled: false,
                error: action.payload.response?.data,
                message: '',
                isRejectedRefreshToken: false,
            }

        case loginUserAction + fulfilled:
            return {
                ...prevState,
                isLoading: false,
                isRejected: false,
                isFulfilled: true,
                error: null,
                data: action.payload.data.data,
                message: action.payload.data.message,
                isRejectedRefreshToken: false,
            }
        case logoutUserAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
                isRejectedRefreshToken: false,
            }
        case logoutUserAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                isFulfilled: false,
                error: action.payload.response?.data,
                message: '',
                isRejectedRefreshToken: false,
            }

        case logoutUserAction + fulfilled:
            return {
                ...prevState,
                isLoading: false,
                isRejected: false,
                isFulfilled: true,
                error: null,
                data: {},
                message: action.payload.data.message,
                isRejectedRefreshToken: false,
            }
        case refreshTokenAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
                isRejectedRefreshToken: false,
            }
        case refreshTokenAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                isFulfilled: false,
                error: action.payload.response?.data,
                message: '',
                isRejectedRefreshToken: true,
            }

        case refreshTokenAction + fulfilled:
            return {
                ...prevState,
                isLoading: false,
                isRejected: false,
                isFulfilled: true,
                error: null,
                data: {
                    ...prevState,
                    token: action.payload.data.data.token,
                    refreshToken: action.payload.data.data.refreshToken,
                },
                message: action.payload.data.message,
                isRejectedRefreshToken: false,
            }
        default:
            return {
                ...prevState,
                isLoading: false,
                isRejected: false,
                isFulfilled: false,
                error: null,
                message: '',
                isRejectedRefreshToken: false,
            }
    }
}
export default dataUser
