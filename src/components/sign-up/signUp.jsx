import React, {useEffect, useState} from 'react';
import mc from "./signUp.module.scss"
import { useDispatch, useSelector } from "react-redux";
import {postUser} from "../../redux/reducers/user.slice";
import {newState} from "../../redux/reducers/user.slice";
import {useLocation,useNavigate} from "react-router-dom";


const SignUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {surname,name,pseudo,password,email} = useSelector((store)=> store.user);

    const handleChangeField = (key, value)=>{
        dispatch(newState({key,value}))
    }

    const handleForm = async (e)=>{
        e.preventDefault()
        dispatch(postUser({surname,name, pseudo, password,email}));
    }

    return (
               <form className={`flex direction-column `} onSubmit={handleForm}>
                   <input type="text" value={surname} onChange={(e)=>handleChangeField("surname",e.target.value)} placeholder="nom" />
                   <input type="text" value={name} onChange={(e)=>handleChangeField("name",e.target.value)} placeholder="prenom" />
                   <input type="text" value={pseudo} onChange={(e)=>handleChangeField("pseudo",e.target.value)} placeholder="pseudo" />
                   <input type="email" value={email} onChange={(e)=>handleChangeField("email",e.target.value)} placeholder="email" />
                   <input type="password" value={password} onChange={(e)=>handleChangeField("password",e.target.value)} placeholder="mot de passe" />
                   <input type="submit" value="Envoyez" />
               </form>
    );
};

export default SignUp;