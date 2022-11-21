import React from 'react';

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
  id,
  placeholder,
  name,
  onChange,
  value,
}: TextareaProps) {
  return (
    <div className="textarea__wrapper">
      <label className="textarea__label" htmlFor={name}>
        {labelText}
      </label>
      <textarea
        className="textarea__field"
        id={id}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

Textarea.defaultProps = {
  placeholder: '',
  value: '',
};

export default Textarea;
