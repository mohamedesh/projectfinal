import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newState, userSignIn } from "../../redux/reducers/user.slice";
import { useLocation, redirect, useNavigate } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const{ password, email } = useSelector((store) => store.user);
  // const handleChangeField = (key, value) => {
  //   dispatch(newState({ key, value }));
  // };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChange = async (e) => {
    e.preventDefault();
    await dispatch(userSignIn({ password: password, email: email }));
    navigate("/dashboard");
  };

  return (
    <form className={`flex direction-column`} onSubmit={handleChange}>
      <input
        type="email"
        value={email}
        required={true}
        onChange={(e) => handleChangeEmail(e)}
        placeholder="azerty@gmail.com"
      />
      <input
        type="password"
        value={password}
        required={true}
        onChange={(e) => handleChangePassword(e)}
        placeholder="mot de passe"
      />
      <input
        aria-label={"envoyer le formulaire de connection"}
        className={`submit`}
        type="submit"
      />
    </form>
  );
};

export default SignIn;
