import { useDispatch, useSelector } from "react-redux";
import {
  getNotes,
  postNote,
  deleteNote,
  updateNote,
} from "../../redux/reducers/note.slice";
import { newState } from "../../redux/reducers/note.slice";
import { useEffect, useState } from "react";
import mc from "./note.module.scss";

const Note = () => {
  const dispatch = useDispatch();
  // ramene les states
  const { title, description, contain, notes } = useSelector(
    (store) => store.note
  );
  const { users } = useSelector((store) => store.persistedReducer);
  // comment le state va devoir etre
  const handleChangeField = (key, value) => {
    dispatch(newState({ key, value }));
  };
  const handleChange = (e) => {
    e.preventDefault();
    dispatch(postNote({ title, description, contain }));
    setShowModal(!showModal);
  };

  useEffect(() => {
    dispatch(getNotes(users.id));
  }, []);

  const deleteNoteId = (id) => {
    dispatch(deleteNote(id));
  };

  const [editNote, setEditNote] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showModalModified, setShowModalModified] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const toggleModalModified = () => {
    setShowModalModified(!showModalModified);
  };

  const handleModificated = (id, editTitle, editDescription, editContain) => {
    setEditNote({
      id: id,
      title: editTitle,
      description: editDescription,
      contain: editContain,
    });
    setShowModalModified(!showModalModified);
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateNote(editNote));
    setShowModalModified(!showModalModified);
  };

  return (
    <div className={`${mc.noteContainer}`}>
      <button className={` ${mc.submit}`} onClick={toggleModal}>
        +
      </button>

      {showModalModified && (
        <section className={`${mc.form}`}>
          <div className={`overlay`}>
            <div className={`modal`}>
              <div className={`buttonCard flex jc-end`}>
                <button onClick={toggleModalModified}>X</button>
              </div>
              <form
                onSubmit={handleUpdate}
                className="flex direction-column jc-end"
              >
                <h2>Modification Note</h2>

                <input
                  type="text"
                  placeholder="titre"
                  value={!!editNote ? editNote.title : ""}
                  required={true}
                  onChange={(e) =>
                    setEditNote({ ...editNote, title: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="description"
                  value={!!editNote ? editNote.description : ""}
                  required={true}
                  onChange={(e) =>
                    setEditNote({ ...editNote, description: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="contenu"
                  value={!!editNote ? editNote.contain : ""}
                  required={true}
                  onChange={(e) =>
                    setEditNote({ ...editNote, contain: e.target.value })
                  }
                />
                <input className={`submit`} type="submit" />
              </form>
            </div>
          </div>
        </section>
      )}
      {showModal && (
        <section>
          <div className={`overlay`}>
            <div className={`modal`}>
              <div className={`buttonCard flex jc-end`}>
                <button onClick={toggleModal}>X</button>
              </div>
              <form
                onSubmit={handleChange}
                className={`flex direction-column  jc-end`}
              >
                <h2>Nouvelle note</h2>
                <input
                  type="text"
                  placeholder="titre"
                  value={title}
                  required={true}
                  onChange={(e) => handleChangeField("title", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="description"
                  value={description}
                  required={true}
                  onChange={(e) =>
                    handleChangeField("description", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="contenu"
                  value={contain}
                  required={true}
                  onChange={(e) => handleChangeField("contain", e.target.value)}
                />
                <input className={`submit`} type="submit" />
              </form>
            </div>
          </div>
        </section>
      )}
      <section className={`${mc.note}`}>
        <div className={`${mc.blockNote}`}>
          {notes.length === 0 ? (
            <p>Pas de note publier pour le moment</p>
          ) : (
            notes.map((note) => (
              <article className={`${mc.card}`} key={note.id}>
                <div className={`buttonCard flex ai-center jc-end`}>
                  <button onClick={() => deleteNoteId(note.id)}>X</button>
                  <button
                    onClick={() =>
                      handleModificated(
                        note.id,
                        note.title,
                        note.description,
                        note.contain
                      )
                    }
                  >
                    <img
                      src="https://img.freepik.com/free-icon/settings-gear-symbol_318-10116.jpg?w=1380&t=st=1685139858~exp=1685140458~hmac=4f876b01062d8a249b61f75e689ef8b073e4c707cfff877cd4a2388e430c3061"
                      alt="settings"
                    />
                  </button>
                </div>
                <p className={`${mc.title}`}>{note.title}</p>
                <p className={`${mc.description}`}>
                  Description : {note.description}
                </p>
                <p className={`${mc.contain}`}>{note.contain}</p>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Note;
