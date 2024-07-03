import React, { useState, useEffect } from 'react';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState('');

  useEffect(() => {
    fetch('NotesServlet')
      .then(response => response.json())
      .then(data => setNotes(data))
      .catch(error => console.error('Error fetching notes:', error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('NotesServlet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ note }),
    })
      .then(response => response.json())
      .then(data => {
        setNotes([...notes, data]);
        setNote('');
      })
      .catch(error => console.error('Error saving note:', error));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Notes</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          name="note"
          rows="4"
          cols="50"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <br />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Save Note
        </button>
      </form>
      <h2 className="text-xl font-semibold mb-2">Saved Notes</h2>
      <ul id="notesList" className="list-disc pl-5">
        {notes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;