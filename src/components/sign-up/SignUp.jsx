import React, { useState } from "react";
import mc from "./signUp.module.scss";
import { useDispatch } from "react-redux";
import { postUser } from "../../redux/reducers/user.slice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [pseudo, setPseudo] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeSurname = (e) => {
    setSurname(e.target.value);
  };

  const handleChangePseudo = (e) => {
    setPseudo(e.target.value);
  };

  // const{ surname, name, pseudo, password, email } = useSelector(
  //   (store) => store.user
  // );

  // const handleChangeField = (key, value) => {
  //   dispatch(newState({ key, value }));
  // };
  //
  const handleForm = async (e) => {
    e.preventDefault();
    dispatch(
      postUser({
        surname: surname,
        name: name,
        pseudo: pseudo,
        password: password,
        email: email,
      })
    );
    navigate("/dashboard");
  };

  return (
    <form className={`flex direction-column `} onSubmit={handleForm}>
      <label htmlFor="nom de famille">Nom de famille :</label>
      <input
        type="text"
        id="nom de famille"
        name="nom de famille"
        value={surname}
        onChange={(e) => handleChangeSurname(e)}
        placeholder="nom"
      />
      <label htmlFor="prenom">Prénom :</label>
      <input
        type="text"
        id="prenom"
        name="prenom"
        value={name}
        onChange={(e) => handleChangeName(e)}
        placeholder="prenom"
      />
      <label htmlFor="pseudo">Pseudo :</label>
      <input
        type="text"
        id="pseudo"
        name="pseudo"
        value={pseudo}
        onChange={(e) => handleChangePseudo(e)}
        placeholder="pseudo"
      />
      <label htmlFor="email">Email :</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => handleChangeEmail(e)}
        placeholder="email"
      />
      <label htmlFor="mot de passe">Mot de passe :</label>
      <input
        type="password"
        id="mot de passe"
        name="mot de passe"
        value={password}
        onChange={(e) => handleChangePassword(e)}
        placeholder="mot de passe"
      />
      <input
        aria-label={"envoyer le formulaire d'inscription"}
        className={mc.submit}
        type="submit"
        value="Envoyez"
      />
    </form>
  );
};

export default SignUp;
