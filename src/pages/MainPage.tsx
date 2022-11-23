import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';

import Form from 'components/Form';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import NoteItem from 'components/NoteItem';
import MainPageImage from 'components/SvgElements/MainPageImage';

import defaultNote from 'utils/constants';
import sortByDate from 'utils/functions';
import Note from 'utils/interfaces';

import dataBase from '../firebase';

function MainPage() {
  const [defaultNotes, setDefaultNotes] = useState<Note[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<Note>(defaultNote);
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editedNote, setEditedNote] = useState<Note>(defaultNote);

  const notesCollection = collection(dataBase, 'notes');

  const getNotes = async () => {
    const data = await getDocs(notesCollection);
    const notesFromDataBase: Note[] = data.docs.map((item) => ({
      ...item.data(),
      id: item.id,
    }));
    setNotes(notesFromDataBase);
    setDefaultNotes(notesFromDataBase);
  };

  const createNote = async () => {
    await addDoc(notesCollection, {
      ...newNote,
      id: v4(),
      date: new Date(),
    });
    await getNotes();
    setNewNote(defaultNote);
  };

  const deleteNote = async (id: string) => {
    const note = doc(dataBase, 'notes', id);
    await deleteDoc(note);
    await getNotes();
  };

  const updateNote = async (id: string, note: Note) => {
    const updatedNote = doc(dataBase, 'notes', id);
    const newNoteData = { title: note.title, text: note.text };
    await updateDoc(updatedNote, newNoteData);
    await getNotes();
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getNotes();
      setLoading(false);
    })();
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
          notes
            .sort(sortByDate())
            .map((note) => (
              <NoteItem
                key={note.id}
                title={note?.title}
                text={note.text}
                deleteNote={() => deleteNote(note.id)}
                editNote={() => setModalOpen(true)}
              />
            ))
        ) : (
          <p className="note__item_empty">{`It seems you don't have notes yet`}</p>
        )}
      </section>
      {isModalOpen && <Modal setActive={setModalOpen} />}
    </main>
  );
}

export default MainPage;
