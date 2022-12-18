import {Button, Card} from "react-bootstrap";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import "../styles/GameCardStyle.css";
import {useDispatch, useSelector} from "react-redux";
import {setUserCart} from "../store/actions/AppActions";
import {createAction_setUserCart} from "../store/actionCreators/AppActionsCreators";

const GameCard = (game) => {

    const [btnLoading, setbtnLoading] = useState(false)
    const user_cart = useSelector(state => state.cached_data.App.userCart)
    const userStatus = useSelector(state => state.cached_data.App.userAuthorized)
    const game_list = useSelector(state => state.cached_data.StartPage.gameList)
    const dispatch = useDispatch()

    const clickHandler = async event => {
        event.preventDefault()
        setbtnLoading(true)
        let order_id
        let cur_cart
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
            if (get_cart_res[0].order_id) order_id = get_cart_res[0].order_id
            else order_id = get_cart_res[0].id
            cur_cart = get_cart_res
        }
        else {
            cur_cart = user_cart
            if (cur_cart[0].order_id) order_id = cur_cart[0].order_id
            else order_id = cur_cart[0].id
            console.log(order_id)
        }
        // Проверим, есть ли данная игра в списке или нет
        console.log(cur_cart)
        const should_add = cur_cart[0].order_id === undefined || cur_cart.filter(item => item.game_id.id === game.id_game).length === 0
        if (should_add) {
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
            dispatch(createAction_setUserCart(user_cart.concat({
                game_id: game_list.filter(item => item.id_game === game.id_game)[0],
                id_game: add_to_cart.id_game,
                order_id: order_id

            })))
            setbtnLoading(false)
            console.log('Игра была добавлена в корзину!')
        }
        else console.log('Данная игра уже в вашей корзине!')
        setbtnLoading(false)
    }

    return <Card>
        <Link to={`/games/${game.id_game}`}>
            <Card.Img variant="top" src={`http://localhost:3000/${game.game_image}`}/>
        </Link>
        <Card.Body>
            <Link to={`/games/${game.id_game}`}>
                <Card.Title>{game.game_name}</Card.Title>
            </Link>
            <div className={"card-info"}>
                <div className={"game-platform"}>
                    Платформа: {game.platform.plat_name}
                </div>
                <div className={"game-genre"}>
                    Жанр: {game.genre.genre_name}
                </div>
                <div className={"one_instance_price"}>
                    Стоимость: {game.price} ₽
                </div>
            </div>
            {!userStatus ? undefined:
                <div className={"card-link-to"}>
                    <Button variant="primary" disabled={btnLoading} onClick={clickHandler}>Добавить в корзину</Button>
                </div>
            }
        </Card.Body>
    </Card>
}

export default GameCard;

/*import {Button, Card} from "react-bootstrap";
import React from "react";
import {Link} from "react-router-dom";
import "../styles/GameCardStyle.css";

const GameCard = (game) => {
    return <Card>
        <Link to={`/games/${game.id_game}`}>
            <Card.Img variant="top" src={`http://localhost:3000/${game.game_image}`}/>
        </Link>
        <Card.Body>
            <Link to={`/games/${game.id_game}`}>
                <Card.Title>{game.game_name}</Card.Title>
            </Link>
            <div className={"card-info"}>
                <div className={"game-platform"}>
                    Платформа: {game.platform.plat_name}
                </div>
                <div className={"game-genre"}>
                    Жанр: {game.genre.genre_name}
                </div>
                <div className={"one_instance_price"}>
                    Стоимость: {game.price} ₽
                </div>
            </div>
            <div className={"card-link-to"}>
                <Button href={`http://localhost:3000/games`} target="" variant="primary">Добавить в корзину</Button>
            </div>
        </Card.Body>
    </Card>
}

export default GameCard; */