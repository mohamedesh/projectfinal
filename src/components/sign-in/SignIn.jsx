import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userSignIn } from "../../redux/reducers/user.slice";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      <label htmlFor="email">Email : </label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        required={true}
        onChange={(e) => handleChangeEmail(e)}
        placeholder="azerty@gmail.com"
        pattern={"^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"}
      />
      <label htmlFor="mot de passe">Mot de passe : </label>
      <input
        type="password"
        id="mot de passe"
        name="mot de passe"
        value={password}
        required={true}
        onChange={(e) => handleChangePassword(e)}
        placeholder="mot de passe"
        pattern={
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
        }
      />
      <input
        aria-label={"envoyer le formulaire de connection"}
        className={`submit selectNone`}
        type="submit"
      />
    </form>
  );
};

export default SignIn;
