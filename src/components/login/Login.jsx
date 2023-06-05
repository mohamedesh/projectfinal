import SignUp from "../sign-up/SignUp";
import SignIn from "../sign-in/SignIn";
import mc from "./login.module.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { echapValues } from "../../redux/reducers/user.slice";

const Login = () => {
  const dispatch = useDispatch();
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
          <p className={`${mc.account}`}>
            Vous avez déjà un compte :
            <button
              className={`${mc.button} selectNone`}
              onClick={() => toggle()}
            >
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
            <button
              className={`${mc.button} selectNone`}
              onClick={() => toggle()}
            >
              Créer un compte
            </button>
          </p>
        </>
      )}
    </>
  );
};

export default Login;
