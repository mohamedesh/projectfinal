import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategorie,
  getRessourceByCategorieId,
} from "../../redux/reducers/categorie.slice";
import { useParams } from "react-router-dom";
import mc from "./categorie.module.scss";
import Loader from "../loader/Loader";

const Categorie = () => {
  const dispatch = useDispatch();
  const { categoriesRessource, ressourcesByCategorie, loading } = useSelector(
    (store) => store.categories
  );

  const params = useParams();
  const id = parseInt(params.id);
  useEffect(() => {
    dispatch(getRessourceByCategorieId(id));
  }, [id]);

  useEffect(() => {
    dispatch(getCategorie());
  }, []);
  return (
    <main>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1>
            {categoriesRessource.map((categorie) => {
              if (categorie.id === id) {
                return categorie.name;
              }
            })}
          </h1>
          <div className={`${mc.cardContainer}`}>
            {ressourcesByCategorie.map((elt) => (
              <article className={`${mc.card} `} key={elt.id}>
                <h3 className={`${mc.title}`}>{elt.title}</h3>
                <p className={`${mc.url}`}>
                  <a
                    href={
                      elt.url.startsWith("https://")
                        ? elt.url
                        : `https://${elt.url}`
                    }
                    target={"_blank"}
                  >
                    {elt.url}
                  </a>
                </p>
                <p className={`${mc.description}`}>
                  Description:{elt.description}
                </p>
              </article>
            ))}
          </div>
        </>
      )}
    </main>
  );
};
export default Categorie;
