import {apiGet, apiPost} from "@common/crud";
import * as CONSTANTS from "./constants";
import {apiDelete} from "@common/crud/actions";

/**
 * Get User
 * @returns
 */
export function getUser(id) {
    return dispatch => {
        dispatch(getUserLoadingAction())
        dispatch(apiGet(`user/getUser/${id}`, {}, {}, getUserAction))
    };
}

function getUserAction(response) {
    return {
        type   : CONSTANTS.GET_USER,
        payload: response
    };
}

function getUserLoadingAction() {
    return {
        type   : CONSTANTS.GET_USER_LOADING,
        payload: null
    };
}

/**
 * Get User FOLLOWING
 * @returns
 */
 export function getUserFollowing(id) {
    return dispatch => {
        dispatch(getUserFollowingLoadingAction())
        dispatch(apiGet(`user/getUserFollowing/${id}`, {}, {}, getUserFollowingAction))
    };
}

function getUserFollowingAction(response) {
    return {
        type   : CONSTANTS.GET_USER_FOLLOWING,
        payload: response
    };
}

function getUserFollowingLoadingAction() {
    return {
        type   : CONSTANTS.GET_USER_FOLLOWING_LOADING,
        payload: null
    };
}

/**
 * Get User FOLLOW
 * @returns
 */
 export function getUserFollow(id) {
    return dispatch => {
        dispatch(getUserFollowLoadingAction())
        dispatch(apiGet(`user/getUserFollow/${id}`, {}, {}, getUserFollowAction))
    };
}

function getUserFollowAction(response) {
    return {
        type   : CONSTANTS.GET_USER_FOLLOW,
        payload: response
    };
}

function getUserFollowLoadingAction() {
    return {
        type   : CONSTANTS.GET_USER_FOLLOWING_LOADING,
        payload: null
    };
}

/**
 * Get User
 * @returns
 */
export function followUser(uuid, id) {
    return dispatch => {
        dispatch(followUserLoadingAction(uuid))
        dispatch(apiPost(`follow/create/${id}`, {}, {}, followUserAction))
    };
}

function followUserAction(response) {
    return {
        type   : CONSTANTS.FOLLOW_USER,
        payload: response
    };
}

function followUserLoadingAction(uuid) {
    return {
        type   : CONSTANTS.FOLLOW_USER_LOADING,
        payload: {
            uuid: uuid
        }
    };
}

/**
 * Get User
 * @returns
 */
export function unfollowUser(uuid, id) {
    return dispatch => {
        dispatch(unfollowUserLoadingAction(uuid))
        dispatch(apiDelete(`follow/delete/${id}`, {}, unfollowUserAction))
    };
}
function unfollowUserAction(response) {
    return {
        type   : CONSTANTS.UNFOLLOW_USER,
        payload: response
    };
}

function unfollowUserLoadingAction(uuid) {
    return {
        type   : CONSTANTS.UNFOLLOW_USER_LOADING,
        payload: {
            uuid: uuid
        }
    };
}