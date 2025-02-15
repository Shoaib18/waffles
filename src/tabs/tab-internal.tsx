import React from 'react';
import { mergeProps } from '@react-aria/utils';
import { useFocusRing } from '@react-aria/focus';

import { tabStyle, tabInnerContentStyle, tabFauxContenStyle } from './styles';

import type { PolymorphicRef, PolymorphicComponentProps } from '../helpers';

type TabBaseProps = {
  /* The label displayed on the tab. */
  label: string;
  /* Content of a tab panel displayed below corresponding tab. */
  children?: React.ReactNode;
  /* An icon displayed to the left of the label. Could be any [icon](/components/icon) from Waffles (use `xsmall` size) or a custom component. */
  icon?: React.ReactNode;
  /* [skip docs] */
  isActive?: boolean;
  /* [skip docs] */
  inverted?: boolean;
};

export type TabProps<T extends React.ElementType = 'button'> =
  PolymorphicComponentProps<T, TabBaseProps>;

function TabInternal<T extends React.ElementType = 'button'>(
  {
    as,
    label,
    icon,
    isActive = false,
    inverted = false,
    type,
    ...restProps
  }: TabProps<T>,
  ref?: PolymorphicRef<T>,
) {
  const Element = as || 'button';

  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <Element
      {...mergeProps(focusProps, restProps)}
      type={!type && Element === 'button' ? 'button' : type}
      ref={ref}
      role="tab"
      css={tabStyle({ isActive, isFocusVisible, inverted })}
    >
      {icon}
      <span css={tabInnerContentStyle({ hasIcon: !!icon })}>
        {label}
        <span css={tabFauxContenStyle()} aria-hidden="true">
          {label}
        </span>
      </span>
    </Element>
  );
}

export default TabInternal;
