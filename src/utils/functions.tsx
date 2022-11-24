import { Note, Tag } from './interfaces';

const sortByDate = () => (a: Note | Tag, b: Note | Tag) =>
  (a.date || 0) < (b.date || 1) ? 1 : -1;

export default sortByDate;
