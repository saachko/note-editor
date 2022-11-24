import { collection, getDocs } from '@firebase/firestore';
import React, { memo, useEffect, useState } from 'react';

import Form from 'components/Form';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import NoteItem from 'components/NoteItem';
import MainPageImage from 'components/SvgElements/MainPageImage';
import TagsInput from 'components/TagsInput';

import { sortByDate } from 'utils/functions';
import { Tag } from 'utils/interfaces';

import useNotes from 'hooks/useNotes';

import dataBase from '../firebase';

function MainPage() {
  const [isLoading, setLoading] = useState(false);

  const {
    notes,
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
  } = useNotes();

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getNotes();
      setLoading(false);
    })();
  }, []);

  const [tags, setTags] = useState<Tag[]>([]);

  const tagsCollection = collection(dataBase, 'tags');
  useEffect(() => {
    (async () => {
      const data = await getDocs(tagsCollection);
      const tagsFromDataBase: Tag[] = data.docs.map((item) => ({
        ...item.data(),
        id: item.id,
      }));
      setTags(tagsFromDataBase);
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
            onSubmit={() => createNote(newNote)}
          />
        </div>
        <div className="notes-creation__image">
          <MainPageImage />
        </div>
      </section>
      <section className="tags-container">
        <TagsInput tags={tags} setTags={setTags} />
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
              deleteNote={() => deleteNote(note.id)}
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
