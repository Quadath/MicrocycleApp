import "./Header.sass"
import { Link } from "react-router-dom"

export default function Header() {
    return (
        <header className="app-header">
            <Link to="/" className="app-header-logo">Microcycle app</Link>
            <div className="app-header-links">
                <Link to="/auth/register">Register</Link>
            </div>
        </header>
    )
}