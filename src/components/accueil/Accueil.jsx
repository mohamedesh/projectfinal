import React from "react";
import mc from "./accueil.module.scss";
import Login from "../login/Login";
import { useSelector } from "react-redux";
const Accueil = () => {
  const { isLogged } = useSelector((store) => store.persistedReducer);

  return (
    <main className={`${mc.homepage} container `}>
      <h1>Good Corner : Le trésor numérique des liens qui vous inspirent </h1>
      <section className={`${mc.home}`}>
        <article className={mc.text}>
          <p>
            Good Corner : Explorez un trésor numérique de liens inspirants.
            Partagez vos découvertes, plongez dans une collection organisée par
            catégories et connectez-vous à une communauté passionnée. Découvrez
            de nouvelles idées, trouvez des ressources pratiques et laissez-vous
            inspirer par les coins les plus intrigants du web. Rejoignez-nous
            dès aujourd'hui et explorez un monde de liens qui transcendent les
            frontières de la connaissance.
          </p>
        </article>
        {isLogged ? null : (
          <article className={mc.login}>
            <Login />
          </article>
        )}
      </section>
      }
    </main>
  );
};

export default Accueil;
