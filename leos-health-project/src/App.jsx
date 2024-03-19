import React, { useState } from "react";
import NoteForm from "./NoteForm";
import ImportFromText from "./ImportFromText";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);

  const addNote = (newNotes) => {
    setNotes([...notes, newNotes]);
  };

  const editNote = (index, editedNote) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = editedNote;
    setNotes(updatedNotes);
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  const addNotesFromImport = (importedNotes) => {
    setNotes([...notes, ...importedNotes]);
  };

  return (
    <div>
      <h1>Elos Notes App</h1>
      <NoteForm addNote={addNote} />
      <ImportFromText addNotes={addNotesFromImport} />
      <h2>Notes</h2>
      {notes.map((note, index) => (
        <div key={index}>
          <h3>{note.title}</h3>
          <ul>
            {note.fields.map((field, fieldIndex) => (
              <li key={fieldIndex}>
                <strong>{field.title}:</strong> {field.type}
              </li>
            ))}
          </ul>
          <button
            onClick={() => editNote(index, { ...note, title: "Edited Title" })}
          >
            Edit
          </button>
          <button onClick={() => deleteNote(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
