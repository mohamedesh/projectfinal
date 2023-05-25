import { useDispatch, useSelector } from "react-redux";
import {deleteUser, getUser} from "../../redux/reducers/user.slice";
import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";

const GetUserAdmin = () => {
    const dispatch = useDispatch()
    const {surname,name,pseudo,password,email,loading,userGet} = useSelector((store)=> store.user);


    //affiche tous les users
    useEffect(()=>{
        dispatch(getUser())
    },[])

    // permet de supprimer chaque users
    const deleteUserId = (id)=>{
        dispatch(deleteUser(id))
    }

    const [selectedId,setSelectedId] = useState(null);

    return(
        <div>
        <h1>Coucou</h1>
            <section>

                {userGet.map((user) => (
                    <article key={user.id}>
                        <p>{user.name}</p>
                        <button onClick={()=>{deleteUserId(user.id)}}>Delete</button>
                        <NavLink to={`/updateuser/${user.id}`}><a onClick={()=>{setSelectedId(user.id)}}>Update</a></NavLink>
                    </article>
                    ))}
            </section>
        </div>
    )

}

export default GetUserAdmin;