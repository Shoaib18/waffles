import { css } from '@emotion/react';

import { tokens } from '../../tokens';
import { Button } from '../index';

const wrapperStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing.medium};
  padding: ${tokens.spacing.medium};
`;

const variants = ['primary', 'secondary', 'plain', 'destructive'] as const;
const sizes = ['small', 'medium', 'large'] as const;

function Story() {
  return (
    <>
      {/* Regular */}
      <div>
        {variants.map((variant) => {
          return (
            <div css={wrapperStyle} key={variant}>
              {sizes.map((size) => {
                return (
                  <Button
                    key={`${variant}-${size}`}
                    variant={variant}
                    size={size}
                  >
                    Regular
                  </Button>
                );
              })}
            </div>
          );
        })}
      </div>
      {/* Regular disabled */}
      <div>
        {variants.map((variant) => {
          return (
            <div css={wrapperStyle} key={variant}>
              {sizes.map((size) => {
                return (
                  <Button
                    disabled
                    key={`disabled-${variant}-${size}`}
                    variant={variant}
                    size={size}
                  >
                    Disabled
                  </Button>
                );
              })}
            </div>
          );
        })}
      </div>
      {/* Inverted */}
      <div
        css={css`
          background-color: ${tokens.colors.navy};
        `}
      >
        {variants.map((variant) => {
          return (
            <div css={wrapperStyle} key={variant}>
              {sizes.map((size) => {
                return (
                  <Button
                    inverted
                    key={`inverted-${variant}-${size}`}
                    variant={variant}
                    size={size}
                  >
                    Inverted
                  </Button>
                );
              })}
            </div>
          );
        })}
      </div>
      {/* Inverted disabled */}
      <div
        css={css`
          background-color: ${tokens.colors.navy};
        `}
      >
        {variants.map((variant) => {
          return (
            <div css={wrapperStyle} key={variant}>
              {sizes.map((size) => {
                return (
                  <Button
                    inverted
                    disabled
                    key={`inverted-disabled-${variant}-${size}`}
                    variant={variant}
                    size={size}
                  >
                    Inverted Disabled
                  </Button>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Story;
