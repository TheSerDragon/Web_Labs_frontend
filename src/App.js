import { BrowserRouter, Route, Switch } from "react-router-dom";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import "./App.css";
import BasicBreadcrumbs from "./components/Breadcrumbs";
import React, {useEffect} from "react";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import UserCartPage from "./pages/UserCartPage";
import UserPurchasesPage from "./pages/UserPurchasesPage";
import SignUp from "./pages/RegPage";
import SignIn from "./pages/AuthPage";
import {useDispatch} from "react-redux";
import {createAction_setUserStatus} from "./store/actionCreators/AppActionsCreators";
import ps from "./ps.jpg";

function App() {

    const dispatch = useDispatch()

    useEffect(() => {

        const is_logged_in = document.cookie
            .split('; ')
            .filter(row => row.startsWith('is_logged_in='))
            .map(c=>c.split('=')[1])[0]
        dispatch(createAction_setUserStatus(is_logged_in !== 'False'))

    }, [])

    return (
        <BrowserRouter basename="/" >
            <ResponsiveAppBar />

            <Switch>

                <Route exact path={'/'}>
                    <BasicBreadcrumbs props={[
                        {
                            ref: '/',
                            text: 'Главная страница'
                        }
                    ]}/>
                    <img src={ps} className="PS" />
                    <div className={"navbar"}>Здравствуй, дорогой покупатель! Добро пожаловать в магазин PlayStation.</div>
                </Route>

                <Route exact path={'/games'} children={<StartPage />} />

                <Route exact path={'/games/:id_game'} children={<GamePage />} />

                <Route exact path={'/cart'} children={<UserCartPage />}/>

                <Route exact path={'/purchases'} children={<UserPurchasesPage />}/>

                <Route exact path={'/reg'} children={<SignUp/>}/>

                <Route exact path={'/login'} children={<SignIn/>}/>

            </Switch>
        </BrowserRouter>
    );
}

export default App;