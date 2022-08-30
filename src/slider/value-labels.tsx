import { Text } from '../text';

import { valueLabelsWrapperStyle, valueLabelStyle } from './styles';

type ValueLabelsProps = {
  value: number[];
  inverted: boolean;
  formatLabel: (value: number) => number | string;
};

function ValueLabels({ value, inverted, formatLabel }: ValueLabelsProps) {
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
