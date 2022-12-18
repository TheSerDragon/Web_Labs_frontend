import {configureStore} from "@reduxjs/toolkit";
import * as StartPageMiddlewares from "./middlewares/StartPageMiddlewares";
import fetchGameInfo from "./middlewares/GamePageMiddlewares";
import {fetchUserCart, fetchUserOrders} from "./middlewares/AppMiddlewares";
import rootReducer from "./reducers/RootReducer";


const myMiddlewares = [
    StartPageMiddlewares.fetchStartPageData,
    StartPageMiddlewares.fetchGameList,
    fetchGameInfo,
    fetchUserCart,
    fetchUserOrders,
]

const store = configureStore({
    reducer: rootReducer,
    myMiddlewares
})

export default store