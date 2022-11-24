import { Note, Tag } from './interfaces';

const defaultNote: Note = {
  id: 'default',
  title: '',
  text: '',
  noteTags: [],
};

const defaultTag: Tag = {
  id: 'default',
  tagName: '',
};

export { defaultNote, defaultTag };
