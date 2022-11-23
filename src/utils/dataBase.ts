import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from '@firebase/firestore';
import { v4 } from 'uuid';

import dataBase from '../firebase';
import Note from './interfaces';

const notesCollection = collection(dataBase, 'notes');

const getNotes = async () => {
  const data = await getDocs(notesCollection);
  const notesFromDataBase: Note[] = data.docs.map((item) => ({
    ...item.data(),
    id: item.id,
  }));

  return notesFromDataBase;
};

const createNote = async (newNote: Note) => {
  await addDoc(notesCollection, {
    ...newNote,
    id: v4(),
    date: new Date(),
  });
};

const deleteNote = async (id: string) => {
  const note = doc(dataBase, 'notes', id);
  await deleteDoc(note);
};

const updateNote = async (note: Note) => {
  const updatedNote = doc(dataBase, 'notes', note.id);
  const newNoteData = { title: note.title, text: note.text };
  await updateDoc(updatedNote, newNoteData);
};

export { getNotes, createNote, deleteNote, updateNote };
