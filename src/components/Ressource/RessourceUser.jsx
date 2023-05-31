import { useDispatch, useSelector } from "react-redux";
import {
  deleteRessource,
  newState,
  categoryChange,
  postRessource,
  updateRessource,
  getCategorieWithRessource,
} from "../../redux/reducers/ressource.slice";
import { useEffect, useState } from "react";
import mc from "./createRessource.module.scss";

import { getCategorie } from "../../redux/reducers/categorie.slice";

const RessourceUser = () => {
  const [ressourcePost, setRessourcePost] = useState();
  const [handleRessource, setHandleRessource] = useState({});
  const [ressourceUpdate, setRessourceUpdate] = useState();
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const { title, url, description, categoriesRessourcesByUser } = useSelector(
    (store) => store.ressource
  );
  const { users } = useSelector((store) => store.persistedReducer);
  const { categoriesRessource } = useSelector((store) => store.categories);

  useEffect(() => {
    dispatch(getCategorieWithRessource(users.id));
  }, [users.id]);

  useEffect(() => {
    dispatch(getCategorie());
  }, []);

  // changer de categorie
  const handleCategoryChange = (e) => {
    setHandleRessource({
      ...handleRessource,
      categorieId: parseInt(e.target.value),
    });
  };

  const handleChange = async (e) => {
    e.preventDefault();
    await dispatch(postRessource(handleRessource));
    setHandleRessource(null);
  };

  const handleShare = () => {};

  // supprimer ressources
  const deleteRessourceId = (id) => {
    dispatch(deleteRessource(id));
  };
  // modifier ressource

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleModificated = (
    id,
    editTitle,
    editUrl,
    editDescription,
    editCategorieId
  ) => {
    setHandleRessource({
      id: id,
      title: editTitle,
      url: editUrl,
      description: editDescription,
      categorieId: editCategorieId,
    });
    setVisible(!visible);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setHandleRessource({ ...handleRessource, userId: users.id });

    dispatch(updateRessource(handleRessource));
    setHandleRessource(null);
  };
  console.log(categoriesRessourcesByUser);

  // ajoute ds les calculs la durée de temps du lien
  // acces de certaines fonctionnalités que pour l'admin
  // faire en sorte de pouvoir bloquer des sites malveillant comme des trucs bizar ou autres
  // retravailler les liens mettre une condition ternaire sur le fait si elles ont deja le http ou bien le rajouter au lien qu'elle donnent
  return (
    <div className={`${mc.ressourceUser}`}>
      <button onClick={toggleModal}>Crée Nouvelle Ressource</button>
      {showModal && (
        <section className={`${mc.form}`}>
          {visible ? (
            <div className={`overlay`}>
              <div className={`modal`}>
                <form
                  onSubmit={handleUpdate}
                  className={`flex direction-column  jc-end`}
                >
                  <h2>Modification Ressource</h2>
                  <span onClick={() => setRessourceUpdate(null)}>X</span>
                  <input
                    type="text"
                    placeholder="title"
                    value={!!handleRessource ? handleRessource.title : ""}
                    required={true}
                    onChange={(e) =>
                      setHandleRessource({
                        ...handleRessource,
                        title: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    placeholder="url"
                    value={!!handleRessource ? handleRessource.url : ""}
                    required={true}
                    onChange={(e) =>
                      setHandleRessource({
                        ...handleRessource,
                        url: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    placeholder="description"
                    value={!!handleRessource ? handleRessource.description : ""}
                    required={true}
                    onChange={(e) =>
                      setHandleRessource({
                        ...handleRessource,
                        description: e.target.value,
                      })
                    }
                  />
                  <input className={`submit`} type="submit" />
                </form>
                <button onClick={toggleModal}>Fermer</button>
              </div>
            </div>
          ) : (
            <div className={`overlay`}>
              <div className={`modal`}>
                <form
                  onSubmit={handleChange}
                  className={`flex direction-column  jc-end`}
                >
                  <h2>Nouvelle Ressource</h2>

                  <select
                    className={`${mc.categorie}`}
                    onChange={(e) => {
                      handleCategoryChange(e);
                    }}
                    name=""
                    id=""
                  >
                    <option value="">Sélectionnez une catégorie</option>
                    {categoriesRessource.map((element) =>
                      element.categorie.map((elt) => (
                        <option key={elt.id} value={elt.id}>
                          {elt.name}
                        </option>
                      ))
                    )}
                  </select>
                  <input
                    type="text"
                    placeholder="title"
                    value={!!handleRessource.title ? handleRessource.title : ""}
                    required={true}
                    onChange={(e) =>
                      setHandleRessource({
                        ...handleRessource,
                        title: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    placeholder="url"
                    value={!!handleRessource.url ? handleRessource.url : ""}
                    required={true}
                    onChange={(e) =>
                      setHandleRessource({
                        ...handleRessource,
                        url: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    placeholder="description"
                    value={
                      !!handleRessource.description
                        ? handleRessource.description
                        : ""
                    }
                    required={true}
                    onChange={(e) =>
                      setHandleRessource({
                        ...handleRessource,
                        description: e.target.value,
                      })
                    }
                  />
                  <input className={`submit`} type="submit" />
                </form>
                <button onClick={toggleModal}>Fermer</button>
              </div>
            </div>
          )}
        </section>
      )}

      <section className={`${mc.ressource} flex flex-wrap jc-between`}>
        {categoriesRessourcesByUser.length === 0 ? (
          <p>Tu n'as pas encore publier de ressources sur ta page !! </p>
        ) : (
          categoriesRessourcesByUser.map((categorie) => (
            <>
              <h1>{categorie.name}</h1>
              {categorie.Ressources.map((ressource) => (
                <article
                  className={`${mc.card} container-cards`}
                  key={ressource.id}
                >
                  <div className={`buttonCard flex ai-center jc-end`}>
                    <button
                      onClick={() => {
                        deleteRessourceId(ressource.id);
                      }}
                    >
                      X
                    </button>
                    <button
                      onClick={() => {
                        handleModificated(
                          ressource.id,
                          ressource.title,
                          ressource.url,
                          ressource.description,
                          ressource.categorieId
                        );
                      }}
                    >
                      <img
                        src="https://img.freepik.com/free-icon/settings-gear-symbol_318-10116.jpg?w=1380&t=st=1685139858~exp=1685140458~hmac=4f876b01062d8a249b61f75e689ef8b073e4c707cfff877cd4a2388e430c3061"
                        alt="settings"
                      />
                    </button>
                  </div>
                  <p>Titre :{ressource.title}</p>
                  <p>
                    Lien : <a href={ressource.url}>{ressource.url}</a>
                  </p>
                  <p>Description :{ressource.description}</p>
                  <button onClick={handleShare}>Partage</button>
                </article>
              ))}
            </>
          ))
        )}
      </section>
    </div>
  );
};
export default RessourceUser;
