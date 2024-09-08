import { Svg, Rect, type SvgProps } from 'react-native-svg';

const Square = (props: SvgProps) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" {...props}>
    <Rect
      transform="translate(8.000000, 8.000000) scale(-1, 1) rotate(180.000000) translate(-8.000000, -8.000000) "
      x="0"
      y="0"
      width="16"
      height="16"
      fill={props.fill || 'currentColor'}
    />
  </Svg>
);

export default Square;
