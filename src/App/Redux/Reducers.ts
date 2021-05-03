import {
    CHANGE_TEST_GOING_ON, 
    CHANGE_CURRENT_TITLE, 
    CHANGE_CURRENT_URL,
} from "./Types";
import { combineReducers } from "redux";

const INITIAL_STATE = {
    testGoingOn: false,
    currentTitle: "",
    currentUrl: "",
};

const Reducers = (state = INITIAL_STATE, action: { type: string, payload: any }) => {

    switch (action.type) {

        case CHANGE_TEST_GOING_ON:
            return { ...state, testGoingOn: action.payload };

        case CHANGE_CURRENT_TITLE:
            return { ...state, currentTitle: action.payload };

        case CHANGE_CURRENT_URL:
            return { ...state, currentUrl: action.payload };

        default:
            return state;
    }
};

export default combineReducers({ Reducers });