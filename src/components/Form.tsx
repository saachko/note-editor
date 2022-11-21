import React from 'react';

import Button from './Button';
import Input from './Input';
import Textarea from './Textarea';

function Form() {
  return (
    <form className="form">
      <Input
        labelText="Note title"
        type="text"
        id="title"
        name="title"
        onChange={() => {}}
      />
      <Textarea
        labelText="Note text"
        id="note"
        name="note"
        placeholder="Start typing.."
        onChange={() => {}}
      />
      <Button innerText="Create" id="clear" callback={() => {}} />
    </form>
  );
}

export default Form;
