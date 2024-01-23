import { Link } from "react-router-dom"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import "./Header.sass"

export default function Header() {
    const {user, loading} = useTypedSelector(state => state.session)
    return (
        <header className="app-header">
            <Link to="/" className="app-header-logo" id="logo">Microcycle app</Link>
            <div className="app-header-links">
                {
                    loading ? 
                    <>
                    loading...
                    </> 
                    :
                    user ? 
                    <Link to="/user">
                        {user.name}
                    </Link>
                    :
                    <>
                        <Link to="/auth/login">Login</Link>
                        <Link to="/auth/register">Register</Link>
                    </>
                }
            </div>
        </header>
    )
}