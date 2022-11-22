import React, { useEffect, useState } from 'react';

import Note from 'utils/interfaces';
import SetState from 'utils/types';

import Button from './Button';
import Input from './Input';
import Textarea from './Textarea';

interface FormProps {
  buttonText: string;
  note: Note;
  setNote: SetState<Note>;
  onSubmit: () => void;
}

function Form({ buttonText, note, setNote, onSubmit }: FormProps) {
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    if (!note.title || !note.text) {
      setButtonDisabled(true);
    }
    return () => setButtonDisabled(false);
  }, [note]);

  return (
    <form className="form">
      <Input
        labelText="Note title"
        type="text"
        id="title"
        name="title"
        value={note.title}
        onChange={({ target }) => {
          setNote((prev) => ({ ...prev, title: target.value }));
        }}
      />
      <Textarea
        labelText="Note text"
        id="note"
        name="note"
        placeholder="Start typing..."
        value={note.text}
        onChange={({ target }) => {
          setNote((prev) => ({ ...prev, text: target.value }));
        }}
      />
      <Button
        innerText={buttonText}
        id="clear"
        callback={onSubmit}
        disabled={isButtonDisabled}
      />
    </form>
  );
}

export default Form;
