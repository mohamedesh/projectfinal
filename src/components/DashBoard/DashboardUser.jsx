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
      <h2>Ressource</h2>
      <RessourceUser />
      <h2>Note</h2>
      <CreateNote />
    </div>
  );
};

export default DashboardUser;
