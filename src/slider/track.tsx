import { getTrackBackground } from 'react-range';
import React, { forwardRef } from 'react';

import { tokens } from '../tokens';
import { hexToRgba } from '../helpers';

import { trackStyle, trackLineStyle } from './styles';
import { useSlider } from './slider-context';

type TrackProps = React.HTMLAttributes<HTMLDivElement>;

function TrackInternal(
  { children, ...restProps }: TrackProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { value, min, max, disabled, inverted } = useSlider();

  const filledColor = inverted ? tokens.colors.blue : tokens.colors.blueDark;
  const backgroundColor = hexToRgba(
    inverted ? tokens.colors.white : tokens.colors.navy,
    0.15,
  );

  return (
    <div {...restProps} ref={ref} css={trackStyle({ disabled })}>
      <div
        css={trackLineStyle()}
        style={{
          background: getTrackBackground({
            values: value,
            min,
            max,
            colors:
              value.length == 1
                ? [filledColor, backgroundColor]
                : [backgroundColor, filledColor, backgroundColor],
          }),
        }}
      />
      {children}
    </div>
  );
}

const Track = forwardRef(TrackInternal);

export default Track;
