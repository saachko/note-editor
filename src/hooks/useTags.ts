import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { defaultTag } from 'utils/constants';
import { addHashtagToTag } from 'utils/functions';
import { Tag } from 'utils/interfaces';

import dataBase from '../firebase';

const useTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState(defaultTag);

  const tagsCollection = collection(dataBase, 'tags');

  const getTags = async () => {
    const data = await getDocs(tagsCollection);
    const tagsFromDataBase = data.docs.map((item) => ({
      ...item.data(),
      id: item.id,
    })) as Tag[];
    setTags(tagsFromDataBase);
    return tagsFromDataBase;
  };

  const createTag = async (tagToCreate: Tag) => {
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

  const deleteTag = async (id: string) => {
    const tag = doc(dataBase, 'tags', id);
    await deleteDoc(tag);
    await getTags();
  };

  useEffect(() => {
    getTags();
  }, []);

  const onEnter = async (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      await getTags();
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', onEnter);
    return () => window.removeEventListener('keyup', onEnter);
  }, [tags]);

  return {
    tags,
    setTags,
    newTag,
    setNewTag,
    getTags,
    createTag,
    deleteTag,
  };
};

export default useTags;
