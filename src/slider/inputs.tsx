import React, { useState, useEffect } from 'react';

import { Input } from '../input';

import { inputsWrapperStyle } from './styles';

type InputsProps = {
  value: number[];
  onChange: (value: number[]) => void;
  min: number;
  max: number;
  label: string;
  inverted: boolean;
};

function Inputs({ value, onChange, min, max, label, inverted }: InputsProps) {
  // Keep separate state for inputs, because space and minus chars must be supported
  const [derivedValue, setDerivedValue] =
    useState<Array<string | number>>(value);

  // Sync values from props and inputs
  useEffect(() => {
    setDerivedValue(value);
  }, [value]);

  const isSingleInput = value.length === 1;

  function handleFirstInputOnChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const inputValue = event.target.value;
    const parsedValue = parseFloat(event.target.value);

    if (inputValue === '' || inputValue === '-') {
      setDerivedValue([inputValue, value[1]]);
    } else if (!Number.isNaN(parsedValue)) {
      if (parsedValue >= min && parsedValue <= value[1]) {
        onChange([parsedValue, value[1]]);
      }
      setDerivedValue([parsedValue, value[1]]);
    }
  }

  function handleSecondInputOnChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const inputValue = event.target.value;
    const parsedValue = parseFloat(event.target.value);

    if (inputValue === '' || inputValue === '-') {
      setDerivedValue([value[0], inputValue]);
    } else if (!Number.isNaN(parsedValue)) {
      if (parsedValue >= value[0] && parsedValue <= max) {
        onChange([value[0], parsedValue]);
      }
      setDerivedValue([value[0], parsedValue]);
    }
  }

  return (
    <div css={inputsWrapperStyle({ isSingleInput })}>
      <Input
        value={derivedValue[0]}
        onChange={handleFirstInputOnChange}
        error={
          isSingleInput
            ? derivedValue[0] < min || derivedValue[0] > max
            : derivedValue[0] < min || derivedValue[0] > value[1]
        }
        inverted={inverted}
        aria-label={label}
      />
      {!isSingleInput && (
        <Input
          value={derivedValue[1]}
          onChange={handleSecondInputOnChange}
          error={derivedValue[1] > max || derivedValue[1] < value[0]}
          inverted={inverted}
          aria-label={label}
        />
      )}
    </div>
  );
}

export default Inputs;
