import RessourceUser from "../Ressource/RessourceUser";
import CreateNote from "../Note/CreateNote";
import { useSelector } from "react-redux";
import Header from "../header/Header";
import { useState } from "react";

const DashboardUser = () => {
  // faire en sorte que le user puisse choisir entre rendre public ou prive son compte
  // mettre les catégorie en place
  const [toggle, setToggle] = useState(true);
  return (
    <div>
      <h1>Tableau de Bord</h1>
      <button onClick={() => setToggle(!toggle)}>
        {toggle ? `Voir mes ressources` : `Voir mes notes`}
      </button>
      <h2>{toggle ? `Mes ressources` : `Mes notes`}</h2>
      {toggle ? <RessourceUser /> : <CreateNote />}
    </div>
  );
};

export default DashboardUser;
