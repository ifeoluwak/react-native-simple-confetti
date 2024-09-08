import { Svg, Polygon, type SvgProps } from 'react-native-svg';

const Triangle = (props: SvgProps) => (
  <Svg width={18} height={21} viewBox="0 0 18 21" {...props}>
    <Polygon
      transform="translate(9.000000, 10.316976) scale(-1, 1) rotate(270.000000) translate(-9.000000, -10.316976) "
      points="9 1.81697613 19 18.8169761 -1 18.8169761"
      fill={props.fill || 'currentColor'}
    />
  </Svg>
);

export default Triangle;
