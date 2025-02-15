import { useState } from 'react';
import { Radio } from '@datacamp/waffles/radio';

import type { PlaygroundConfig } from '../../types';

const initialCode = `
import React, { useState } from 'react';

import { Radio } from '@datacamp/waffles/radio';

function Playground() {
  const [value, setValue] = useState('');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  // Using style, because emotion css prop doesn't work in Playground

  return (
    <form style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <Radio
        name="radio-group"
        value="radio1"
        checked={value === 'radio1'}
        onChange={handleChange}
      >First radio description</Radio>
      <Radio
        name="radio-group"
        value="radio2"
        checked={value === 'radio2'}
        onChange={handleChange}
      >Second radio description</Radio>
    </form>
  );
}
`;

const playgroundConfig: PlaygroundConfig = {
  initialCode,
  scope: {
    useState,
    Radio,
  },
};

export default playgroundConfig;
