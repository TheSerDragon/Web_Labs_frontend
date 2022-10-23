import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

import './main.css';
import ps from './ps.jpg';
import god from './god.jpeg';
import cod from './cod.jpeg';
import protocol from './protocol.png';

function App() {

    return (
        <BrowserRouter basename="/" >
            <div>
                <a href="/"><img src={ps} className="PS"/></a>
                <Route exact path="/">
                    <h1>Здравствуй, дорогой покупатель. Добро пожаловать в магазин PlayStation!</h1>
                </Route>
                <hr />
                <ul>
                    <li>
                        <Link to="/game1">God of War: Ragnarok</Link>
                    </li>
                    <li>
                        <Link to="/game2">Call of Duty: Modern Warfare II</Link>
                    </li>
                    <li>
                        <Link to="/game3">The Callisto Protocol</Link>
                    </li>
                </ul>
                <Switch>
                    <Route path="/game1">
                        <div className="info">
                            <img src={god} className="IMG"/>
                            <div className="info-text">
                                <h2>God of War: Ragnarok</h2>
                                <ul>
                                    <li>Жанр: экшен</li>
                                    <li>Дата выхода: 9 ноября 2022 года</li>
                                    <li>Описание: Присоединяйтесь к Кратосу и Атрею в мифическом путешествии за ответами до прихода Рагнарека. Вместе отец и сын должны поставить на карту все, отправляясь в каждое из Девяти Царств.
                                        Среди потрясающих мифологических пейзажей они столкнутся со страшными врагами – от скандинавских богов до диких зверей – готовясь к решающему сражению в своей жизни.
                                        Вооруженный своим надежным оружием войны, смертоносные навыки Кратоса будут испытаны как никогда прежде, когда он будет сражаться, чтобы защитить свою семью.</li>
                                </ul>
                            </div>
                        </div>
                    </Route>
                    <Route path="/game2">
                        <div className="info">
                            <img src={cod} className="IMG"/>
                            <div className="info-text">
                                <h2>Call of Duty: Modern Warfare II</h2>
                                <ul>
                                    <li>Жанр: шутер</li>
                                    <li>Дата выхода: 28 октября 2022 года</li>
                                    <li>Описание: Добро пожаловать в новую эру Call of Duty®.
                                        Call of Duty®: Modern Warfare II погружает игроков в беспрецедентный глобальный конфликт, в котором участвуют культовые операторы Task Force 141.
                                        Infinity Ward предлагает фанатам ультрасовременный игровой процесс с совершенно новым управлением оружием, продвинутой системой искусственного интеллекта, новым оружейником и набором других игровых и графических инноваций, которые поднимают франшизу на новые высоты.</li>
                                </ul>
                            </div>
                        </div>
                    </Route>
                    <Route path="/game3">
                        <div className="info">
                            <img src={protocol} className="IMG"/>
                            <div className="info-text">
                                <h2>The Callisto Protocol</h2>
                                <ul>
                                    <li>Жанр: хоррор</li>
                                    <li>Дата выхода: 2 декабря 2022 года</li>
                                    <li>Описание: В этой повествовательной игре ужасов на выживание от третьего лица, действие которой разворачивается через 300 лет в будущем, игроку предстоит взять на себя роль Джейкоба Ли - жертвы судьбы, брошенной в тюрьму "Блэк Айрон", тюрьму строгого режима, расположенную на спутнике Юпитера Каллисто.
                                        Когда заключенные начинают превращаться в чудовищных существ, тюрьма погружается в хаос. Чтобы выжить, Джейкоб должен пробиться в безопасное место, одновременно раскрывая темные и тревожные секреты.</li>
                                </ul>
                            </div>
                        </div>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;