import { ProjectList } from "../../components/ProjectList/Index";
import { useAuth } from "../../context/auth-context";


export const Home = () => {
    const { logout } = useAuth()
    return (
        <div>
            <button onClick={logout}>登出</button>
            <ProjectList />
        </div>
    )
}


