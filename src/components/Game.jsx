export const Game = ({game}) => {
    return (
        <div className="info">
            <p>{game.image}</p>
            <div className="info-text">
                <p>{game.name}</p>
                <p>Жанр: {game.genre}</p>
                <p>Дата выхода: {game.date_release}</p>
                <p>Описание: {game.description}</p>
            </div>
        </div>
    )
}