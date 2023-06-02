import Header from "../header/Header";
import Login from "../login/Login";
import { Routes, Route } from "react-router-dom";
import DashboardUser from "../dashBoard/DashboardUser";
import About from "../about/About";
import SignIn from "../sign-in/SignIn";
import Accueil from "../accueil/Accueil";
import Categorie from "../categorie/Categorie";
import Discovery from "../discovery/Discovery";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<DashboardUser />} />
        <Route path={`/categorie/:id`} element={<Categorie />} />
        <Route path="/discovery" element={<Discovery />} />
      </Routes>
    </>
  );
};

export default App;
