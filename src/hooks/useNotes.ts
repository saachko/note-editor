import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from '@firebase/firestore';
import { useState } from 'react';
import { v4 } from 'uuid';

import { defaultNote } from 'utils/constants';
import { Note } from 'utils/interfaces';

import dataBase from '../firebase';

const useNotes = () => {
  const [defaultNotes, setDefaultNotes] = useState<Note[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<Note>(defaultNote);
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

  const createNote = async (noteToCreate: Note) => {
    await addDoc(notesCollection, {
      ...noteToCreate,
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

  const updateNote = async (note: Note) => {
    const updatedNote = doc(dataBase, 'notes', note.id);
    const newNoteData = { title: note.title, text: note.text };
    await updateDoc(updatedNote, newNoteData);
  };

  const editNote = async () => {
    await updateNote(editedNote);
    await getNotes();
    setModalOpen(false);
  };

  return {
    defaultNotes,
    setDefaultNotes,
    notes,
    setNotes,
    newNote,
    setNewNote,
    isModalOpen,
    setModalOpen,
    editedNote,
    setEditedNote,
    getNotes,
    createNote,
    deleteNote,
    editNote,
  };
};

export default useNotes;
