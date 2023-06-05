import React from "react";
import mc from "./about.module.scss";
const About = () => {
  return (
    <main className={`${mc.about} container`}>
      <h1>À propos</h1>
      <section>
        <article>
          <p>
            Bienvenue dans Good Corner, le trésor numérique qui ouvre les portes
            de l'inspiration. Notre plateforme innovante vous offre un espace
            dynamique où vous pouvez partager et explorer une multitude de liens
            fascinants, triés par catégories, pour satisfaire votre soif de
            découverte. Que vous soyez passionné de technologie, d'art, de
            cuisine, de voyage ou de tout autre sujet, Good Corner vous permet
            de créer votre propre collection de liens inspirants, mais aussi de
            plonger dans les trésors partagés par une communauté engagée.
          </p>
        </article>
        <article>
          <p>
            Grâce à notre interface conviviale et intuitive, vous pouvez
            facilement organiser vos liens préférés et les mettre à disposition
            de tous, ou les garder précieusement privés. L'expérience sur Good
            Corner est bien plus qu'une simple recherche de liens, c'est une
            véritable exploration interactive du web. Vous pouvez naviguer à
            travers les catégories, plonger dans les profondeurs du savoir et de
            la créativité, et partager vos trouvailles avec des personnes
            partageant les mêmes intérêts.
          </p>
        </article>
        <article>
          <p>
            Que vous recherchiez de nouvelles idées, des ressources pratiques ou
            simplement un échange stimulant, Good Corner est là pour vous
            accompagner. Notre communauté dynamique contribue constamment à
            l'enrichissement de notre trésor numérique, assurant ainsi une
            expérience toujours renouvelée. Osez vous aventurer dans les coins
            les plus intrigants, laissez-vous émerveiller par les liens qui
            transcendent les frontières et inspirent votre curiosité.
          </p>
        </article>
      </section>
    </main>
  );
};

export default About;
