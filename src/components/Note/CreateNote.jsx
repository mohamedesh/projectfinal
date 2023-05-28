import { useDispatch, useSelector } from "react-redux";
import {
  getNote,
  postNote,
  deleteNote,
  updateNote,
} from "../../redux/reducers/note.slice";
import { newState } from "../../redux/reducers/note.slice";
import { useEffect, useState } from "react";
import { getUserOne } from "../../redux/reducers/user.slice";
import mc from "../Note/CreateNote.module.scss";

const CreateNote = () => {
  const dispatch = useDispatch();
  // ramene les states
  const { title, description, contain, notes } = useSelector(
    (store) => store.note
  );
  const { userGetOne, userOne } = useSelector((store) => store.user);
  console.log(notes);
  // comment le state va devoir etre
  const handleChangeField = (key, value) => {
    dispatch(newState({ key, value }));
  };
  const handleChange = (e) => {
    e.preventDefault();
    dispatch(postNote({ title, description, contain }));
  };

  // useEffect(()=>{
  //     dispatch(getNote())
  // },[])

  // affiche le user
  useEffect(() => {
    dispatch(getUserOne());
  }, []);

  const deleteNoteId = (id) => {
    dispatch(deleteNote(id));
  };

  const [editNote, setEditNote] = useState(null);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateNote({ title, description, contain, id: editNote }));

    console.log(editNote);
  };

  return (
    <div className="flex jc-space-between ">
      <section className={`${mc.note} flex flex-wrap jc-between`}>
        {userGetOne.map((noteUser) =>
          noteUser.Notes.length === 0 ? (
            <p>Pas de note publier pour le moment</p>
          ) : (
            noteUser.Notes.map((note) => (
              <article className={`${mc.card} container-cards`} key={note.id}>
                <div className={`buttonCard flex ai-center jc-end`}>
                  <button onClick={() => deleteNoteId(note.id)}>X</button>
                  <button onClick={() => setEditNote(note.id)}>
                    <img
                      src="https://img.freepik.com/free-icon/settings-gear-symbol_318-10116.jpg?w=1380&t=st=1685139858~exp=1685140458~hmac=4f876b01062d8a249b61f75e689ef8b073e4c707cfff877cd4a2388e430c3061"
                      alt="settings"
                    />
                  </button>
                </div>
                <p>{note.title}</p>
                <p>{note.description}</p>
                <p>{note.contain}</p>
              </article>
            ))
          )
        )}
      </section>
      <section className={`${mc.form}`}>
        {editNote ? (
          <form
            onSubmit={handleUpdate}
            className="flex direction-column jc-end"
          >
            <h2>Modification Note</h2>
            <span onClick={() => setEditNote(null)}>X</span>
            <input
              type="text"
              placeholder="title"
              value={title}
              required={true}
              onChange={(e) => handleChangeField("title", e.target.value)}
            />
            <input
              type="text"
              placeholder="description"
              value={description}
              required={true}
              onChange={(e) => handleChangeField("description", e.target.value)}
            />
            <input
              type="text"
              placeholder="contain"
              value={contain}
              required={true}
              onChange={(e) => handleChangeField("contain", e.target.value)}
            />
            <input className={`submit`} type="submit" />
          </form>
        ) : (
          <form
            onSubmit={handleChange}
            className={`flex direction-column  jc-end`}
          >
            <h2>Nouvelle note</h2>
            <input
              type="text"
              placeholder="title"
              value={title}
              required={true}
              onChange={(e) => handleChangeField("title", e.target.value)}
            />
            <input
              type="text"
              placeholder="description"
              value={description}
              required={true}
              onChange={(e) => handleChangeField("description", e.target.value)}
            />
            <input
              type="text"
              placeholder="contain"
              value={contain}
              required={true}
              onChange={(e) => handleChangeField("contain", e.target.value)}
            />
            <input className={`submit`} type="submit" />
          </form>
        )}
      </section>
    </div>
  );
};

export default CreateNote;
