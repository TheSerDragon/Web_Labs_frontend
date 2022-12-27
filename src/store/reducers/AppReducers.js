import initialState from "../initialState";
import {combineReducers} from "@reduxjs/toolkit";
import * as AppActions from "../actions/AppActions";

function orderStatusesReducer(state = initialState.cached_data.App.orderStatuses, action) {
    switch (action.type) {
        case AppActions.setOrderStatuses:
            return action.value
        default: return state
    }
}


function userIsManagerReducer(state = initialState.cached_data.App.userIsManager, action) {
    switch (action.type) {
        case AppActions.setUserManagerStatus:
            return action.value
        default: return state
    }
}

function userAuthorizedReducer(state = initialState.cached_data.App.userAuthorized, action) {
    switch (action.type) {
        case AppActions.setUserStatus:
            return action.value
        default: return state
    }
}

function UserCartReducer(state = initialState.cached_data.App.userCart, action) {
    switch (action.type) {
        case AppActions.setUserCart:
            return action.value
        case AppActions.addToUserCartGame:
            return [...state, ...action.value]
        case AppActions.deleteFromUserCartByGameID:
            return state.filter(item => item.game_id.id !== action.value)
        default: return state
    }
}

function GamePublishersReducer(state = initialState.cached_data.App.gamePublishers, action) {
    switch (action.type) {
        case AppActions.setGamePublishers:
            return action.value
        default: return state
    }
}

function GameGenresTypesReducer(state = initialState.cached_data.App.gameGenres, action) {
    switch (action.type) {
        case AppActions.setGameGenres:
            return action.value
        default: return state
    }
}

function UserOrdersReducer(state = initialState.cached_data.App.userOrders, action) {
    switch (action.type) {
        case AppActions.addNewOrder:
            return [...state, ...action.value]
        case AppActions.setUserOrders:
            return action.value
        default:
            return state
    }
}


function AppBarLinksReducer(state = initialState.ui.App.AppBarLinks, action) {
    switch (action.type) {
        case AppActions.addToAppBarLinks:
            return [...state, ...action.value]
        case AppActions.deleteFromAppBarLinks:
            return state.filter(item => item.title !== action.value)
        case AppActions.setAppBarLinks:
            return action.value
        default: return state
    }
}

export const cached_dataAppReducers = combineReducers({
    userAuthorized: userAuthorizedReducer,
    userIsManager: userIsManagerReducer,
    orderStatuses: orderStatusesReducer,
    userCart: UserCartReducer,
    userOrders: UserOrdersReducer,
    gamePublishers: GamePublishersReducer,
    gameGenres: GameGenresTypesReducer
})

export const uiAppReducers = combineReducers({
    AppBarLinks: AppBarLinksReducer,
})