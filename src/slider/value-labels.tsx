import { Text } from '../text';

import { valueLabelsWrapperStyle, valueLabelStyle } from './styles';
import { useSlider } from './slider-context';

type ValueLabelsProps = {
  formatLabel: (value: number) => number | string;
};

function ValueLabels({ formatLabel }: ValueLabelsProps) {
  const { value, inverted } = useSlider();
  const isSingleValue = value.length === 1;

  return (
    <div css={valueLabelsWrapperStyle({ isSingleValue })}>
      <Text css={valueLabelStyle({ inverted })}>{formatLabel(value[0])}</Text>
      {!isSingleValue && (
        <Text css={valueLabelStyle({ inverted })}>{formatLabel(value[1])}</Text>
      )}
    </div>
  );
}

export default ValueLabels;
