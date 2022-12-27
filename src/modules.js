import {createAction_setUserManagerStatus} from "./store/actionCreators/AppActionsCreators";
import api_socket from "./network";

//Список игр
export const getGameList = async () => {
    return await fetch(`http://${api_socket}/games/`, {credentials: "include"})
        .then(async (response) => {
            return await response.json();
        })
        .catch(() => {
            return {
                resultCount: 0,
                results: []
            }
        });
}

export const getGameListFiltered = async (name, max_price, min_price) => {
    return await fetch(`http://${api_socket}/games/?name=${name}&max_price=${max_price}&min_price=${min_price}`, {credentials: "include"})
        .then(async (response) => {
            return await (await response.json());
        })
        .catch(() => {
            return {
                resultCount: 0,
                results: []
            }
        })
}

//Информация об игре
export const getGameById = async (id_game) => {
    return await fetch(`http://${api_socket}/games/${id_game}/`, {credentials: "include"})
        .then(async (response) => {
            return await response.json();
        })
        .catch(() => {
            return {
                resultCount: 0,
                results: []
            }
        })
}

export const getGamePricing = async () => {
    return await fetch(`http://${api_socket}/gamePricing/`, {credentials: "include"})
        .then(async (response) => {
            return await response.json();
        })
        .catch(() => {
            return {
                resultCount: 0,
                results: []
            }
        })
}

export const getCurrentCart = async () => {
    return await fetch(`http://${api_socket}/current_cart/`, {
        credentials: "include"
    }).then(async response => {
        return await response.json();
    }).catch(() => {
        return{
            resultCount: 0,
            results: []
        }
    })
}

export const getUserOrders = async (all = false, params) => {
    let url = `http://${api_socket}/orders/`
    if (all) url = url + `?all=${true}`
    if (params) url += params
    return await fetch(url, {
        credentials: "include",
    }).then(async response => {
        return await response.json();
    }).catch(() => {
        return {
            resultCount: 0,
            results: []
        }
    })
}

export const user_is_manager = () => {
    const is_manager = document.cookie
        .split('; ')
        .filter(row => row.startsWith('is_manager='))
        .map(c=>c.split('=')[1])[0]
    return is_manager === 'True'
}

export const getOrderStatuses = async () => {
    return await fetch(`http://${api_socket}/order_status/`, {credentials: "include"})
        .then(async (response) => {
            return await response.json();
        })
        .catch(() => {
            return {
                resultCount: 0,
                results: []
            }
        })
}

export const getPublishers = async () => {
    return await fetch(`http://${api_socket}/publishers/`, {credentials: "include"})
        .then(async (response) => {
            return await response.json();
        })
        .catch(() => {
            return {
                resultCount: 0,
                results: []
            }
        })
}

export const getGenres = async () => {
    return await fetch(`http://${api_socket}/genres/`, {credentials: "include"})
        .then(async (response) => {
            return await response.json();
        })
        .catch(() => {
            return {
                resultCount: 0,
                results: []
            }
        })
}