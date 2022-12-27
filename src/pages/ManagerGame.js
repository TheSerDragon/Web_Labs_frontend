import React, {useEffect, useState} from "react"
import {Button, Spinner} from "react-bootstrap"
import {TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import api_socket from "../network";
import {fetchGenres} from "../store/middlewares/AppMiddlewares";
import {useDispatch, useSelector} from "react-redux";
import {user_is_manager} from "../modules";


function ManagerGame() {

    const [loading, setLoading] = useState(false);
    const [btnLoading, setbtnLoading] = useState(false);
    const gameGenres = useSelector(state => state.cached_data.App.gameGenres);
    const userStatus = useSelector(state => state.cached_data.App.userAuthorized);
    const [nameField, setNameField] = useState('');
    const [priceField, setPriceField] = useState('');
    const [releaseDate, setReleaseDate] = useState(null);
    const [description, setDescription] = useState('');
    const dispatch = useDispatch()

    useEffect(() => {

        const loadData = async () => {
            setLoading(true)
            await dispatch(fetchGenres())
            setLoading(false)
        }
        loadData()

    }, [])

    return (
        <div
            className={"container"}
            style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "10px"
            }}
        >
            <div
                style={{
                    fontSize: "20px",
                    textAlign: "center",
                    marginBottom: "20px"
                }}
            >
                Добавление новой игры
            </div>
            {loading || !user_is_manager() || !userStatus ?
                <div
                    className={"hide-while-loading-page"}
                    style={{
                        alignSelf: "center"
                    }}
                >
                    <Spinner animation={"border"}/>
                </div>:
                <>
                    <TextField
                        required={true}
                        id="change-game-name"
                        label={"Название игры"}
                        variant="outlined"
                        value={nameField}
                        onChange={event => {
                            event.preventDefault()
                            setNameField(event.target.value)
                        }}
                        style={{width:"100%"}}
                    />
                    <TextField
                        id="change-game-price"
                        label={"Стоимость игры"}
                        variant="outlined"
                        value={priceField}
                        onChange={event => {
                            event.preventDefault()
                            setPriceField(event.target.value)
                        }}
                        style={{width:"100%"}}
                    />
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                    >
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
                    <Button
                        disabled={btnLoading}
                        onClick={event => {
                            event.preventDefault()
                            setbtnLoading(true)
                            let body = {}
                            if (nameField !== '') body.game_name = nameField
                            if (priceField !== '') body.price = priceField
                            if (releaseDate) body.date_release = new Date(releaseDate).toISOString().split('T')[0]
                            if (description !== '') body.description = description
                            const options = {
                                method: 'POST',
                                credentials: "include",
                                headers: {
                                    'Content-Type': 'application/json;charset=utf-8',
                                    "X-CSRFToken": document.cookie
                                        .split('; ')
                                        .filter(row => row.startsWith('csrftoken='))
                                        .map(c => c.split('=')[1])[0]
                                },
                                body: JSON.stringify(body)
                            }
                            fetch(`http://${api_socket}/games/`, options)
                                .then(response => {
                                    response.json()
                                    setbtnLoading(false)
                                })
                                .then(response => {
                                    console.log(response)
                                    setbtnLoading(false)
                                })
                                .catch(err => {
                                    console.error(err)
                                    setbtnLoading(false)
                                });
                        }}
                    >
                        Добавить игру
                    </Button>
                </>
            }
        </div>
    )
}

export default ManagerGame