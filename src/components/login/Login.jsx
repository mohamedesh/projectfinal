import SignUp from "../sign-up/signUp";
import SignIn from "../sign-in/SignIn";
import Header from "../header/Header";
import mc from "./login.module.scss";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { echapValues } from "../../redux/reducers/user.slice";

const Login = () => {
  const dispatch = useDispatch();
  const [button, setButton] = useState(false);
  const [active, setActive] = useState(false);
  const [toggleSignIn, setToggleSignIn] = useState(false);
  const toggle = () => {
    dispatch(echapValues());
    setToggleSignIn(!toggleSignIn);
  };
  return (
    <>
      {toggleSignIn ? (
        <>
          <h2>Créer un compte</h2>
          <SignUp />
          <p>
            Vous avez déjà un compte :
            <button className={`${mc.button}`} onClick={() => toggle()}>
              Se connecter ?
            </button>
          </p>
        </>
      ) : (
        <>
          <h2>Se connecter</h2>
          <SignIn />
          <p>
            Toujours pas parmis nous :
            <button className={`${mc.button}`} onClick={() => toggle()}>
              Créer un compte
            </button>
          </p>
        </>
      )}
    </>
  );
};

export default Login;
