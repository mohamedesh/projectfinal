import { useDispatch, useSelector } from "react-redux";
import { newState, updateUser} from "../../redux/reducers/user.slice";
import { useParams } from "react-router-dom";


const UpdateUserAdmin = ()=>{
    // recup l'id dans l'url
    const { id } = useParams();
    const dispatch = useDispatch()
    const {password,email} = useSelector((store)=> store.user);


    const handleChangeField = (key,value)=>{
        dispatch(newState({key,value}))
    }


    const handleChange = async (e)=>{
        e.preventDefault()
        dispatch(updateUser({id,password,email}))
        console.log(id)
    }

    return(
        <div>
            <form onSubmit={handleChange} >
                <input type="email" value={email} required={true} onChange={(e)=>handleChangeField("email",e.target.value)} placeholder="azerty@gmail.com"/>
                <input type="password" value={password} required={true} onChange={(e)=>handleChangeField("password",e.target.value)} placeholder="mot de passe"/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default UpdateUserAdmin