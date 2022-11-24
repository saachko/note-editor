import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from '@firebase/firestore';
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { v4 } from 'uuid';

import { defaultTag } from 'utils/constants';
import sortByDate from 'utils/functions';
import { Tag } from 'utils/interfaces';
import SetState from 'utils/types';

import dataBase from '../firebase';

interface TagsInputProps {
  tags: Tag[];
  setTags: SetState<Tag[]>;
}

function TagsInput({ tags, setTags }: TagsInputProps) {
  const [newTag, setNewTag] = useState(defaultTag);
  // const removeTags = (indexToRemove) => {
  //   setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  // };
  // const addTags = (event) => {
  //   if (event.target.value !== '') {
  //     setTags([...tags, event.target.value]);
  //     props.selectedTags([...tags, event.target.value]);
  //     event.target.value = '';
  //   }
  // };

  const tagsCollection = collection(dataBase, 'tags');

  const getTags = async () => {
    const data = await getDocs(tagsCollection);
    const tagsFromDataBase: Tag[] = data.docs.map((item) => ({
      ...item.data(),
      id: item.id,
    }));
    setTags(tagsFromDataBase);
  };

  const createTag = async (tagToCreate: Tag) => {
    await addDoc(tagsCollection, {
      ...tagToCreate,
      id: v4(),
      date: new Date(),
    });
    await getTags();
    setNewTag(defaultTag);
  };

  const deleteTag = async (id: string) => {
    const tag = doc(dataBase, 'tags', id);
    await deleteDoc(tag);
    await getTags();
  };

  return (
    <div className="tags__wrapper">
      <ul className="tags__list">
        {tags.sort(sortByDate()).map((tag) => (
          <li key={tag.id} className="tag">
            <span className="tag__title">{tag.tagName}</span>
            <button
              type="button"
              id="close"
              className="button tag__close-button"
              onClick={() => deleteTag(tag.id)}
            >
              <AiOutlineClose />
            </button>
          </li>
        ))}
      </ul>
      <input
        className="tags__input"
        type="text"
        value={newTag.tagName}
        onChange={({ target }) => {
          setNewTag((prev) => ({ ...prev, tagName: target.value }));
        }}
        onKeyUp={(event) => (event.key === 'Enter' ? createTag(newTag) : null)}
        placeholder="Press Enter to add tags"
      />
    </div>
  );
}

export default TagsInput;
