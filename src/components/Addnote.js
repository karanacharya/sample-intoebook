import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import AlertContext from "../context/notes/alertContext";

const Addnote = () => {
   const context1= useContext(AlertContext);
   const {showAlert} = context1;
  const context = useContext(noteContext);
  const { addnote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleclick = (e) => {
    e.preventDefault();
    addnote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    showAlert("Note added !","success")
    
  };

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3 text-light ">
      <h2>Add a note</h2>
      <form>
        <div className="form-group">
          <label htmlFor="title"> <b> Title</b> </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            minLength={5}
            required
            onChange={onchange}
            value={note.title}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description"><b> Description</b></label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onchange}
            minLength={5}
            required
            value={note.description}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tag"><b> Tag</b></label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onchange}
            minLength={5}
            required
            value={note.tag}
          />
        </div>

        <button
          disabled={note.title.length < 5 || note.description.length < 5}
          type="submit"
          onClick={handleclick}
          className="btn btn-primary"
        >
          Add note
        </button>
      </form>
    </div>
  );
};

export default Addnote;
