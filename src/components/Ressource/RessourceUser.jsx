import {useDispatch,useSelector} from "react-redux";
import {
    deleteRessource,
    getRessource,
    newState,
    addRessource,
    postRessource,
    updateRessource,
} from "../../redux/reducers/ressource.slice";
import {useEffect, useState} from "react";
import mc from "./createRessource.module.scss"
import {getUser, getUserOne} from "../../redux/reducers/user.slice";


const RessourceUser = ()=> {
    const dispatch = useDispatch()
    const {title,url,description,ressources} = useSelector((store)=>store.ressource)
    const {userGetOne,userOne} = useSelector((store)=>store.user)
    console.log(ressources)
    console.log(userGetOne)



    const handleChange = (e)=>{
        e.preventDefault()
        dispatch(postRessource({title,url,description}))
        setRessourcePost(null)
    }
    // changement de valeur
    const handleChangeField = (key,value)=>{
         dispatch(newState({key,value}))
    }
    //
    // //afficher les ressources
    // useEffect(()=>{
    //     dispatch(getRessource())
    // },[])

    // affiche le user
    useEffect(()=>{
        dispatch(getUserOne())

    },[])

    // supprimer ressources
    const deleteRessourceId = (id)=>{
        dispatch(deleteRessource(id))
    }
    // modifier ressource

    const [ressourcePost,setRessourcePost] = useState()
    const [ressourceUpdate,setRessourceUpdate] = useState()
    const [visible,setVisible] = useState(false)


    const handleUpdate = (e)=>{
        e.preventDefault()
        dispatch(updateRessource({title,url,description,id:ressourceUpdate}))
        setRessourceUpdate(null)
    }


    // ajoute ds les calculs la durée de temps du lien
    // acces de certaines fonctionnalités que pour l'admin
    // faire en sorte de pouvoir bloquer des sites malveillant comme des trucs bizar ou autres
    // retravailler les liens mettre une condition ternaire sur le fait si elles ont deja le http ou bien le rajouter au lien qu'elle donnent
    return(
        <div className="flex jc-space-between">
            <section>

                {userGetOne.map((ressourceUser)=>(
                    ressourceUser.map((ressource)=>(
                        <article key={ressource.id}>
                            {console.log(ressource.Ressources.title)}
                            <p>{ressource.title}</p>
                            <a href={ressource.url}>{ressource.url}</a>
                            <p>{ressource.description}</p>
                            <button onClick={()=>{deleteRessourceId(ressource.id)}}>Delete</button>
                            <button onClick={()=>{
                                setRessourceUpdate(ressource.id)
                                setVisible(!visible)
                            }}>Update</button>
                        </article>
                    ))

                    ))}



            </section>
            <section>
                {(ressourceUpdate)? (<form onSubmit={handleUpdate}  className={`flex direction-column  jc-end`}>
                        <h2>Modification Ressource</h2>
                        <span onClick={()=>setRessourceUpdate(null)}>X</span>
                        <input type="text" placeholder="title" value={title} required={true} onChange={(e)=>handleChangeField("title",e.target.value)}/>
                        <input type="text" placeholder="url" value={url} required={true} onChange={(e)=>handleChangeField("url",e.target.value)}/>
                        <input type="text" placeholder="description" value={description} required={true} onChange={(e)=>handleChangeField("description",e.target.value)}/>
                        <input type="submit"/>

                    </form>)
                    :(<form onSubmit={handleChange} className={`flex direction-column  jc-end`}>
                        <h2>Nouvelle Ressource</h2>
                        <input type="text" placeholder="title" value={title} required={true} onChange={(e)=>handleChangeField("title",e.target.value)}/>
                        <input type="text" placeholder="url" value={url} required={true} onChange={(e)=>handleChangeField("url",e.target.value)}/>
                        <input type="text" placeholder="description" value={description} required={true} onChange={(e)=>handleChangeField("description",e.target.value)}/>
                        <input type="submit"/>
                    </form>)}

            </section>
        </div>
    )
}
export default RessourceUser