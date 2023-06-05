import RessourceUser from "../ressource/RessourceUser";
import Note from "../note/Note";
import { useState } from "react";
import mc from "./dashboard.module.scss";

const DashboardUser = () => {
  const [toggle, setToggle] = useState(true);

  return (
    <main className={`container`}>
      <h1>Tableau de Bord</h1>
      <section>
        <button
          className={`${mc.btnDashboard} selectNone`}
          onClick={() => setToggle(!toggle)}
          aria-label={toggle ? "Afficher mes notes" : "Afficher mes ressources"}
        >
          {toggle ? `Mes notes` : `Mes ressources`}
        </button>
        <h2>{toggle ? `Mes ressources` : `Mes notes`}</h2>
        {toggle ? <RessourceUser /> : <Note />}
      </section>
    </main>
  );
};

export default DashboardUser;
