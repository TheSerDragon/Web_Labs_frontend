import {Link} from "react-router-dom";

export const NewPage = () =>{
    return <div>
        <Link to="/">Главная</Link>/<Link to="/new">Новая</Link>
        <h1>Страница с новыми играми</h1>
    </div>
}