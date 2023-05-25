import {useSelector} from "react-redux";


const RessourceCategorie = (selectedCategory)=>{
    const {title,url,description,ressources} = useSelector((store)=>store.ressource)
    console.log(ressources)
    //
    // //afficher les ressources
    // useEffect(()=>{
    //     dispatch(getRessource())
    // },[])
    const filteredRessources = selectedCategory === null ? ressources : ressources.filter((ressource)=> ressource.categorieId === selectedCategory)
    return(
        <div>
            {filteredRessources.map((resource)=>(
                <article>
                    <p>{resource.url}</p>
                </article>
            ))}
        </div>
    )
}
export default RessourceCategorie