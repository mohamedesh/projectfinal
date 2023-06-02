import { NavLink, useNavigate } from "react-router-dom";
import mc from "./header.module.scss";
import { removeItem } from "../../utilitaire/storage.utilitaire";
import { useState } from "react";
import SignIn from "../sign-in/SignIn";
import { useDispatch, useSelector } from "react-redux";
import SignUp from "../sign-up/SignUp";
import { userLogout } from "../../redux/reducers/user.slice";

const Header = () => {
  const navigate = useNavigate();
  const logout = () => {
    removeItem("token");
    navigate("/");
    dispatch(userLogout());
    setShowSignIn(false);
    setShowSignUp(false);
  };

  const dispatch = useDispatch();
  const { isLogged, users } = useSelector((store) => store.persistedReducer);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleButtonSignIn = () => {
    setShowSignIn(!showSignIn);
  };
  const handleButtonSignUp = () => {
    setShowSignUp(!showSignUp);
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
            <NavLink to={"/dashboard"}>Tableau de bord</NavLink>
          </li>
          <li>
            <NavLink to={"/discovery"}>Découvrir</NavLink>
          </li>
        </ul>
      </nav>
      {isLogged ? (
        <div className={`${mc.connect} ${mc.nameUser}`}>
          <p>{users.surname}</p>
          <p>{users.name}</p>
          <button className={mc.logout} onClick={logout}>
            Deconnexion
          </button>
        </div>
      ) : (
        <div className={mc.connect}>
          <div>
            <button className={`submit`} onClick={handleButtonSignIn}>
              Connexion
            </button>

            {showSignIn && (
              <div className={`overlay`}>
                <div className={`modal`}>
                  <div className={`buttonCard flex jc-end`}>
                    <button onClick={handleButtonSignIn}>X</button>
                  </div>
                  <SignIn />
                </div>
              </div>
            )}
          </div>
          <div>
            <button className={`submit`} onClick={handleButtonSignUp}>
              Inscription
            </button>

            {showSignUp && (
              <div className={`overlay`}>
                <div className={`modal`}>
                  <div className={`buttonCard flex jc-end`}>
                    <button onClick={handleButtonSignUp}>X</button>
                  </div>
                  <SignUp />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
export default Header;
