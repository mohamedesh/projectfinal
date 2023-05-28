import { NavLink, useNavigate } from "react-router-dom";
import mc from "./header.module.scss";
import { removeItem } from "../../utilitaire/storage.utilitaire";
import { useState } from "react";
import SignIn from "../sign-in/SignIn";
import { useDispatch, useSelector } from "react-redux";
import { showButton, hideButton } from "../../redux/reducers/button.slice";
const Header = () => {
  const navigate = useNavigate();
  const logout = () => {
    removeItem("token");
    navigate("/");
  };

  const dispatch = useDispatch();
  const { isButtonVisible } = useSelector((store) => store.button);

  const handleShowButton = () => {
    dispatch(showButton());
  };
  const handleHideButton = () => {
    dispatch(hideButton());
  };

  return (
    <header className="flex jc-space-between ai-center">
      <NavLink to={"/"}>
        <div className={mc.logo}>
          <p>Good</p>
          <span>Corner</span>
        </div>
      </NavLink>
      <nav>
        <input type="checkbox" id={`${mc.burgertoggle}`} />
        <label htmlFor={`${mc.burgertoggle}`} className={`${mc.burger}`}>
          <span className={`${mc.bar} `}></span>
        </label>

        {/* Contenu de la barre latérale */}
        <ul
          className={`flex jc-evenly direction-column ai-center ${mc.navlist} `}
        >
          <li>
            <NavLink to={"/"}>Accueil</NavLink>
          </li>
          <li>
            <NavLink to={"/about"}>A propos </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard"}>Page de bord</NavLink>
          </li>
          <li>
            <NavLink to={"/categorie"}>Catégories</NavLink>
          </li>
        </ul>
      </nav>

      <div className={mc.connect}>
        <button className={mc.logout} onClick={logout}>
          Deconnexion
        </button>
      </div>
    </header>
  );
};
export default Header;
