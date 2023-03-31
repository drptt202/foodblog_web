import initialState from "./initialState";
import * as CONSTANTS from "./constants";
import {RESET_ACTION} from "@features/Common/redux/constants";
import {pushMessageSuccess} from "@layouts";

export function reducer(state = initialState, action) {
    let payload = action.payload;
    let data
    switch (action.type) {
        /**
         * Reset action
         */
        case RESET_ACTION:
            return {
                ...state,
                ...initialState
            }
        case CONSTANTS.LIST_RECIPE_MANAGEMENT:
            data = payload.data ?? []
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false,
                    data   : data ?? []
                },
            }
        case CONSTANTS.LIST_RECIPE_MANAGEMENT_LOADING: {
            return {
                ...state,
                add: {
                    ...state.add,
                    loading: true,
                },
            }
        }
        case CONSTANTS.LIST_RECIPE_ADD:
            data = payload.data ?? {}
            if (payload.success){
                pushMessageSuccess('Tạo danh sách thành công.')
            }
            return {
                ...state,
                add: {
                    ...state.add,
                    loading: false,
                    data   : data ?? {}
                },
            }
        case CONSTANTS.LIST_RECIPE_ADD_LOADING: {
            return {
                ...state,
                add: {
                    ...state.add,
                    loading: true,
                },
            }
        }
        case CONSTANTS.LIST_RECIPE_DELETE:
            data = payload.data ?? {}
            if (payload.success){
                pushMessageSuccess('Xóa danh sách thành công.')
            }
            return {
                ...state,
                delete: {
                    ...state.delete,
                    loading: false,
                    data   : data ?? {}
                },
            }
        case CONSTANTS.LIST_RECIPE_DELETE_LOADING: {
            return {
                ...state,
                delete: {
                    ...state.delete,
                    loading: true,
                },
            }
        }
        case CONSTANTS.LIST_RECIPE_DETAIL:
            data = payload.data ?? {}
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading: false,
                    data   : data ?? {}
                },
            }
        case CONSTANTS.LIST_RECIPE_DETAIL_LOADING: {
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading: true,
                },
            }
        }
        case CONSTANTS.LIST_RECIPE_UPDATE:
            data = payload.data ?? {}
            if (payload.success){
                pushMessageSuccess('Cập nhật danh sách thành công.')
            }
            return {
                ...state,
                update: {
                    ...state.update,
                    loading: false,
                    data   : data ?? {}
                },
            }
        case CONSTANTS.LIST_RECIPE_UPDATE_LOADING: {
            return {
                ...state,
                update: {
                    ...state.update,
                    loading: true,
                },
            }
        }
        default:
            return state;
    }
}