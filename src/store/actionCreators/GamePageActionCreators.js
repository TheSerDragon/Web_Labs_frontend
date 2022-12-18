import * as GamePageAction from "../actions/GamePageActions";


export const createAction_setLoadingStatus = (value) => {
    return {
        type: GamePageAction.setLoadingStatus,
        value: value
    }
}

export const createAction_setGame = (value) => {
    return {
        type: GamePageAction.setGame,
        value: value
    }
}
