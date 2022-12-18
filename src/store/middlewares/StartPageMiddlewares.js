import * as StartPageActionCreators from "../actionCreators/StartPageActionCreators"
import {getGameList, getGameListFiltered, getGamePricing} from "../../modules";


export const fetchGameList = (filters) => async dispatch => {
    dispatch(StartPageActionCreators.createAction_setLoadingStatus(true))
    if (filters) {
        const data = await getGameListFiltered(filters.game_name, filters.max_price, filters.min_price)
        dispatch(StartPageActionCreators.createAction_setGameList(data))
        dispatch(StartPageActionCreators.createAction_setLoadingStatus(false))
    }
    else {
        const data = await getGameList()
        dispatch(StartPageActionCreators.createAction_setGameList(data))
        dispatch(StartPageActionCreators.createAction_setLoadingStatus(false))
    }
}

export const fetchStartPageData = () => async dispatch => {
    dispatch(StartPageActionCreators.createAction_setLoadingStatus(true))
    const gameList = await getGameList()
    const data = await getGamePricing()
    const pricingInfo = [data.min_price || 0, data.max_price || 0]
    dispatch(StartPageActionCreators.createAction_setGameList(gameList))
    dispatch(StartPageActionCreators.createAction_setGamePricing(pricingInfo))
    dispatch(StartPageActionCreators.createAction_setLoadingStatus(false))
}