import React from 'react';

interface InputProps {
  labelText: string;
  type: string;
  id: string;
  name: string;
  onChange: (target: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder?: string;
}

function Input({
  labelText,
  type,
  id,
  name,
  value,
  placeholder,
  onChange,
}: InputProps) {
  return (
    <div className="input__wrapper">
      <label className="input__label" htmlFor={name}>
        {labelText}
      </label>
      <input
        className="input__field"
        type={type}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

Input.defaultProps = {
  value: '',
  placeholder: '',
};

export default Input;
