import { collection, getDocs } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';

import Form from 'components/Form';
import Loader from 'components/Loader';
import NoteItem from 'components/NoteItem';
import MainPageImage from 'components/SvgElements/MainPageImage';

import dataBase from '../firebase';
import Note from '../utils/interfaces';

function MainPage() {
  const [defaultNotes, setDefaultNotes] = useState<Note[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setLoading] = useState(false);
  const notesCollection = collection(dataBase, 'notes');

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getDocs(notesCollection);
      const notesFromDataBase: Note[] = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNotes(notesFromDataBase);
      setDefaultNotes(notesFromDataBase);
      setLoading(false);
    })();
  }, []);

  return (
    <main>
      <section className="notes-editor">
        <div className="notes-editor__form">
          <h1>Create and edit your notes</h1>
          <Form />
        </div>
        <div className="notes-editor__image">
          <MainPageImage />
        </div>
      </section>
      <section
        className={notes.length ? 'notes-container' : 'notes-container_empty'}
      >
        {isLoading && <Loader />}
        {!isLoading && notes.length ? (
          notes.map((note) => (
            <NoteItem key={note.id} title={note?.title} text={note.text} />
          ))
        ) : (
          <p className="note__item_empty">{`It seems you don't have notes yet`}</p>
        )}
      </section>
    </main>
  );
}

export default MainPage;
