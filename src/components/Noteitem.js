import noteContext from "../context/notes/noteContext";
import React ,{useContext} from "react";
import '../App.css';

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deletenote } = context;
  const { note,updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card bg-dark text-light rounded" >
        <div className="card-body">
          <h5 className="card-title"><b>Title : </b>{note.title}</h5>
          <p className="card-text"><b>Desc : </b>{note.description}</p>
          {/* <p className="card-title"><b>Tag : </b>{note.tag}</p> */}

           <div className="container d-flex justify-content-end">
          <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deletenote(note._id)}}></i>
          <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
