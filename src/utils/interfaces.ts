interface Note {
  id: string;
  title: string;
  text: string;
  noteTags: string[];
  date?: Date;
}

interface Tag {
  id: string;
  tagName: string;
  date?: Date;
}

export type { Note, Tag };
