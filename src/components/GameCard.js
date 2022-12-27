import {Button, Card} from "react-bootstrap";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import "../styles/GameCardStyle.css";
import {useDispatch, useSelector} from "react-redux";
import {createAction_setUserCart} from "../store/actionCreators/AppActionsCreators";
import Modal from 'react-bootstrap/Modal';
import {TextField} from "@mui/material";
import api_socket from "../network";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import Select from "react-select";
import CreatableSelect from 'react-select/creatable';
import {createAction_setGameList} from "../store/actionCreators/StartPageActionCreators";

const GameCard = ({game, is_manager}) => {

    const [btnLoading, setbtnLoading] = useState(false)
    const user_cart = useSelector(state => state.cached_data.App.userCart)
    const userStatus = useSelector(state => state.cached_data.App.userAuthorized)
    const game_list = useSelector(state => state.cached_data.StartPage.gameList)
    const [name, setName] = useState(game.game_name)
    const [price, setPrice] = useState(game.price)
    const [show, setShow] = useState(false);
    const [nameField, setNameField] = useState(name);
    const [priceField, setPriceField] = useState(price);
    const [releaseDate, setReleaseDate] = useState(game.date_release);
    const [description, setDescription] = useState(game.description);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch()

    const clickHandler = async event => {
        event.preventDefault()
        setbtnLoading(true)
        let order_id
        let cur_cart
        if (user_cart.length === 0) {
            // нужно сделать запрос GET /current_cart/
            const get_cart_res = await (await fetch(`http://${api_socket}/current_cart/`, {
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
            const add_to_cart = await (await fetch(`http://${api_socket}/cart/`, {
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
            {!is_manager ? undefined :
                <>
                    <Button onClick={event => {
                        event.preventDefault()
                        handleShow()
                    }}
                    >
                        Изменить
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Редактирование информации об игре</Modal.Title>
                        </Modal.Header>
                        <Modal.Body
                            style={{
                                gap:"10px",
                                display: "flex",
                                flexDirection: "column"
                            }}
                        >
                            <TextField id="change-game-name" label={"Название игры"} variant="outlined"
                                       value={nameField}
                                       onChange={event => {
                                           event.preventDefault()
                                           setNameField(event.target.value)
                                       }}
                                       style={{width:"100%"}}
                            />
                            <TextField id="change-game-price" label={"Стоимость игры"} variant="outlined"
                                       value={priceField}
                                       onChange={event => {
                                           event.preventDefault()
                                           setPriceField(event.target.value)
                                       }}
                                       style={{width:"100%"}}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Дата выхода"
                                    value={releaseDate}
                                    onChange={(newValue) => {
                                        setReleaseDate(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                    inputFormat="DD/MM/YYYY"
                                />
                            </LocalizationProvider>
                            <TextField
                                id="change-game-description"
                                label={"Описание игры"}
                                variant="outlined"
                                value={description}
                                onChange={event => {
                                    event.preventDefault()
                                    setDescription(event.target.value)
                                }}
                                style={{width:"100%"}}
                                multiline={true}
                                rows={10}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant={"primary"} onClick={event => {
                                event.preventDefault()
                                // логика и запрос изменения игры
                                const options = {
                                    method: 'PATCH',
                                    credentials: 'include',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        "X-CSRFToken": document.cookie
                                            .split('; ')
                                            .filter(row => row.startsWith('csrftoken='))
                                            .map(c => c.split('=')[1])[0]
                                    },
                                    body: JSON.stringify({
                                        game_name: nameField,
                                        price: priceField,
                                        date_release: releaseDate,
                                        description: description
                                    })
                                };
                                fetch(`http://${api_socket}/games/${game.id_game}/`, options)
                                    .then(response => response.json())
                                    .then(response => console.log(response))
                                    .then(() => {
                                        setName(nameField)
                                        setPrice(priceField)
                                    })
                                    .catch(err => console.error(err));
                                handleClose()
                            }
                            }>
                                Сохранить
                            </Button>
                            <Button variant={"secondary"} onClick={handleClose}>
                                Закрыть
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Button
                        onClick={event => {
                            const options = {
                                credentials: 'include',
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                    "X-CSRFToken": document.cookie
                                        .split('; ')
                                        .filter(row => row.startsWith('csrftoken='))
                                        .map(c => c.split('=')[1])[0]
                                },
                                body: JSON.stringify({
                                    shown: 0
                                })
                            };
                            fetch(`http://${api_socket}/games/${game.id_game}/`, options)
                                .then(response => response.json())
                                .then(response => {
                                    console.log(response)
                                    dispatch(createAction_setGameList(game_list.filter(item => item.id !== game.id_game)))
                                })
                                .catch(err => console.error(err));
                        }
                        }>
                        Удалить
                    </Button>
                </>
            }
        </Card.Body>
    </Card>
}

export default GameCard;