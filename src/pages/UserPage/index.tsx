import { Link, useNavigate } from "react-router-dom"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import "./UserPage.sass"
import { useEffect } from "react"

export default function UserPage() {
    const {user} = useTypedSelector(state => state.session)

    const navigate = useNavigate();
    useEffect(() => {
        if (!user)  {
            navigate('/auth/login')
        }
    }, [user, navigate])
    return (
        <div className="user-page">
            <h1>{user?.name}</h1>
            <Link to="/stats">
                <h2>Stats</h2>
            </Link>
        </div>
    )
}