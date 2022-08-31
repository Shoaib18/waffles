import { Range } from 'react-range';

import ValueLabels from './value-labels';
import Track from './track';
import Thumb from './thumb';
import LimitLabels from './limit-labels';
import Inputs from './inputs';

type SliderProps = {
  value: number[];
  onChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  hideLabels?: boolean;
  showInputs?: boolean;
  formatLabel?: (value: number) => number | string;
  inverted?: boolean;
  'aria-label': string;
};

function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  hideLabels = false,
  showInputs = false,
  inverted = false,
  'aria-label': ariaLabel,
  formatLabel = (value) => value,
}: SliderProps) {
  if (value.length > 2 || value.length === 0) {
    throw new Error('Array of only one or two Slider values is supported.');
  }

  return (
    <div>
      {showInputs && (
        <Inputs
          {...{ value, onChange, min, max, label: ariaLabel, inverted }}
        />
      )}
      {!hideLabels && !showInputs && (
        <ValueLabels
          value={value}
          inverted={inverted}
          formatLabel={formatLabel}
        />
      )}
      <Range
        {...{ values: value, min, max, step, onChange, disabled }}
        renderTrack={({ props, children }) => (
          <Track {...props} {...{ value, min, max, disabled, inverted }}>
            {children}
          </Track>
        )}
        renderThumb={({ props, value, isDragged }) => (
          <Thumb
            {...props}
            {...{
              value,
              isDragged,
              disabled,
              inverted,
              'aria-label': ariaLabel,
              formatLabel,
            }}
          />
        )}
      />
      {!hideLabels && <LimitLabels {...{ min, max, inverted, formatLabel }} />}
    </div>
  );
}

export default Slider;
