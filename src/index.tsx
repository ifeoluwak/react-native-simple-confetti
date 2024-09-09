import { StyleSheet, View, type ImageSourcePropType } from 'react-native';
import React, { useMemo, useState } from 'react';
import {
  ConfettiItemFall,
  ConfettiItemTumble,
} from './components/ConfettiItem';
import Circle from './components/Particles/Circle';
import Polygon from './components/Particles/Polygon';
import Polyline from './components/Particles/Polyline';
import Square from './components/Particles/Square';
import Star from './components/Particles/Star';
import Triangle from './components/Particles/Triangle';

const Confetti = ({
  count = 50,
  start,
  stop,
  speed = 3500,
  itemSize = 12,
  svgs = [
    <Circle fill="#b285fb" />,
    <Polygon fill="#f357ac" />,
    <Polyline fill="#fff045" />,
    <Square fill="#75f3c8" />,
    <Star fill="#8fed8f" />,
    <Triangle fill="#48b0f1" />,
  ],
  images,
  type,
  fromCenter,
  testID,
}: {
  count?: number;
  // start and stop are the y-axis values for the confetti to start and stop
  // start is default to the height of the container
  // stop is default to 0, which is the top of the container
  start?: number;
  stop?: number;
  speed?: number;
  itemSize?: number;
  svgs?: any[];
  images?: ImageSourcePropType[];
  type?: 'tumble' | 'fall';
  fromCenter?: boolean;
  testID?: string;
}) => {
  const [layout, setLayout] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const maxCount = useMemo(() => (count > 100 ? 100 : count), [count]);

  const arrayOfConfettis = useMemo(
    () => Array.from({ length: maxCount }, (_, i) => i),
    [maxCount]
  );

  const ConfettiElement =
    type === 'fall' ? ConfettiItemFall : ConfettiItemTumble;

  // If start is 0 and stop is not defined, set stop to layout height
  // This is to prevent confetti from staying stuck at the top of the screen
  if (start === 0 && !stop) {
    stop = layout?.height;
  }

  // if stop is is at the bottom of the screen and start is not defined, set start to 0
  // This is to prevent confetti from staying stuck at the bottom of the screen
  if (stop && layout?.height) {
    if (stop >= layout.height && !start) {
      start = 0;
    }
  }

  if (images && images?.length >= 1) {
    return (
      <View
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          setLayout({
            width,
            height,
          });
        }}
        style={styles.confettiView}
        testID={testID}
      >
        {layout
          ? arrayOfConfettis.map((i) => {
              const imgIdx = images[i % images.length];
              return (
                <ConfettiElement
                  key={i}
                  start={start ?? layout.height}
                  stop={stop ?? 0}
                  speed={speed}
                  img={imgIdx}
                  // split the confetti to fall from left and right in an alternating fashion
                  direction={i % 2 === 0 ? 'left' : 'right'}
                  itemSize={itemSize}
                  layout={layout}
                  fromCenter={fromCenter}
                />
              );
            })
          : null}
      </View>
    );
  }

  if (svgs && svgs?.length >= 1) {
    return (
      <View
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          setLayout({
            width,
            height,
          });
        }}
        style={styles.confettiView}
        testID={testID}
      >
        {layout
          ? arrayOfConfettis.map((i) => {
              const svgIdx = svgs[i % svgs.length];
              return (
                <ConfettiElement
                  key={i}
                  start={start ?? layout.height}
                  stop={stop ?? 0}
                  speed={speed}
                  svg={svgIdx}
                  direction={i % 2 === 0 ? 'left' : 'right'}
                  itemSize={itemSize}
                  layout={layout}
                  fromCenter={fromCenter}
                />
              );
            })
          : null}
      </View>
    );
  }
  return null;
};

export default React.memo(Confetti);

const styles = StyleSheet.create({
  confettiView: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
  },
});
