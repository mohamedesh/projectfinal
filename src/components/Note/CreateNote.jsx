import {useDispatch, useSelector} from "react-redux";
import {getNote, postNote, deleteNote, updateNote} from "../../redux/reducers/note.slice";
import {newState} from "../../redux/reducers/note.slice";
import {useEffect, useState} from "react";
import {getUserOne} from "../../redux/reducers/user.slice";


const CreateNote = ()=>{
    const dispatch = useDispatch()
    // ramene les states
    const {title,description,contain,notes} = useSelector((store)=>store.note)
    const {userGetOne,userOne} = useSelector((store)=>store.user)
    console.log(notes)
    // comment le state va devoir etre
    const handleChangeField = (key,value)=>{
        dispatch(newState({key,value}))
    }
    const handleChange = (e)=>{
        e.preventDefault()
        dispatch(postNote({title,description,contain}))
    }

    // useEffect(()=>{
    //     dispatch(getNote())
    // },[])

    // affiche le user
    useEffect(()=>{
        dispatch(getUserOne())

    },[])

    const deleteNoteId = (id)=>{
        dispatch(deleteNote(id))
    }

    const [editNote,setEditNote] = useState(null)

    const handleUpdate = (e)=>{
        e.preventDefault()
        dispatch(updateNote({title,description,contain,id:editNote}))

        console.log(editNote)
    }



    return(
        <div className="flex jc-space-between ">
            {/*<section>*/}
            {/*    {userGetOne.map((noteUser)=>(*/}
            {/*        noteUser.map((note)=>(*/}
            {/*                <article key={note.id}>*/}
            {/*                    <p>{note.title}</p>*/}
            {/*                    <p>{note.description}</p>*/}
            {/*                    <p>{note.contain}</p>*/}
            {/*                    <button onClick={()=>deleteNoteId(note.id)}>Delete</button>*/}
            {/*                    <button onClick={()=>setEditNote(note.id)}>Update</button>*/}
            {/*                </article>*/}
            {/*            ))))}*/}

            {/*</section>*/}
            {/*<section>*/}
            {/*    {editNote ? (<form onSubmit={handleUpdate} className="flex direction-column jc-end">*/}
            {/*                <h2>Modification Note</h2>*/}
            {/*                <span onClick={()=>setEditNote(null)}>X</span>*/}
            {/*                <input type="text" placeholder="title" value={title} required={true} onChange={(e)=>handleChangeField("title",e.target.value)}/>*/}
            {/*                <input type="text" placeholder="description" value={description} required={true} onChange={(e)=>handleChangeField("description",e.target.value)}/>*/}
            {/*                <input type="text" placeholder="contain" value={contain} required={true} onChange={(e)=>handleChangeField("contain",e.target.value)}/>*/}
            {/*                <input type="submit"/>*/}
            {/*            </form>)*/}
            {/*            :*/}
            {/*        (<form onSubmit={handleChange}  className={`flex direction-column  jc-end`}>*/}
            {/*        <h2>Nouvelle note</h2>*/}
            {/*        <input type="text" placeholder="title" value={title} required={true} onChange={(e)=>handleChangeField("title",e.target.value)}/>*/}
            {/*        <input type="text" placeholder="description" value={description} required={true} onChange={(e)=>handleChangeField("description",e.target.value)}/>*/}
            {/*        <input type="text" placeholder="contain" value={contain} required={true} onChange={(e)=>handleChangeField("contain",e.target.value)}/>*/}
            {/*        <input type="submit"/>*/}
            {/*    </form>)}*/}
            {/*</section>*/}
        </div>
    )
}

export default CreateNote