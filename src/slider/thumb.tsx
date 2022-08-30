import React, { forwardRef } from 'react';
import { mergeProps } from '@react-aria/utils';
import { useFocusRing } from '@react-aria/focus';

import { thumbStyle, thumbDotStyle } from './styles';

type ThumbProps = {
  value: number;
  isDragged: boolean;
  disabled: boolean;
  inverted: boolean;
  formatLabel: (value: number) => number | string;
} & React.HTMLAttributes<HTMLDivElement>;

function ThumbInternal(
  {
    value,
    isDragged,
    disabled,
    inverted,
    formatLabel,
    ...restProps
  }: ThumbProps,
  ref: React.Ref<HTMLDivElement>,
) {
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
