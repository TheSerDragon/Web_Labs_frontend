import {combineReducers} from "@reduxjs/toolkit";
import { uiStartPageReducers, cached_dataStartPageReducers } from "./StartPageReducers";
import { uiGamePageReducers, cached_dataGamePageReducers } from "./GamePageReducers";
import { uiAppReducers, cached_dataAppReducers } from "./AppReducers";
import { uiCartPageReducers } from "./CartPageReducer";
import { uiUserOrdersReducers } from "./UserOrdersReducer";


const rootReducer = combineReducers({
    cached_data: combineReducers({
        StartPage: cached_dataStartPageReducers,
        GamePage: cached_dataGamePageReducers,
        App: cached_dataAppReducers,
    }),
    ui: combineReducers({
        StartPage: uiStartPageReducers,
        GamePage: uiGamePageReducers,
        CartPage: uiCartPageReducers,
        OrdersPage: uiUserOrdersReducers,
        App: uiAppReducers,
    }),
})

export default rootReducer