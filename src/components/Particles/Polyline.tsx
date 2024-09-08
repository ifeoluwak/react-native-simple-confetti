import { Svg, Polyline as SvgPolyline, type SvgProps } from 'react-native-svg';

const Polyline = (props: SvgProps) => (
  <Svg width={33} height={28} viewBox="0 0 33 28" {...props}>
    <SvgPolyline
      strokeWidth="10"
      transform="translate(16.500000, 14.316976) scale(-1, 1) translate(-16.500000, -14.316976) "
      points="29 20.8169761 18.3944594 9.36299232 14.0516206 18.6727264 4 7.81697613"
      fill={props.fill || 'currentColor'}
    />
  </Svg>
);

export default Polyline;
