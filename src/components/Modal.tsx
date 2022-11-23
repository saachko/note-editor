import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import SetState from 'utils/types';

interface ModalProps {
  setActive: SetState<boolean>;
}

function Modal({ setActive }: ModalProps) {
  return (
    <div className="shadow" onClick={() => setActive(false)} aria-hidden="true">
      <div
        className="modal"
        onClick={(event) => event.stopPropagation()}
        aria-hidden="true"
      >
        <p>This is the modal</p>
        <button
          type="button"
          id="close"
          className="button"
          onClick={() => setActive(false)}
        >
          <AiOutlineClose />
        </button>
      </div>
    </div>
  );
}

export default Modal;
