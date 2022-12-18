import React, {useEffect} from 'react';
import { Col, Row, Spinner } from "react-bootstrap";
import GameCard from "../components/GameCard";
import SearchAndFiltersGroup from "../components/SearchAndFiltersGroup";
import BasicBreadcrumbs from "../components/Breadcrumbs";
import "../styles/StartPageStyle.css";
import { useSelector, useDispatch } from 'react-redux';
import * as StartPageActionCreators from "../store/actionCreators/StartPageActionCreators";
import {fetchGameList, fetchStartPageData} from "../store/middlewares/StartPageMiddlewares";


function StartPage() {

    const text_field_value = useSelector(state => state.ui.StartPage.textFieldValue)
    const game_pricing = useSelector(state => state.cached_data.StartPage.gamePricing)
    const slider_value = useSelector(state => state.ui.StartPage.sliderValue)
    const loadingStatus = useSelector(state => state.ui.StartPage.loadingStatus)
    const gameList = useSelector(state => state.cached_data.StartPage.gameList)
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(fetchStartPageData())

    }, []);

    useEffect(() => {

        if (!loadingStatus) {
            if (slider_value[1] === 0) {
                dispatch(StartPageActionCreators.createAction_setSliderValue(game_pricing))
            }
            dispatch(StartPageActionCreators.createAction_setTextFieldValue(text_field_value))
        }

    }, [loadingStatus])

    return (
        <>
            <BasicBreadcrumbs props={[
                {
                    ref: '/',
                    text: 'Главная страница'
                },
                {
                    ref: '/games',
                    text: 'Список игр'
                }
            ]}/>
            <div className={"page-name"}>Список игр</div>
            <div className={`main-container ${loadingStatus && 'containerLoading'}`}>
                {loadingStatus ? <div className={"hide-while-loading-page"}><Spinner animation={"border"}/></div>:
                    <>
                        {game_pricing[1] === 0 ? undefined:
                            <SearchAndFiltersGroup loading={loadingStatus} text_field_label={"Введите название игры"}
                                                   button_title={"Поиск"} max={game_pricing[1]} min={game_pricing[0]}
                                                   slider_value={slider_value}
                                                   slider_on_change={event => {
                                                       dispatch(StartPageActionCreators.createAction_setSliderValue(event.target.value))
                                                   }}
                                                   text_field_value={text_field_value}
                                                   text_field_on_change={event => {
                                                       dispatch(StartPageActionCreators.createAction_setTextFieldValue(event.target.value))
                                                   }}
                                                   button_on_click={() => {
                                                       dispatch(fetchGameList({
                                                           game_name: text_field_value,
                                                           min_price: slider_value[0],
                                                           max_price: slider_value[1]
                                                       }))
                                                   }}
                                                   slider_marks={[
                                                       {
                                                           value: game_pricing[0],
                                                           label: `${game_pricing[0]} ₽`
                                                       },
                                                       {
                                                           value: game_pricing[1],
                                                           label: `${game_pricing[1]} ₽`
                                                       }
                                                   ]}
                            />
                        }
                        <div className={"container"}>
                            {!gameList.length ? <div className={"empty-result-message"}><h1>Игра не найдена :(</h1></div>:
                                <Row xs={1} md={3} sm={2} lg={4} className="grid">
                                    {gameList.map((item, index) => {
                                        return(
                                            <Col key={index}>
                                                <GameCard {...item}/>
                                            </Col>
                                        )
                                    })}
                                </Row>
                            }
                        </div>
                    </>
                }
            </div>
        </>
    );
}

export default StartPage;