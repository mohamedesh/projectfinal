import RessourceUser from "../Ressource/RessourceUser";
import CreateNote from "../Note/CreateNote";
import { useSelector } from "react-redux";
import Header from "../header/Header";

const DashboardUser = () => {
  // faire en sorte que le user puisse choisir entre rendre public ou prive son compte
  // mettre les catégorie en place
  const { notes } = useSelector((store) => store.note);
  console.log();
  return (
    <div>
      <h1>Page de Bord</h1>
      <RessourceUser />
      <CreateNote />
    </div>
  );
};

export default DashboardUser;
