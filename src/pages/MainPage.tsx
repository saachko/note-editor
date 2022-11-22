import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from '@firebase/firestore';
import React, { useEffect, useState } from 'react';

import Form from 'components/Form';
import Loader from 'components/Loader';
import NoteItem from 'components/NoteItem';
import MainPageImage from 'components/SvgElements/MainPageImage';

import defaultNote from 'utils/constants';
import Note from 'utils/interfaces';

import dataBase from '../firebase';

function MainPage() {
  const [defaultNotes, setDefaultNotes] = useState<Note[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<Note>(defaultNote);
  const [isLoading, setLoading] = useState(false);

  const notesCollection = collection(dataBase, 'notes');

  const getNotes = async () => {
    setLoading(true);
    const data = await getDocs(notesCollection);
    const notesFromDataBase: Note[] = data.docs.map((item) => ({
      ...item.data(),
      id: item.id,
    }));
    setNotes(notesFromDataBase);
    setDefaultNotes(notesFromDataBase);
    setLoading(false);
  };

  const createNote = async () => {
    await addDoc(notesCollection, newNote);
    getNotes();
    setNewNote(defaultNote);
  };

  const deleteNote = async (id: string) => {
    const note = doc(dataBase, 'notes', id);
    await deleteDoc(note);
    getNotes();
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <main>
      <section className="notes-creation">
        <div className="notes-creation__form">
          <h1>Create and edit your notes</h1>
          <Form
            buttonText="Create"
            note={newNote}
            setNote={setNewNote}
            onSubmit={createNote}
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
          notes.map((note) => (
            <NoteItem
              key={note.id}
              title={note?.title}
              text={note.text}
              deleteNote={() => deleteNote(note.id)}
            />
          ))
        ) : (
          <p className="note__item_empty">{`It seems you don't have notes yet`}</p>
        )}
      </section>
    </main>
  );
}

export default MainPage;
