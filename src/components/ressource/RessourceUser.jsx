import { useDispatch, useSelector } from "react-redux";
import {
  deleteRessource,
  categoryChange,
  postRessource,
  updateRessource,
  getRessourceByUserId,
} from "../../redux/reducers/ressource.slice";
import { useEffect, useState } from "react";
import mc from "./ressource.module.scss";
import { getCategorie } from "../../redux/reducers/categorie.slice";

const RessourceUser = () => {
  const [handleRessource, setHandleRessource] = useState({});
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [shareRessource, setShareRessource] = useState(false);

  const dispatch = useDispatch();
  const { title, url, description, ressourcesByUserId, loading } = useSelector(
    (store) => store.ressource
  );
  const { users } = useSelector((store) => store.persistedReducer);
  const { categoriesRessource } = useSelector((store) => store.categories);
  console.log(categoriesRessource);
  console.log(ressourcesByUserId);

  useEffect(() => {
    dispatch(getRessourceByUserId(users.id));
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
    toggleModal();
  };

  const handleShare = async (id) => {
    setShareRessource(!shareRessource);
    await dispatch(
      updateRessource({
        shareRessource,
        id: id,
      })
    );
  };
  // supprimer ressources
  const deleteRessourceId = (id) => {
    dispatch(deleteRessource(id));
  };
  // modifier ressource

  const toggleModal = () => {
    setShowModal(!showModal);
    setHandleRessource({});
    setVisible(false);
  };

  const handleModificated = (
    id,
    editTitle,
    editUrl,
    editDescription,
    editCategorieId
  ) => {
    toggleModal();
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
    setShowModal(null);
  };

  return (
    <div className={`${mc.ressourceUser}`}>
      <button className={` ${mc.submit}`} onClick={toggleModal}>
        +
      </button>
      {showModal ? (
        <section className={`${mc.form}`}>
          {visible ? (
            <div className={`overlay`}>
              <div className={`modal`}>
                <div className={`buttonCard flex jc-end `}>
                  <button onClick={toggleModal}>X</button>
                </div>
                <form
                  onSubmit={handleUpdate}
                  className={`flex direction-column  jc-end`}
                >
                  <h2>Modification Ressource</h2>
                  <select
                    className={`${mc.categorie}`}
                    onChange={(e) => {
                      handleCategoryChange(e);
                    }}
                    name=""
                    id=""
                  >
                    <option value="">Sélectionnez une catégorie</option>
                    {categoriesRessource.map((elt) => (
                      <option key={elt.id} value={elt.id}>
                        {elt.name}
                      </option>
                    ))}
                  </select>
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
              </div>
            </div>
          ) : (
            <div className={`overlay`}>
              <div className={`modal`}>
                <div className={`buttonCard flex jc-end `}>
                  <button onClick={toggleModal}>X</button>
                </div>
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
                    {categoriesRessource.map((elt) => (
                      <option key={elt.id} value={elt.id}>
                        {elt.name}
                      </option>
                    ))}
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
              </div>
            </div>
          )}
        </section>
      ) : null}

      <section className={`${mc.ressource} `}>
        {ressourcesByUserId.length === 0 ? (
          <p>Tu n'as pas encore publier de ressources sur ta page !! </p>
        ) : (
          categoriesRessource.map((categorie) => (
            <div key={categorie.id}>
              <h2>{categorie.name}</h2>
              <div className={`${mc.categorieRessource}`}>
                {ressourcesByUserId.map((ressource) => {
                  if (categorie.id === ressource.categorieId) {
                    return (
                      <article className={`${mc.card} `} key={ressource.id}>
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
                        <h3 className={`${mc.title}`}>{ressource.title}</h3>
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
                        <button
                          className={`submit `}
                          onClick={() => {
                            handleShare(ressource.id);
                          }}
                        >
                          {ressource.shareRessource ? "Non Partage" : "Partage"}
                        </button>
                      </article>
                    );
                  }
                })}
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};
export default RessourceUser;
