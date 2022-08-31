import React, { forwardRef } from 'react';
import { mergeProps } from '@react-aria/utils';
import { useFocusRing } from '@react-aria/focus';

import { thumbStyle, thumbDotStyle } from './styles';
import { useSlider } from './slider-context';

type ThumbProps = {
  value: number;
  isDragged: boolean;
  formatLabel: (value: number) => number | string;
} & React.HTMLAttributes<HTMLDivElement>;

function ThumbInternal(
  {
    value, // Just a single value passed via rander prop, not global array one
    isDragged,
    formatLabel,
    ...restProps
  }: ThumbProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { disabled, inverted } = useSlider();
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <div
      {...mergeProps(focusProps, restProps)}
      aria-valuetext={`${formatLabel(value)}`}
      ref={ref}
      css={thumbStyle({ disabled, inverted })}
    >
      <div css={thumbDotStyle({ isDragged, inverted, isFocusVisible })} />
    </div>
  );
}

const Thumb = forwardRef(ThumbInternal);

export default Thumb;
