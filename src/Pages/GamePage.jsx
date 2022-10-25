import {useParams} from "react-router";
import {Game} from "../components/Game";
import {Link} from "react-router-dom";

export const GamePage = ({games}) =>{
    const {id} = useParams()
    const game = games.filter(game=>game.id === +id)
    return (
        game[0] ?
            <div>
                <Link to="/">Главная</Link>/<Link to={`/game/${game[0].id}`}>{game[0].name}</Link>
                <Game game={game[0]}/>
            </div>:
            <h1>Такой игры нет:(</h1>)
}