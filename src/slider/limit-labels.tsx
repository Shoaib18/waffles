import { Text } from '../text';

import { limitLabelsWrapperStyle, limitLabelStyle } from './styles';

type LimitLabelsProps = {
  min: number;
  max: number;
  inverted: boolean;
  formatLabel: (value: number) => number | string;
};

function LimitLabels({ min, max, inverted, formatLabel }: LimitLabelsProps) {
  return (
    <div css={limitLabelsWrapperStyle()}>
      <Text css={limitLabelStyle({ inverted })}>{formatLabel(min)}</Text>
      <Text css={limitLabelStyle({ inverted })}>{formatLabel(max)}</Text>
    </div>
  );
}

export default LimitLabels;
