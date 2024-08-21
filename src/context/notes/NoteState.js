import React, { useContext, useState } from "react";
import NoteContext from "./noteContext";
import AlertContext from "./alertContext";

const NoteState = (props) => {
  const context = useContext(AlertContext);
  const { showAlert } = context;
  const host = "http://localhost:5000";
  const Initialnote = [];
  const [notes, setNotes] = useState(Initialnote);

  //fetch  all notes
  const getnotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  //Add a note
  const addnote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  //Delete a note
  const deletenote = async (id) => {
    // console.log(id)
    //API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);

    //Logic to delete a node
    const newnote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newnote);
    showAlert("Note deleted succesfully", "danger");
  };

  //Edit a note
  const editnote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    let Newnotes = JSON.parse(JSON.stringify(notes));

    //Logic to edit a note
    for (let index = 0; index < Newnotes.length; index++) {
      const element = Newnotes[index];
      if (element._id === id) {
        Newnotes[index].title = title;
        Newnotes[index].description = description;
        Newnotes[index].tag = tag;
        break;
      }
    }
    setNotes(Newnotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addnote, deletenote, editnote, getnotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
//66b61f44ffde88bb844f1142
//66b61f44ffde88bb844f1142
