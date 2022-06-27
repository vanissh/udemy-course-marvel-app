import '../app/app.scss'
import { Link } from "react-router-dom";

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href="../app">
                    <span>Marvel </span>
                    information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><Link to="/">Characters</Link></li>
                    /
                    <li><Link to="/comics">Comics</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader
