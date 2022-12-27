import * as AppActions from "../actions/AppActions"
import {setAppBarLinks} from "../actions/AppActions";


export const createAction_addNewOrder = value => {
    return {
        type: AppActions.addNewOrder,
        value: value
    }
}


export const createAction_setUserOrders = value => {
    return {
        type: AppActions.setUserOrders,
        value: value
    }
}


export const createAction_deleteFromUserCartByGameID = (value) => {
    return {
        type: AppActions.deleteFromUserCartByGameID,
        value: value
    }
}


export const createAction_addToUserCartGame = (value) => {
    return {
        type: AppActions.addToUserCartGame,
        value: value
    }
}

export const createAction_setOrderStatuses = (value) => {
    return {
        type: AppActions.setOrderStatuses,
        value: value
    }
}

export const createAction_setGamePublishers = (value) => {
    return {
        type: AppActions.setGamePublishers,
        value: value
    }
}

export const createAction_setGameGenres = (value) => {
    return {
        type: AppActions.setGameGenres,
        value: value
    }
}


export const createAction_setUserManagerStatus = (value) => {
    return {
        type: AppActions.setUserManagerStatus,
        value: value
    }
}


export const createAction_setUserStatus = (value) => {
    return {
        type: AppActions.setUserStatus,
        value: value
    }
}

export const createAction_setUserCart = (value) => {
    return {
        type: AppActions.setUserCart,
        value: value
    }
}

export const createAction_setAppBarLinks = (value) => {
    return {
        type: setAppBarLinks,
        value: value
    }
}

export const createAction_addToAppBarLinks = (value) => {
    return {
        type: AppActions.addToAppBarLinks,
        value: value
    }
}

export const createAction_deleteFromAppBarLinks = (value) => {
    return {
        type: AppActions.deleteFromAppBarLinks,
        value: value
    }
}