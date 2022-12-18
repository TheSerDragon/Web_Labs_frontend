import React, {useEffect, useState} from 'react';
import {Col, Row, Spinner, Button} from "react-bootstrap";
import {useParams} from "react-router";
import GameFullInfo from "../components/GameFullInfo";
import "../styles/GamePageStyle.css";
import HorizontalList from "../components/ListGroup";
import BasicBreadcrumbs from "../components/Breadcrumbs";
import {useDispatch, useSelector} from "react-redux";
import fetchGameInfo from "../store/middlewares/GamePageMiddlewares";


function GamePage() {

    const { id_game } = useParams();

    const loadingStatus = useSelector(state => state.ui.GamePage.loadingStatus)
    const game = useSelector(state => state.cached_data.GamePage.gameById)
    const user_cart = useSelector(state => state.cached_data.App.userCart)
    const [btnLoaidng, setbtnLoading] = useState(false)
    const userStatus = useSelector(state => state.cached_data.App.userAuthorized)

    const dispatch = useDispatch()

    const clickHandler = async event => {
        event.preventDefault()
        setbtnLoading(true)
        let order_id = undefined
        if (user_cart.length === 0) {
            // нужно сделать запрос GET /current_cart/
            const get_cart_res = await (await fetch('http://localhost:8000/current_cart/', {
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    "X-CSRFToken": document.cookie
                        .split('; ')
                        .filter(row => row.startsWith('csrftoken='))
                        .map(c => c.split('=')[1])[0]
                }
            })).json()
            order_id = get_cart_res[0].id
            const add_to_cart = await (await fetch('http://localhost:8000/cart/', {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    "X-CSRFToken": document.cookie
                        .split('; ')
                        .filter(row => row.startsWith('csrftoken='))
                        .map(c => c.split('=')[1])[0]
                },
                body: JSON.stringify({
                    order_id: order_id,
                    game_id: game.id_game
                })
            })).json()
            console.log(add_to_cart)
            setbtnLoading(false)
        }
        else order_id = user_cart[0].order_id
        // Проверим, есть ли данная игра в списке или нет
        const shoold_add = user_cart.filter(item => item.game_id.id === game.id_game).length === 0
        if (shoold_add) {
            // осталось сделать POST /cart/ с параметрами order_id и game_id
            const add_to_cart = await (await fetch('http://localhost:8000/cart/', {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    "X-CSRFToken": document.cookie
                        .split('; ')
                        .filter(row => row.startsWith('csrftoken='))
                        .map(c => c.split('=')[1])[0]
                },
                body: JSON.stringify({
                    order_id: order_id,
                    game_id: game.id_game
                })
            })).json()
            console.log(add_to_cart)
            setbtnLoading(false)
        }
        console.log('Данная игра уже в вашей корзине!')
        setbtnLoading(false)
    }

    useEffect(() => {

        dispatch(fetchGameInfo(id_game))

    }, [])

    return (
        <>
            <div className={`main-container ${loadingStatus && 'containerLoading'}`}>
                {loadingStatus ? <div className={"hide-while-loading-page"}><Spinner animation="border"/></div> :
                    <>
                        <BasicBreadcrumbs props={[
                            {
                                ref: '/',
                                text: 'Главная страница'
                            },
                            {
                                ref: '/games',
                                text: 'Список игр'
                            },
                            {
                                ref: `games/${id_game}`,
                                text: `${game.game_name}`
                            }
                        ]}/>
                        <div className={"container"}>
                            {!game.id_game ? <div className={"empty-result-message"}><h1>Кажется, в нашем магазине нет такой игры :(</h1></div>:
                                <>
                                    <Row xs={1} md={1} sm={1} lg={2} className="grid">
                                        <Col  className={"img"}>
                                            <img src={`http://localhost:3000/${game.game_image}`}
                                                 alt={"game"} className={"game-img"} />
                                        </Col>
                                        <Col className={"info"}>
                                            <GameFullInfo {...game}/>
                                            <br/>
                                            <div className={"game-cost"}>
                                                Стоимость: {game.price} ₽
                                            </div>
                                            {!userStatus? undefined:
                                                <div className={"add-to-cart-btn"}>
                                                    <Button onClick={clickHandler}
                                                            disabled={btnLoaidng}
                                                            variant="primary">Добавить в корзину</Button>
                                                </div>
                                            }
                                        </Col>
                                    </Row>
                                </>
                            }
                        </div>
                    </>
                }
            </div>
        </>
    );

}

export default GamePage;