import { Link, useNavigate } from "react-router-dom"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import "./UserPage.sass"
import { useEffect } from "react"

export default function UserPage() {
    const {user, loading: userLoading} = useTypedSelector(state => state.session)

    const navigate = useNavigate();
    useEffect(() => {
        if (!user && !userLoading)  {
            navigate('/auth/login')
        }
    }, [user, userLoading, navigate])
    return (
        <div className="user-page">
            <h1>{user?.name}</h1>
            <Link to="/trainings">
                <h2>Trainings</h2>
            </Link>
            <Link to="/stats">
                <h2>Stats</h2>
            </Link>
        </div>
    )
}