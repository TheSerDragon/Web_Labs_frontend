import React from "react";
import "../styles/GameFullInfoStyle.css";

const GameFullInfo = (game) => {
    return <>
        <div className={"game-name"}>
            {game.game_name}
        </div>
        <div className={"game-platform"}>
            Платформа: {game.platform.plat_name}
        </div>
        <div className={"game-genre"}>
            Жанр: {game.genre.genre_name}
        </div>
        <div className={"game-publisher"}>
            Издатель: {game.publisher.pub_name}
        </div>
        {game.date_release? <div className={"game-release-date"}>
            Дата выхода: {game.date_release}
        </div>:null}
        {game.description? <div className={"game-description"}>
            Описание: {game.description}
        </div>:null}
    </>
}

export default GameFullInfo;