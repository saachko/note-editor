import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from '@firebase/firestore';
import React, { memo, useEffect, useState } from 'react';
import { v4 } from 'uuid';

import Form from 'components/Form';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import NoteItem from 'components/NoteItem';
import MainPageImage from 'components/SvgElements/MainPageImage';
import TagsInput from 'components/TagsInput';

import { defaultNote, defaultTag } from 'utils/constants';
import {
  addHashtagToTag,
  findHashtagsInText,
  sortByDate,
} from 'utils/functions';
import { Note, Tag } from 'utils/interfaces';

import dataBase from '../firebase';

function MainPage() {
  const [isLoading, setLoading] = useState(false);

  const [defaultNotes, setDefaultNotes] = useState<Note[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<Note>(defaultNote);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editedNote, setEditedNote] = useState<Note>(defaultNote);

  const [tags, setTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState(defaultTag);
  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);
  const [isTagCreationError, setTagCreationError] = useState(false);
  const [newTagsFromText, setNewTagsFromText] = useState<Array<string>>([]);

  const tagsCollection = collection(dataBase, 'tags');
  const notesCollection = collection(dataBase, 'notes');

  const getTags = async () => {
    const data = await getDocs(tagsCollection);
    const tagsFromDataBase = data.docs.map((item) => ({
      ...item.data(),
      id: item.id,
    })) as Tag[];
    setTags(tagsFromDataBase);
    return tagsFromDataBase;
  };

  const getNotes = async () => {
    const data = await getDocs(notesCollection);
    const notesFromDataBase = data.docs.map((item) => ({
      ...item.data(),
      id: item.id,
    })) as Note[];
    setNotes(notesFromDataBase);
    setDefaultNotes(notesFromDataBase);
  };

  const createTag = async (tagToCreate: Tag) => {
    if (
      tags.find((item) => item.tagName === addHashtagToTag(tagToCreate).tagName)
    ) {
      if (newTagsFromText.length === 0) {
        setTagCreationError(true);
      }
      return;
    }

    if (tagToCreate.tagName) {
      await addDoc(tagsCollection, {
        ...addHashtagToTag(tagToCreate),
        id: v4(),
        date: new Date(),
      });
      await getTags();
      setNewTag(defaultTag);
    }
  };

  const createTagsFromText = () => {
    if (newTagsFromText.length > 0) {
      newTagsFromText.map((item) => createTag({ id: v4(), tagName: item }));
    }
  };

  const createNote = async (noteToCreate: Note) => {
    createTagsFromText();
    const filteredTags = newTagsFromText.filter(
      (item) => noteToCreate.noteTags.indexOf(item) === -1
    );
    await addDoc(notesCollection, {
      title: noteToCreate.title,
      text: noteToCreate.text,
      noteTags: [...noteToCreate.noteTags, ...filteredTags],
      id: v4(),
      date: new Date(),
    });
    setNewTagsFromText([]);
    await getNotes();
    setNewNote(defaultNote);
  };

  const updateNote = async (note: Note) => {
    const filteredTags = newTagsFromText.filter(
      (item) => note.noteTags.indexOf(item) === -1
    );
    const updatedNote = doc(dataBase, 'notes', note.id);
    const newNoteData = {
      title: note.title,
      text: note.text,
      noteTags: [...note.noteTags, ...filteredTags],
    };
    await updateDoc(updatedNote, newNoteData);
  };

  const editNote = async () => {
    if (editedNote) {
      createTagsFromText();
      await updateNote(editedNote);
      setNewTagsFromText([]);
      await getNotes();
      setModalOpen(false);
    }
  };

  const deleteTag = async (tagToDelete: Tag) => {
    const tag = doc(dataBase, 'tags', tagToDelete.id);
    await deleteDoc(tag);
    await getTags();

    notes.map((item) =>
      item.noteTags.indexOf(tagToDelete.tagName) >= 0
        ? item.noteTags.splice(item.noteTags.indexOf(tagToDelete.tagName), 1) &&
          updateNote(item)
        : null
    );

    await getNotes();
  };

  const deleteNote = async (id: string) => {
    const note = doc(dataBase, 'notes', id);
    await deleteDoc(note);
    await getNotes();
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getNotes();
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (isTagCreationError) {
      setTimeout(() => {
        setTagCreationError(false);
      }, 3000);
    }
  }, [isTagCreationError]);

  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
    const filteredNotes = defaultNotes.filter((item) =>
      selectedTags.every((noteTag) => item.noteTags.indexOf(noteTag) >= 0)
    );
    setNotes(filteredNotes);
    if (selectedTags.length === 0) {
      setNotes(defaultNotes);
    }
  }, [selectedTags]);

  useEffect(() => {
    if (newNote.text) {
      setNewTagsFromText(findHashtagsInText(newNote.text));
    }
  }, [newNote.text]);

  useEffect(() => {
    if (editedNote.text) {
      setNewTagsFromText(findHashtagsInText(editedNote.text));
    }
  }, [editedNote.text]);

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
            tags={tags}
          />
        </div>
        <div className="notes-creation__image">
          <MainPageImage />
        </div>
      </section>
      <section className="tags-container">
        <TagsInput
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          tags={tags}
          newTag={newTag}
          setNewTag={setNewTag}
          createTag={createTag}
          deleteTag={deleteTag}
        />
        {isTagCreationError && (
          <p className="tag-error">{`You can't create two identical tags`}</p>
        )}
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
              tags={note.noteTags}
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
          tags={tags}
        />
      )}
    </main>
  );
}

export default memo(MainPage);
