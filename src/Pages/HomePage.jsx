import {Link} from "react-router-dom";
import {games} from "../games";
import {useEffect, useState} from "react";
import ps from "../ps.jpg";

export const HomePage = () =>{
    /*хук useState позволяет менять значение состояния */
    const [display, setDisplay] = useState(false)
    const [game, setGame] = useState(games[0])
    /*[значение, обработчик] */
    useEffect(()=>{setGame(games[Math.floor(Math.random()*games.length)])},[display])
    return <div>
        {games && (
            <>
                <Link to="/">Главная</Link>
                <img src={ps} className="PS"/>
                <h1>Здравствуй, дорогой покупатель. Добро пожаловать в магазин PlayStation!</h1>
                <p>Список игр:</p>
                <button onClick={()=>setDisplay((prev)=>!prev)}>{display? "Скрыть" : "Показать"}</button>
            {display && <div style={{display: "flex", flexDirection: "column"}}>
            {games.map(game => <Link to={`/game/${game.id}`} key={game.id}>{game.id}. {game.name}</Link>)}
                </div>}
            </>
                )}
    </div>
}