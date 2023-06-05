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
  const logout = async () => {
    removeItem("token");
    navigate("/");
    await dispatch(userLogout());
    setShowSignIn(false);
    setShowSignUp(false);
  };

  const dispatch = useDispatch();
  const { isLogged, users } = useSelector((store) => store.persistedReducer);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);
  console.log(isNavBarOpen);
  const handleButtonSignIn = () => {
    setShowSignIn(!showSignIn);
  };
  const handleButtonSignUp = () => {
    setShowSignUp(!showSignUp);
  };
  const handleNavLinkClick = () => {
    setIsNavBarOpen(false);
  };

  return (
    <header className="selectNone flex jc-space-between ai-center">
      <NavLink to={"/"}>
        <div className={`${mc.logo}`}>
          <p>Good</p>
          <span>Corner</span>
        </div>
      </NavLink>
      <nav>
        <div
          className={`${mc.burger}`}
          onClick={() => setIsNavBarOpen(!isNavBarOpen)}
        >
          <span className={`${mc.bar} `}></span>
        </div>

        <div className={`${mc.navlist} ${isNavBarOpen ? mc.open : ""} `}>
          <ul>
            <li>
              <NavLink to={"/"} onClick={handleNavLinkClick}>
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink to={"/about"} onClick={handleNavLinkClick}>
                A propos{" "}
              </NavLink>
            </li>
            {isLogged ? (
              <li>
                <NavLink to={"/dashboard"} onClick={handleNavLinkClick}>
                  Tableau de bord
                </NavLink>
              </li>
            ) : null}
            <li>
              <NavLink to={"/discovery"} onClick={handleNavLinkClick}>
                Découvrir
              </NavLink>
            </li>
          </ul>
          {isLogged ? (
            <section className={`${mc.connect}`}>
              <p className={`${mc.nameUser}`}>{users.pseudo}</p>
              <button className={mc.logout} onClick={logout}>
                Deconnexion
              </button>
            </section>
          ) : (
            <section className={mc.connect}>
              <div>
                <button
                  className={` ${mc.btnConnexion}`}
                  onClick={handleButtonSignIn}
                >
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
                <button
                  className={` ${mc.btnDeconnexion}`}
                  onClick={handleButtonSignUp}
                >
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
            </section>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Header;
