import React from 'react';

interface ButtonProps {
  innerText: string;
  id: string;
  disabled?: boolean;
  callback?: (id: string) => void;
}

function Button({ innerText, id, disabled, callback }: ButtonProps) {
  return (
    <button
      className="button"
      type="button"
      id={id}
      disabled={disabled}
      onClick={() => (callback ? callback(id) : undefined)}
    >
      {innerText}
    </button>
  );
}

Button.defaultProps = {
  disabled: false,
  callback: undefined,
};

export default Button;
