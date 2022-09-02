import React, { useState, useEffect } from 'react';

import { Input } from '../input';

import { initalError, isDecimal, isCompatible, isWhitelisted } from './utils';
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

  // Keep separate state for inputs, because some characters other than numeric must be covered
  // Both input and error state is an array of one or two items, to mimic structure of Slider value
  const [inputValue, setInputValue] = useState<Array<string | number>>(value);
  const [hasError, setHasError] = useState(initalError(isSingleInput));

  // Sync value from props and inputs
  // Clear all inputs errors when Slider is dragged
  useEffect(() => {
    setInputValue(value);
    setHasError(initalError(isSingleInput));
  }, [value, isSingleInput]);

  // Separate each input handler for readibility

  function handleSingleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value;
    const parsedValue = parseFloat(event.target.value);

    if (isDecimal(inputValue)) {
      setInputValue([inputValue]);
    }

    if (
      isCompatible(inputValue, step) &&
      parsedValue >= min &&
      parsedValue <= max
    ) {
      onChange([parsedValue]);
      setHasError([false]);
    } else {
      isWhitelisted(inputValue) && setHasError([true]);
    }
  }

  function handleFirstInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value;
    const parsedValue = parseFloat(event.target.value);

    if (isDecimal(inputValue)) {
      setInputValue([inputValue, value[1]]);
    }

    if (
      isCompatible(inputValue, step) &&
      parsedValue >= min &&
      parsedValue <= value[1]
    ) {
      onChange([parsedValue, value[1]]);
      setHasError([true, hasError[1]]);
    } else {
      isWhitelisted(inputValue) && setHasError([true, hasError[1]]);
    }
  }

  function handleSecondInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value;
    const parsedValue = parseFloat(event.target.value);

    if (isDecimal(inputValue)) {
      setInputValue([value[0], inputValue]);
    }

    if (
      isCompatible(inputValue, step) &&
      parsedValue >= value[0] &&
      parsedValue <= max
    ) {
      onChange([value[0], parsedValue]);
      setHasError([hasError[0], true]);
    } else {
      isWhitelisted(inputValue) && setHasError([hasError[0], true]);
    }
  }

  function renderInput(
    value: string | number,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    error: boolean,
  ) {
    return (
      <Input
        {...{ value, onChange, error, disabled, inverted, 'aria-label': label }}
      />
    );
  }

  return (
    <div css={inputsWrapperStyle({ isSingleInput })}>
      {isSingleInput ? (
        renderInput(inputValue[0], handleSingleInputChange, hasError[0])
      ) : (
        <>
          {renderInput(inputValue[0], handleFirstInputChange, hasError[0])}
          {renderInput(inputValue[1], handleSecondInputChange, hasError[1])}
        </>
      )}
    </div>
  );
}

export default Inputs;
