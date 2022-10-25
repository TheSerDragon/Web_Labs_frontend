import {Link} from "react-router-dom";

export const Header = () =>{
    return (
        <div style={{display:"flex", width:"100vw", justifyContent:"center", gap:"20px"}}>
            <Link to="/">Главная страница</Link>
            <Link to="/new">Новая страница</Link>
        </div>
    )
}