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
    const tagsFromDataBase: Tag[] = data.docs.map((item) => ({
      ...item.data(),
      id: item.id,
    }));
    setTags(tagsFromDataBase);
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
    (async () => {
      await getTags();
    })();
  }, []);

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
