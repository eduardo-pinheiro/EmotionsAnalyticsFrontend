import {
    CHANGE_TEST_GOING_ON,
    CHANGE_CURRENT_TITLE,
    CHANGE_CURRENT_URL,
} from "./Types";

export const changeTestGoingOn = (testGoingOn: boolean) => {
    return {
        type: CHANGE_TEST_GOING_ON,
        payload: testGoingOn,
    }
}

export const changeCurrentTitle = (currentTitle: string) => {
    return {
        type: CHANGE_CURRENT_TITLE,
        payload: currentTitle,
    }
}

export const changeCurrentUrl = (currentUrl: string) => {
    return {
        type: CHANGE_CURRENT_URL,
        payload: currentUrl,
    }
}