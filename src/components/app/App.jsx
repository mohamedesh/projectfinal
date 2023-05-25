import Header from "../Element/Header"
import Login from "../login/Login";
import {Routes,Route} from "react-router-dom";
import DashboardUser from "../DashBoard/DashboardUser";

const App = () =>{
    return (
        <div className={`container`}>
            <Header/>

            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/dashboard" element={<DashboardUser/>}/>
            {/*    categorie*/}
            </Routes>

        </div>
    )
}

export default App