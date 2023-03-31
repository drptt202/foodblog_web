import * as CONSTANTS from './constants'

/**
 * Reset store
 * @returns
 */
export function resetStore() {
    return {
        type: CONSTANTS.RESET_ACTION,
        payload: null
    };
}
