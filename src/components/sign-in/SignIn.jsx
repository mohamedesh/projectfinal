import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newState, userSignIn } from "../../redux/reducers/user.slice";
import { useLocation, redirect, useNavigate } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { password, email } = useSelector((store) => store.user);
  const handleChangeField = (key, value) => {
    dispatch(newState({ key, value }));
  };

  const handleChange = async (e) => {
    e.preventDefault();
    dispatch(userSignIn({ password, email }));
  };

  return (
    <form className={`flex direction-column`} onSubmit={handleChange}>
      <input
        type="email"
        value={email}
        required={true}
        onChange={(e) => handleChangeField("email", e.target.value)}
        placeholder="azerty@gmail.com"
      />
      <input
        type="password"
        value={password}
        required={true}
        onChange={(e) => handleChangeField("password", e.target.value)}
        placeholder="mot de passe"
      />
      <input className={`submit`} type="submit" />
    </form>
  );
};

export default SignIn;
