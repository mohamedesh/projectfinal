import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiscoveryRessources } from "../../redux/reducers/ressource.slice";
import mc from "../Ressource/createRessource.module.scss";

const Discovery = () => {
  const dispatch = useDispatch();
  const { shareRessources } = useSelector((store) => store.ressource);
  const { categoriesRessource } = useSelector((store) => store.categories);
  console.log(shareRessources);

  useEffect(() => {
    dispatch(getDiscoveryRessources());
  }, []);

  return (
    <div>
      {categoriesRessource.map((categorie) => (
        <>
          <h1>{categorie.name}</h1>
          <div className={`${mc.categorieRessource}`}>
            {shareRessources.map((ressource) => {
              if (categorie.id === ressource.categorieId) {
                return (
                  <article className={`${mc.card} `} key={ressource.id}>
                    <p className={`${mc.title}`}>{ressource.title}</p>
                    <p className={`${mc.url}`}>
                      <a href={ressource.url}>{ressource.url}</a>
                    </p>
                    <p className={`${mc.description}`}>
                      Description :{ressource.description}
                    </p>
                  </article>
                );
              }
            })}
          </div>
        </>
      ))}
    </div>
  );
};

export default Discovery;
