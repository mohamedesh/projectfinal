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
      <input
        type="text"
        value={surname}
        onChange={(e) => handleChangeSurname(e)}
        placeholder="nom"
      />
      <input
        type="text"
        value={name}
        onChange={(e) => handleChangeName(e)}
        placeholder="prenom"
      />
      <input
        type="text"
        value={pseudo}
        onChange={(e) => handleChangePseudo(e)}
        placeholder="pseudo"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => handleChangeEmail(e)}
        placeholder="email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => handleChangePassword(e)}
        placeholder="mot de passe"
      />
      <input className={mc.submit} type="submit" value="Envoyez" />
    </form>
  );
};

export default SignUp;
