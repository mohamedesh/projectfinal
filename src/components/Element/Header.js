import {NavLink, useNavigate} from "react-router-dom";
import mc from "./header.module.scss"
import {removeItem} from "../../utilitaire/storage.utilitaire";
const Header = ()=>{
const navigate = useNavigate()
    const logout = ()=>{
        removeItem("token")
        navigate("/")
    }
    return(
        <header className="flex jc-space-between ai-center" >
            <div>
            <p>Good</p>
            <span>Corner</span>
            </div>
            <nav>
                <ul className="flex jc-evenly ">
               <li> <NavLink to={"/dashboard"}>DashBoard</NavLink></li>
                <li><NavLink>Catégories</NavLink></li>
                </ul>
            </nav>
            <div>
                <button onClick={logout}>Deconnexion</button>
            </div>
        </header>
    )
}
export default Header