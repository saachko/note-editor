import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

interface NoteItemProps {
  title?: string;
  text?: string;
  deleteNote: () => void;
}

function NoteItem({ title, text, deleteNote }: NoteItemProps) {
  return (
    <div className="note">
      <div className="note__container">
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <div className="note__controls">
        <button type="button" id="edit" className="button">
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

export default NoteItem;
