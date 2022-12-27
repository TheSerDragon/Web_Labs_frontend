import * as CartPageActionCreators from "../actionCreators/CartActionCreators";
import * as UserOrdersActionCreators from "../actionCreators/UserOrdersActionCreators";
import * as AppActionCreators from "../actionCreators/AppActionsCreators";
import { getCurrentCart, getGenres, getOrderStatuses, getPublishers, getUserOrders } from "../../modules";
import {
    createAction_setGameGenres, createAction_setGamePublishers,
    createAction_setOrderStatuses,
    createAction_setUserCart,
    createAction_setUserOrders
} from "../actionCreators/AppActionsCreators";


export const fetchUserCart = () => async dispatch => {
    dispatch(CartPageActionCreators.createAction_setLoadingStatus(true))
    const data = await getCurrentCart()
    dispatch(createAction_setUserCart(data))
    dispatch(CartPageActionCreators.createAction_setLoadingStatus(false))
}

export const fetchUserOrders = (all = false, params=  undefined) => async dispatch => {
    dispatch(UserOrdersActionCreators.createAction_setLoadingStatus(true))
    const data = await getUserOrders(all, params)
    dispatch(createAction_setUserOrders(data))
    dispatch(UserOrdersActionCreators.createAction_setLoadingStatus(false))
}

export const fetchManagerOrders = (all = false) => async dispatch => {
    dispatch(UserOrdersActionCreators.createAction_setLoadingStatus(true))
    const data = await getUserOrders(all)
    dispatch(createAction_setUserOrders(data))
    const dt = await getOrderStatuses()
    dispatch(createAction_setOrderStatuses(dt))
    dispatch(UserOrdersActionCreators.createAction_setLoadingStatus(false))
}

export const fetchOrderStatuses = () => async dispatch => {
    dispatch(UserOrdersActionCreators.createAction_setLoadingStatus(true))
    const data = await getOrderStatuses()
    dispatch(createAction_setOrderStatuses(data))
    dispatch(UserOrdersActionCreators.createAction_setLoadingStatus(false))
}

export const fetchGenres = () => async dispatch => {
    const data = await getGenres()
    dispatch(createAction_setGameGenres(data))
}

export const fetchPublishers = () => async dispatch => {
    const data = await getPublishers()
    dispatch(createAction_setGamePublishers(data))
}