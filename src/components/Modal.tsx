import React, { memo } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import Note from 'utils/interfaces';
import SetState from 'utils/types';

import Form from './Form';

interface ModalProps {
  setActive: SetState<boolean>;
  editedNote: Note;
  setEditedNote: SetState<Note>;
  editFormHandler: () => void;
}

function Modal({
  setActive,
  editedNote,
  setEditedNote,
  editFormHandler,
}: ModalProps) {
  return (
    <div className="shadow" onClick={() => setActive(false)} aria-hidden="true">
      <div
        className="modal"
        onClick={(event) => event.stopPropagation()}
        aria-hidden="true"
      >
        <h2>Edit your note</h2>
        <Form
          buttonText="Edit"
          note={editedNote}
          setNote={setEditedNote}
          onSubmit={editFormHandler}
        />
        <button
          type="button"
          id="close"
          className="button close-button"
          onClick={() => setActive(false)}
        >
          <AiOutlineClose />
        </button>
      </div>
    </div>
  );
}

export default memo(Modal);
