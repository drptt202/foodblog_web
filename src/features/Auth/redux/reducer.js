import initialState from "./initialState";
import {
    SET_TOKEN_ACTION,
    CLEAR_TOKEN_ACTION,
    ARG_TOKEN,
    LOGIN_LOADING,
    UPDATE_TOKEN_ACTION,
    REGISTER_LOADING,
    REGISTER,
    GET_AUTH_USER, UPDATE_AUTH_USER, UPDATE_AUTH_USER_LOADING, GET_AUTH_USER_LOADING
} from "./constants";
import {pushMessageSuccess} from "@layouts";
import * as CONSTANTS_COMMON from "@features/Common/redux/constants";
import moment from "moment";

export function reducer(state = initialState, action) {
    const stateLocal = loadStateFromLocal();
    switch (action.type) {
        /**
         * Reset action
         */
        case CONSTANTS_COMMON.RESET_ACTION:
            return {
                ...state,
                ...initialState
            }
        case LOGIN_LOADING:
            return {
                ...state,
                login: {
                    ...state.login,
                    loading: true
                }
            };
        case UPDATE_TOKEN_ACTION:
            updateStateLocal(action.payload)
            return {
                ...state,
                ...stateLocal,
            };
        case SET_TOKEN_ACTION:
        case CLEAR_TOKEN_ACTION:
            return {
                ...state,
                ...stateLocal,
                login: {
                    loading: false
                }
            };

        case REGISTER_LOADING:
            return {
                ...state,
                register: {
                    ...state.register,
                    loading: true
                }
            };
        case REGISTER:
            let payload = action.payload ?? {}
            if (payload.success === true) {
                pushMessageSuccess(payload.message);
            }
            return {
                ...state,
                register: {
                    ...state.register,
                    loading: false,
                    data   : action.payload
                }
            };
        case GET_AUTH_USER:
            let authUser    = action.payload ?? {}
            authUser        = authUser.data ?? {}
            let dateOfBirth = authUser.dateOfBirth !== 'Invalid date' ? moment(authUser.dateOfBirth) : moment();
            saveUserId(authUser.userId ?? null)
            return {
                ...state,
                authUser: {
                    ...state.authUser,
                    userId     : authUser.userId ?? null,
                    fullName   : authUser.fullName ?? null,
                    email      : authUser.email ?? null,
                    introduce  : authUser.introduce ?? null,
                    avatar     : authUser.avatar ?? null,
                    dateOfBirth: dateOfBirth,
                    address    : authUser.address ?? null,

                    loading: false,
                }
            };
        case GET_AUTH_USER_LOADING:
            return {
                ...state,
                authUser: {
                    ...state.authUser,
                    loading: true,
                }
            };
        case UPDATE_AUTH_USER:
            let updateAuthUser = action.payload ?? {}
            if (updateAuthUser.success === true) {
                updateAuthUser        = updateAuthUser.data ?? {}
                let updateDateOfBirth = updateAuthUser.dateOfBirth !== 'Invalid date' ? moment(updateAuthUser.dateOfBirth) : moment();
                return {
                    ...state,
                    authUser: {
                        ...state.authUser,
                        userId     : updateAuthUser.userId ?? null,
                        fullName   : updateAuthUser.fullName ?? null,
                        email      : updateAuthUser.email ?? null,
                        introduce  : updateAuthUser.introduce ?? null,
                        avatar     : updateAuthUser.avatar ?? null,
                        dateOfBirth: updateDateOfBirth,
                        address    : updateAuthUser.address ?? null,
                    },
                    update  : {
                        ...state.update,
                        loading: false,
                        data   : {
                            userId     : updateAuthUser.userId ?? null,
                            fullName   : updateAuthUser.fullName ?? null,
                            email      : updateAuthUser.email ?? null,
                            introduce  : updateAuthUser.introduce ?? null,
                            avatar     : updateAuthUser.avatar ?? null,
                            dateOfBirth: updateDateOfBirth,
                            address    : updateAuthUser.address ?? null,
                        }
                    }
                };
            }
            return {
                ...state,
                update: {
                    ...state.update,
                    loading: false
                }
            };

        case UPDATE_AUTH_USER_LOADING:
            return {
                ...state,
                update: {
                    ...state.update,
                    loading: true
                }
            };
        default:
            return {
                ...state,
                ...stateLocal,
            };
    }
}

function saveUserId(userId){
    localStorage.setItem('authUserId', userId)
}

function updateStateLocal(dataNew = {}) {
    try {
        // Load data from local
        let dataLocal = JSON.parse(localStorage.getItem(ARG_TOKEN));

        let nameNew    = dataNew.name ?? null
        let logoUrlNew = dataNew.logoUrl ?? null

        let portfolioCurrent     = dataLocal.data.portfolio ?? {}
        portfolioCurrent         = {
            ...portfolioCurrent,
            name   : nameNew,
            logoUrl: logoUrlNew,
        }
        dataLocal.data.portfolio = portfolioCurrent;

        // Update local storage
        localStorage.setItem(ARG_TOKEN, JSON.stringify(dataLocal))
    } catch (e) {
        console.log(e)
    }
}

export function loadStateFromLocal() {
    let stateFromLocal;
    try {
        // Load data from local
        let dataLocal = JSON.parse(localStorage.getItem(ARG_TOKEN));

        // Load data auth
        let token = dataLocal.data

        // Render config homepage
        stateFromLocal = {
            user   : {
                id   : dataLocal._id ?? '',
                name : dataLocal.name ?? '',
                email: dataLocal.email ?? '',
            },
            meta   : {
                token: token,
            },
            configs: {
                homepage: '/'
            },
        }
    } catch (e) {
        localStorage.removeItem(ARG_TOKEN)
        stateFromLocal = {
            ...initialState
        }
    }
    return stateFromLocal;
}