import React, { memo } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

interface NoteItemProps {
  title?: string;
  text?: string;
  deleteNote: () => void;
  editNote: () => void;
}

function NoteItem({ title, text, deleteNote, editNote }: NoteItemProps) {
  return (
    <div className="note">
      <div className="note__container">
        <h2>{title}</h2>
        <p>{text}</p>
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

NoteItem.defaultProps = {
  title: '',
  text: '',
};

export default memo(NoteItem);
