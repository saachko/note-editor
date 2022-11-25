import React, { memo } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { v4 } from 'uuid';

interface NoteItemProps {
  title: string;
  text: string;
  tags: string[];
  deleteNote: () => void;
  editNote: () => void;
}

function NoteItem({ title, text, tags, deleteNote, editNote }: NoteItemProps) {
  return (
    <div className="note">
      <div className="note__container">
        <h2>{title}</h2>
        <p>{text}</p>
        <ul className="tags__list">
          {tags &&
            tags.length > 0 &&
            tags.map((tag) => (
              <li key={v4()} className="tag" aria-hidden="true">
                {tag}
              </li>
            ))}
        </ul>
      </div>
      <div className="note__controls">
        <button type="button" id="edit" className="button" onClick={editNote}>
          <AiOutlineEdit />
        </button>
        <button
          type="button"
          id="delete"
          className="button"
          onClick={deleteNote}
        >
          <AiOutlineDelete />
        </button>
      </div>
    </div>
  );
}

export default memo(NoteItem);
