import React, { useEffect, useRef , useState} from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";
import AlertContext from "../context/notes/alertContext";


const Notes = () => {
  const context2 = useContext(AlertContext);
  const {showAlert} = context2;
  const context = useContext(noteContext);
  const { notes, getnotes , editnote} = context;
  const navigate = useNavigate();
  
  useEffect(() => {
    if(localStorage.getItem("token")){
      getnotes();
      //eslint-disable-next-line
    }
    else{
      navigate("/login");
    }
  }, []);

  const ref = useRef(null);
  const refclose = useRef(null);

  const [note, setNote] = useState({
    id:"",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentNote) => {    
    ref.current.click();
     setNote({ id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
  };

  const onchange = (e) => {    
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleclick = (e) => {  
    editnote(note.id ,note.etitle , note.edescription, note.etag)
    refclose.current.click();
    showAlert("Note updated !","success");
  
  };

  return (
    <>
      <Addnote />
      <div className="container">
        <button
          ref={ref}
          type="button"
          className="btn btn-primary d-none"
          data-toggle="modal"
          data-target="#exampleModal"          
        >
          Launch demo modal
        </button>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit a note
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container my-3 ">
                  <h2>Add a note</h2>
                  <form>
                    <div className="form-group">
                      <label htmlFor="title"> Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="etitle"
                        name="etitle"
                        onChange={onchange}
                        value={note.etitle}
                        minLength={5} 
                        required
                      
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        id="edescription"
                        name="edescription"
                        onChange={onchange}
                        value={note.edescription}
                        minLength={5} required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="tag">Tag</label>
                      <input
                        type="text"
                        className="form-control"
                        id="etag"
                        name="etag"
                        onChange={onchange}
                        value={note.etag}              
                      />
                    </div>

                  </form>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  ref={refclose}
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button disabled={note.etitle.length < 5 || note.edescription.length <5} type="button" className="btn btn-primary" onClick={handleclick}> 
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-3 text-light">
        <div className="container">
          <h2>Your Notes</h2>
        </div>
        <div className="row pt-3">
          {notes.length > 0 ? (
            notes.map((note) => (
              <Noteitem key={note._id} updateNote={updateNote} note={note} />
            ))
          ) : (
            <h6 className="mx-5">No notes available</h6>
          )}
        </div>
      </div>
    </>
  );
};

export default Notes;
