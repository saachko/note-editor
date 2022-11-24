import { Note, Tag } from './interfaces';

const sortByDate = () => (a: Note | Tag, b: Note | Tag) =>
  (a.date || 0) < (b.date || 1) ? 1 : -1;

const addHashtagToTag = (tag: Tag) => {
  let tagWithHashtag = '#';
  if (tag.tagName && tag.tagName[0] !== '#') {
    tagWithHashtag += tag.tagName;
    return { ...tag, tagName: tagWithHashtag };
  }
  return tag;
};

export { sortByDate, addHashtagToTag };
