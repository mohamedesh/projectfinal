import { useEffect, useState } from "react";
import RessourceCategorie from "./RessourceCategorie";
import { useDispatch, useSelector } from "react-redux";
import { getCategorie } from "../../redux/reducers/categorie.slice";

const Categorie = () => {
  const dispatch = useDispatch();
  const { categoriesRessource } = useSelector((store) => store.categories);
  console.log(categoriesRessource);

  useEffect(() => {
    dispatch(getCategorie());
    console.log(getCategorie);
  }, []);

  // probleme à regler : a chaque raffraichiseement les categories disparaissent ,
  // il faut ajouter un form qui permet aux users d'ajouter directement leur link ds la catégorie
  // il faut regler l'affichage des link des lors que je clique sur catégorie
  return (
    <div>
      <h1>Catégories</h1>
      {categoriesRessource.map((elt) => (
        <article key={elt.id}>
          <p>{elt.name}</p>
        </article>
      ))}
    </div>
  );
};
export default Categorie;
