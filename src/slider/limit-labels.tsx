import { Text } from '../text';

import { limitLabelsWrapperStyle, limitLabelStyle } from './styles';
import { useSlider } from './slider-context';

type LimitLabelsProps = {
  formatLabel: (value: number) => number | string;
};

function LimitLabels({ formatLabel }: LimitLabelsProps) {
  const { min, max, inverted } = useSlider();

  return (
    <div css={limitLabelsWrapperStyle()}>
      <Text css={limitLabelStyle({ inverted })}>{formatLabel(min)}</Text>
      <Text css={limitLabelStyle({ inverted })}>{formatLabel(max)}</Text>
    </div>
  );
}

export default LimitLabels;
