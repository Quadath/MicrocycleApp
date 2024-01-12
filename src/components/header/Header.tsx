import "./Header.sass"
import { Link } from "react-router-dom"

export default function Header() {
    return (
        <header className="app-header">
            <Link to="/" className="app-header-logo" id="logo">Microcycle app</Link>
            <div className="app-header-links">
                <Link to="/auth/login">Login</Link>
                <Link to="/auth/register">Register</Link>
            </div>
        </header>
    )
}