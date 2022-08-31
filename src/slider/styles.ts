import { css } from '@emotion/react';

import { tokens } from '../tokens';

const THUMB_DOT_RADIUS = 12;
const INPUT_WIDTH = 60;

type TrackStyleOptions = {
  disabled: boolean;
};

export function trackStyle({ disabled }: TrackStyleOptions) {
  return css`
    display: flex;
    align-items: center;
    // Shift track slightly so thumb aligns with labels nicer
    width: calc(100% - ${THUMB_DOT_RADIUS}px);
    margin-left: ${THUMB_DOT_RADIUS / 2}px;
    height: ${tokens.sizing.small};
    opacity: ${disabled ? tokens.opacity.high : 1};
  `;
}

export function trackLineStyle() {
  return css`
    // Shift track line slightly so thumb aligns with labels nicer
    width: calc(100% + ${THUMB_DOT_RADIUS}px);
    margin-left: -${THUMB_DOT_RADIUS / 2}px;
    margin-right: -${THUMB_DOT_RADIUS / 2}px;
    height: 4px;
    border-radius: 2px;
  `;
}

type ThubmStyleOptions = {
  disabled: boolean;
  inverted: boolean;
};

export function thumbStyle({ disabled, inverted }: ThubmStyleOptions) {
  return css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${tokens.sizing.small};
    height: ${tokens.sizing.small};
    outline: 0;
    ${!disabled &&
    css`
      &:hover > div {
        box-shadow: 0 0 0 3px
          ${inverted ? tokens.colors.blue : tokens.colors.blueDark};
      }
    `}
  `;
}

type ThumbDotStyleOptions = {
  isDragged: boolean;
  inverted: boolean;
  isFocusVisible: boolean;
};

export function thumbDotStyle({
  isDragged,
  inverted,
  isFocusVisible,
}: ThumbDotStyleOptions) {
  const backgroundColor = inverted
    ? tokens.colors.blue
    : tokens.colors.blueDark;

  return css`
    width: ${THUMB_DOT_RADIUS}px;
    height: ${THUMB_DOT_RADIUS}px;
    ${isDragged && `box-shadow: 0 0 0 4px ${backgroundColor};`}
    ${isFocusVisible &&
    `box-shadow: 0 0 0 2px ${
      inverted ? tokens.colors.navyLight : tokens.colors.white
    }, 0 0 0 4px ${backgroundColor};`}
    border-radius: ${tokens.borderRadius.circle};
    background-color: ${backgroundColor};
    transition: box-shadow 200ms ease-out;
  `;
}

type ValueLabelsWrapperStyleOptions = {
  isSingleValue: boolean;
};

export function valueLabelsWrapperStyle({
  isSingleValue,
}: ValueLabelsWrapperStyleOptions) {
  return css`
    display: flex;
    justify-content: ${isSingleValue ? 'flex-end' : 'space-between'};
  `;
}

type InputsWrapperStyleOptions = {
  isSingleInput: boolean;
};

export function inputsWrapperStyle({
  isSingleInput,
}: InputsWrapperStyleOptions) {
  return css`
    ${isSingleInput
      ? css`
          width: ${INPUT_WIDTH}px;
          margin-left: calc(100% - ${INPUT_WIDTH}px);
        `
      : css`
          display: grid;
          grid-template-columns: ${INPUT_WIDTH}px ${INPUT_WIDTH}px;
          gap: calc(100% - ${INPUT_WIDTH * 2}px);
        `}
  `;
}

export function limitLabelsWrapperStyle() {
  return css`
    display: flex;
    justify-content: space-between;
    margin-top: -${tokens.spacing.xsmall};
  `;
}

type LabelStyleOptions = {
  inverted: boolean;
};

export function valueLabelStyle({ inverted }: LabelStyleOptions) {
  return css`
    color: ${inverted ? tokens.colors.white : tokens.colors.navy};
    font-size: ${tokens.fontSizes.xxlarge};
    font-weight: ${tokens.fontWeights.bold};
  `;
}

export function limitLabelStyle({ inverted }: LabelStyleOptions) {
  return css`
    color: ${inverted
      ? tokens.colors.navySubtleTextOnDark
      : tokens.colors.navySubtleTextOnLight};
    font-size: ${tokens.fontSizes.small};
  `;
}
