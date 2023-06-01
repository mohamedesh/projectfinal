import Header from "../header/Header";
import Login from "../login/Login";
import { Routes, Route } from "react-router-dom";
import DashboardUser from "../DashBoard/DashboardUser";
import About from "../about/About";
import SignIn from "../sign-in/SignIn";
import Accueil from "../accueil/Accueil";
import Categorie from "../Categorie/Categorie";
import Discovery from "../discovery/Discovery";

const App = () => {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<DashboardUser />} />
        <Route path="/categorie" element={<Categorie />} />
        <Route path="/discovery" element={<Discovery />} />

        {/*    categorie*/}
        {/*    ajoute categorie pr que au click sur une des categorie redirection vers la categorie est tous les element contenu */}
      </Routes>
    </div>
  );
};

export default App;
