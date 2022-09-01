import { Range } from 'react-range';

import ValueLabels from './value-labels';
import Track from './track';
import Thumb from './thumb';
import { SliderProvider } from './slider-context';
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
    <SliderProvider {...{ value, min, max, disabled, inverted }}>
      <div>
        {showInputs && (
          <Inputs onChange={onChange} step={step} label={ariaLabel} />
        )}
        {!hideLabels && !showInputs && (
          <ValueLabels formatLabel={formatLabel} />
        )}
        <Range
          {...{ values: value, min, max, step, onChange, disabled }}
          renderTrack={({ props, children }) => (
            <Track {...props}>{children}</Track>
          )}
          renderThumb={({ props, value, isDragged }) => (
            <Thumb
              {...props}
              {...{
                value,
                isDragged,
                'aria-label': ariaLabel,
                formatLabel,
              }}
            />
          )}
        />
        {!hideLabels && <LimitLabels formatLabel={formatLabel} />}
      </div>
    </SliderProvider>
  );
}

export default Slider;
