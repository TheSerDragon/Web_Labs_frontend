import {HomePage} from "./Pages/HomePage";
import {NewPage} from "./Pages/NewPage";
import {GamePage} from "./Pages/GamePage";
import {Header} from "./components/Header";
import {games} from "./games";
import {Navigate, Route, Routes} from "react-router";
import "./main.css";

function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/new" element={<NewPage/>}/>
                <Route path="/game/:id" element={<GamePage games={games}/>}/>
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
        </>
    );
}

export default App;