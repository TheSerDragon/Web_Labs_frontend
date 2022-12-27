import {Button, Card} from "react-bootstrap";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import "../styles/GameCardStyle.css";
import {useDispatch, useSelector} from "react-redux";
import {createAction_setUserCart} from "../store/actionCreators/AppActionsCreators";
import api_socket from "../network";

const CartGameCards = (Game) => {
    console.log(Game)
    const user_cart = useSelector(state => state.cached_data.App.userCart)
    const [btnLoading, setbtnLoading] = useState(false)
    const dispatch = useDispatch()

    // Удаление
    const clickHandler = async event => {
        event.preventDefault()
        setbtnLoading(true)
        console.log(user_cart)
        const record_to_delete = user_cart.filter(item => item.game_id.id_game === Game.id_game)[0].id
        await fetch(`http://${api_socket}/cart/${record_to_delete}/`, {
            method: 'DELETE',
            credentials: "include",
            headers: {
                "X-CSRFToken": document.cookie
                    .split('; ')
                    .filter(row => row.startsWith('csrftoken='))
                    .map(c => c.split('=')[1])[0]
            }
        })
        dispatch(createAction_setUserCart(user_cart.filter(elem => elem.game_id.id_game !== Game.id_game)))
        setbtnLoading(false)
        console.log('Игра удалена из корзины!')
    }

    return (
        <Card>
            <Link to={`/games/${Game.id_game}`}>
                <Card.Img variant="top" src={`http://${window.location.host}/${Game.game_image}`}/>
            </Link>
            <Card.Body>
                <Link to={`/games/${Game.id_game}`}>
                    <Card.Title>{Game.game_name}</Card.Title>
                </Link>
                <div className={"card-info"}>
                    <div className={"one_instance_price"}>
                        Стоимость: {Game.price} ₽
                    </div>
                </div>
                <div className={"card-link-to"}>
                    <Button onClick={clickHandler} disabled={btnLoading} variant="primary">Удалить из корзины</Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default CartGameCards;