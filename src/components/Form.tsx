import React, { memo, useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { sortByDate } from 'utils/functions';
import { Note, Tag } from 'utils/interfaces';
import SetState from 'utils/types';

import Button from './Button';
import Input from './Input';
import Textarea from './Textarea';

interface FormProps {
  buttonText: string;
  note: Note;
  setNote: SetState<Note>;
  onSubmit: () => void;
  tags: Tag[];
}

function Form({ buttonText, note, setNote, onSubmit, tags }: FormProps) {
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [titleErrorMessage, setTitleErrorMessage] = useState('');
  const [textErrorMessage, setTextErrorMessage] = useState('');

  const validateForm = () => {
    let isFormValid = true;

    if (note.title && (note.title.length < 2 || note.title.length > 30)) {
      isFormValid = false;
      setTitleErrorMessage(
        "This field can't be shorter than 2 or longer than 30 characters"
      );
    } else if (!note.title) {
      isFormValid = false;
      setTitleErrorMessage("This field can't be empty");
    }

    if (note.text && (note.text.length < 10 || note.text.length > 300)) {
      isFormValid = false;
      setTextErrorMessage(
        "This field can't be shorter than 10 or longer than 300 characters"
      );
    } else if (!note.text) {
      isFormValid = false;
      setTextErrorMessage("This field can't be empty");
    }

    return isFormValid;
  };

  useEffect(() => {
    if (titleErrorMessage) {
      setTitleErrorMessage('');
    }
  }, [note.title]);

  useEffect(() => {
    if (textErrorMessage) {
      setTextErrorMessage('');
    }
  }, [note.text]);

  const handleOnSubmit = () => {
    if (validateForm()) {
      setTitleErrorMessage('');
      setTextErrorMessage('');
      onSubmit();
    }
  };

  useEffect(() => {
    if (!note.title && !note.text) {
      setButtonDisabled(true);
      setTitleErrorMessage('');
      setTextErrorMessage('');
    }
    return () => setButtonDisabled(false);
  }, [note]);

  const addTags = (tagName: string) => {
    if (note.noteTags.find((item) => item === tagName)) {
      setNote((prev) => ({
        ...prev,
        noteTags: [...prev.noteTags.filter((item) => item !== tagName)],
      }));
      return;
    }
    setNote((prev) => ({
      ...prev,
      noteTags: [...prev.noteTags, tagName],
    }));
  };

  return (
    <form className="form">
      <div className="form-field__wrapper">
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
        <p className="form-field__error">{titleErrorMessage}</p>
      </div>
      <div className="form-field__wrapper">
        <Textarea
          labelText="Note text"
          id={note.id}
          name="note"
          placeholder="Start typing..."
          value={note.text}
          onChange={({ target }) => {
            setNote((prev) => ({ ...prev, text: target.value }));
          }}
        />
        <p className="form-field__error">{textErrorMessage}</p>
      </div>
      <div className="tags__list">
        {tags.sort(sortByDate()).map((tag) => (
          <div key={v4()}>
            <input
              type="checkbox"
              id={note.id === 'default' ? tag.id : `${tag.tagName}${tag.id}`}
              className="tag__input"
              checked={note.noteTags.includes(tag.tagName)}
              onChange={() => addTags(tag.tagName)}
            />
            <label
              id={tag.tagName}
              className="tag"
              htmlFor={
                note.id === 'default' ? tag.id : `${tag.tagName}${tag.id}`
              }
            >
              {tag.tagName}
            </label>
          </div>
        ))}
      </div>
      <Button
        innerText={buttonText}
        id="clear"
        callback={handleOnSubmit}
        disabled={isButtonDisabled}
      />
    </form>
  );
}

export default memo(Form);
