import React, { useState, useEffect } from 'react';

import { Input } from '../input';

import { inputsWrapperStyle } from './styles';
import { useSlider } from './slider-context';

type InputsProps = {
  onChange: (value: number[]) => void;
  step: number;
  label: string;
};

function Inputs({ onChange, step, label }: InputsProps) {
  const { value, min, max, disabled, inverted } = useSlider();
  const isSingleInput = value.length === 1;
  // Keep separate state for inputs, some characters other than numeric must be covered
  const [inputValue, setInputValue] = useState<Array<string | number>>(value);

  // Sync values from props and inputs
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  function handleOnChange(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) {
    const inputValue = event.target.value;
    const parsedValue = parseFloat(event.target.value);

    if (inputValue.match(/^-?([0-9]{1,})?(\.)?([0-9]{1,})?$/)) {
      if (isSingleInput) {
        setInputValue([inputValue]);
      } else {
        setInputValue(
          value.map((val, valIndex) => {
            return index === valIndex ? inputValue : val;
          }),
        );
      }
    }

    if (
      !Number.isNaN(parsedValue) &&
      !inputValue.endsWith('.') &&
      parsedValue % step === 0
    ) {
      if (index === 0) {
        if (isSingleInput && parsedValue >= min && parsedValue <= max) {
          onChange([parsedValue]);
        } else if (parsedValue >= min && parsedValue <= value[1]) {
          onChange([parsedValue, value[1]]);
        }
      } else {
        if (parsedValue >= value[0] && parsedValue <= max) {
          onChange([value[0], parsedValue]);
        }
      }
    }
  }

  return (
    <div css={inputsWrapperStyle({ isSingleInput })}>
      <Input
        value={inputValue[0]}
        onChange={(event) => handleOnChange(event, 0)}
        disabled={disabled}
        inverted={inverted}
        aria-label={label}
      />
      {!isSingleInput && (
        <Input
          value={inputValue[1]}
          onChange={(event) => handleOnChange(event, 1)}
          disabled={disabled}
          inverted={inverted}
          aria-label={label}
        />
      )}
    </div>
  );
}

export default Inputs;
