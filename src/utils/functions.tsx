import Note from './interfaces';

const sortByDate = () => (a: Note, b: Note) =>
  (a.date || 0) < (b.date || 1) ? 1 : -1;

export default sortByDate;
