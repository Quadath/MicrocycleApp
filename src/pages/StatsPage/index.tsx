import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector"
import "./StatsPage.sass"

export default function StatsPage() {

    const {user} = useTypedSelector(state => state.session)

    const navigate = useNavigate();
    useEffect(() => {
        if (!user)  {
            navigate('/auth/login')
        }
    }, [user, navigate])
    return (
        <div className="stats-page">
            <h2>Stats</h2>
            {!user?.stats && <h3>No stats yet</h3> }
        </div>
    )
}