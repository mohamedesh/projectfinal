import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiscoveryRessources } from "../../redux/reducers/ressource.slice";
import mc from "./discovery.module.scss";
import {
  getCategorie,
  selectCategorie,
} from "../../redux/reducers/categorie.slice";
import { NavLink } from "react-router-dom";
import Loader from "../loader/Loader";
const Discovery = () => {
  const dispatch = useDispatch();
  const { shareRessources, loading } = useSelector((store) => store.ressource);
  const { categoriesRessource, selectedCategorie } = useSelector(
    (store) => store.categories
  );
  useEffect(() => {
    dispatch(getDiscoveryRessources());
  }, []);

  useEffect(() => {
    dispatch(getCategorie());
  }, []);

  return (
    <main className={`container`}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {categoriesRessource.map((categorie) => (
            <section key={categorie.id}>
              <h2>{categorie.name}</h2>
              <section className={`${mc.categorieRessource}`}>
                {shareRessources.map((ressource) => {
                  if (categorie.id === ressource.categorieId) {
                    return (
                      <article className={`${mc.card} `} key={ressource.id}>
                        <h3 className={`${mc.title} ${categorie.name}`}>
                          {ressource.title}
                        </h3>
                        <p className={`${mc.url}`}>
                          <a
                            href={
                              ressource.url.startsWith("https://")
                                ? ressource.url
                                : `https://${ressource.url}`
                            }
                            target={"_blank"}
                          >
                            {ressource.url}
                          </a>
                        </p>
                        <p className={`${mc.description}`}>
                          Description :{ressource.description}
                        </p>
                      </article>
                    );
                  }
                })}
              </section>
              <div className={`flex jc-center ${mc.containerBtn}`}>
                <NavLink
                  className={`submit ${mc.btn}`}
                  to={`/categorie/${categorie.id}`}
                >
                  Voir plus
                </NavLink>
              </div>
            </section>
          ))}
        </>
      )}
    </main>
  );
};

export default Discovery;
