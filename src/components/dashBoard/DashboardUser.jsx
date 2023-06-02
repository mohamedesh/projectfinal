import RessourceUser from "../ressource/RessourceUser";
import Note from "../note/Note";
import { useSelector } from "react-redux";
import Header from "../header/Header";
import { useState } from "react";
import mc from "./dashboard.module.scss";

const DashboardUser = () => {
  // faire en sorte que le user puisse choisir entre rendre public ou prive son compte
  // mettre les catégorie en place
  const [toggle, setToggle] = useState(true);
  return (
    <main className={`container`}>
      <h1>Tableau de Bord</h1>
      <button
        className={`${mc.btnDashboard}`}
        onClick={() => setToggle(!toggle)}
      >
        {toggle ? `Mes notes` : `Mes ressources`}
      </button>
      <h2>{toggle ? `Mes ressources` : `Mes notes`}</h2>
      {toggle ? <RessourceUser /> : <Note />}
    </main>
  );
};

export default DashboardUser;
