import * as StartPageActions from "../actions/StartPageActions"

export const createAction_setGamePricing = (value) => {
    return {
        type: StartPageActions.setGamePricing,
        value: value
    }
}

export const createAction_setSliderValue = (value) => {
    return {
        type: StartPageActions.setSliderValue,
        value: value
    }
}

export const createAction_setTextFieldValue = (value) => {
    return {
        type: StartPageActions.setTextFieldValue,
        value: value
    }
}

export const createAction_setGameList = (value) => {
    return {
        type: StartPageActions.setGameList,
        value: value
    }
}

export const createAction_setLoadingStatus = (value) => {
    return {
        type: StartPageActions.setLoadingStatus,
        value: value
    }
}