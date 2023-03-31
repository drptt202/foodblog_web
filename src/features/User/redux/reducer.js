import initialState from "./initialState";
import * as CONSTANTS from "./constants";
import { RESET_ACTION } from "@features/Common/redux/constants";
import { pushMessageSuccess } from "@src/layouts";

export function reducer(state = initialState, action) {
    let payload = action.payload;
    switch (action.type) {
        /**
         * Reset action
         */
        case RESET_ACTION:
            return {
                ...state,
                ...initialState
            }

        case CONSTANTS.GET_USER: {
            return {
                ...state,
                user: {
                    ...state.user,
                    loading: false,
                    data: payload.data ?? {}
                },
            }
        }
        case CONSTANTS.GET_USER_LOADING: {
            return {
                ...state,
                user: {
                    ...state.user,
                    loading: true,
                },
            }
        }
        case CONSTANTS.GET_USER_FOLLOW: {
            return {
                ...state,
                userFollow: {
                    ...state.userFollow,
                    loading: false,
                    data: payload.data ?? []
                },
            }
        }
        case CONSTANTS.GET_USER_FOLLOW_LOADING: {
            return {
                ...state,
                userFollow: {
                    ...state.userFollow,
                    loading: true,
                },
            }
        }
        case CONSTANTS.GET_USER_FOLLOWING: {
            return {
                ...state,
                userFollowing: {
                    ...state.userFollowing,
                    loading: false,
                    data: payload.data ?? []
                },
            }
        }
        case CONSTANTS.GET_USER_FOLLOWING_LOADING: {
            return {
                ...state,
                userFollowing: {
                    ...state.userFollowing,
                    loading: true
                },
            }
        }
        case CONSTANTS.FOLLOW_USER: {
            if (payload.success) {
                pushMessageSuccess('Bạn đã theo dõi người này.')
            }
            return {
                ...state,
                follow: {
                    ...state.follow,
                    loading: false,
                    data: payload.data ?? {}
                },
                unfollow: {
                    ...initialState.unfollow,
                },
            }
        }
        case CONSTANTS.FOLLOW_USER_LOADING: {
            return {
                ...state,
                follow: {
                    ...state.follow,
                    loading: true,
                    uuid: payload.uuid,
                },
            }
        }
        case CONSTANTS.UNFOLLOW_USER: {
            if (payload.success) {
                pushMessageSuccess('Bạn đã bỏ theo dõi người này.')
            }
            return {
                ...state,
                unfollow: {
                    ...state.unfollow,
                    loading: false,
                    data: payload.data ?? {}
                },
                follow: {
                    ...initialState.follow,
                },
            }
        }
        case CONSTANTS.UNFOLLOW_USER_LOADING: {
            return {
                ...state,
                unfollow: {
                    ...state.unfollow,
                    uuid: payload.uuid,
                    loading: true,
                },
            }
        }
        default:
            return state;
    }
}