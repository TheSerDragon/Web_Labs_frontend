//Список игр
export const getGameList = async () => {
    return await fetch(`http://localhost:8000/games/`, {credentials: "include"})
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
    return await fetch(`http://localhost:8000/games/?name=${name}&max_price=${max_price}&min_price=${min_price}`, {credentials: "include"})
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
    return await fetch(`http://localhost:8000/games/${id_game}/`, {credentials: "include"})
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
    return await fetch('http://localhost:8000/gamePricing/', {credentials: "include"})
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
    return await fetch('http://localhost:8000/current_cart/', {
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

export const getUserOrders = async () => {
    return await fetch('http://localhost:8000/orders/', {
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