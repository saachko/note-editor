import React, { memo, useEffect, useState } from 'react';

import Form from 'components/Form';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import NoteItem from 'components/NoteItem';
import MainPageImage from 'components/SvgElements/MainPageImage';

import defaultNote from 'utils/constants';
import { createNote, deleteNote, getNotes, updateNote } from 'utils/dataBase';
import sortByDate from 'utils/functions';
import Note from 'utils/interfaces';

function MainPage() {
  const [defaultNotes, setDefaultNotes] = useState<Note[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<Note>(defaultNote);
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editedNote, setEditedNote] = useState<Note>(defaultNote);

  const getNotesFromDatabase = async () => {
    const notesFromDataBase = await getNotes();
    setNotes(notesFromDataBase);
    setDefaultNotes(notesFromDataBase);
  };

  const createNewNote = async () => {
    await createNote(newNote);
    await getNotesFromDatabase();
    setNewNote(defaultNote);
  };

  const removeNote = async (id: string) => {
    await deleteNote(id);
    await getNotesFromDatabase();
  };

  const editNote = async () => {
    await updateNote(editedNote);
    await getNotesFromDatabase();
    setModalOpen(false);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getNotesFromDatabase();
      setLoading(false);
    })();
  }, []);

  return (
    <main>
      <section className="notes-creation">
        <div className="notes-creation__form">
          <h1>Create a note</h1>
          <Form
            buttonText="Create"
            note={newNote}
            setNote={setNewNote}
            onSubmit={createNewNote}
          />
        </div>
        <div className="notes-creation__image">
          <MainPageImage />
        </div>
      </section>
      <section
        className={notes.length ? 'notes-container' : 'notes-container_empty'}
      >
        {isLoading && <Loader />}
        {!isLoading && notes.length ? (
          notes.sort(sortByDate()).map((note) => (
            <NoteItem
              key={note.id}
              title={note.title}
              text={note.text}
              deleteNote={() => removeNote(note.id)}
              editNote={() => {
                setEditedNote(note);
                setModalOpen(true);
              }}
            />
          ))
        ) : (
          <p className="note__item_empty">{`It seems you don't have notes yet`}</p>
        )}
      </section>
      {isModalOpen && (
        <Modal
          setActive={setModalOpen}
          editedNote={editedNote}
          setEditedNote={setEditedNote}
          editFormHandler={editNote}
        />
      )}
    </main>
  );
}

export default memo(MainPage);
