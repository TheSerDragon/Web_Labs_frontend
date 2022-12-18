import initialState from "../initialState";
import * as GamePageActions from "../actions/GamePageActions";
import {combineReducers} from "@reduxjs/toolkit";


function gameByIdReducer(state = initialState.cached_data.GamePage.gameById, action) {
    switch (action.type) {
        case GamePageActions.setGame:
            return action.value
        default: return state
    }
}

function loadingStatusReducer(state = initialState.ui.GamePage.loadingStatus, action) {
    switch (action.type) {
        case GamePageActions.setLoadingStatus:
            return action.value
        default: return state
    }
}

export const cached_dataGamePageReducers = combineReducers({
    gameById: gameByIdReducer,
})

export const uiGamePageReducers = combineReducers({
    loadingStatus: loadingStatusReducer,
})