import React, { useEffect } from 'react';

import { highlightTags } from 'utils/functions';

interface TextareaProps {
  labelText: string;
  id: string;
  name: string;
  onChange: (target: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  value?: string;
}
function Textarea({
  labelText,
  placeholder,
  id,
  name,
  onChange,
  value,
}: TextareaProps) {
  useEffect(() => {
    if (id === 'default') {
      highlightTags('note', 'hashtags');
    } else {
      highlightTags('edited', 'editedHashtags');
    }
  }, [value]);

  return (
    <div className="textarea__wrapper">
      <label className="textarea__label" htmlFor={name}>
        {labelText}
      </label>
      <div className="textarea__container">
        <textarea
          className="textarea__field"
          id={id === 'default' ? 'note' : 'edited'}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          value={value}
        />
        <div
          className="textarea__div"
          id={id === 'default' ? 'hashtags' : 'editedHashtags'}
        />
      </div>
    </div>
  );
}

Textarea.defaultProps = {
  placeholder: '',
  value: '',
};

export default Textarea;
