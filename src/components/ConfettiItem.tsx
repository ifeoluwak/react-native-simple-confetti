/* eslint-disable react-native/no-inline-styles */
import Animated, {
  clamp,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import React, { useEffect } from 'react';
import { Image, type ImageSourcePropType } from 'react-native';

const ConfettiFallItem = ({
  start,
  stop,
  speed,
  itemSize,
  img,
  svg,
  direction,
  layout,
  fromCenter,
}: {
  start?: number;
  stop?: number;
  speed?: number;
  itemSize?: number;
  img?: ImageSourcePropType;
  svg?: any;
  direction?: 'left' | 'right';
  layout: { width: number; height: number };
  fromCenter?: boolean;
}) => {
  const renderDelay = Math.floor(Math.random() * 5000);
  const [ready, setReady] = React.useState(false);
  const y = useSharedValue(start ?? layout.height);
  const x = useSharedValue(0);
  const opacity = useSharedValue(1);
  const randomBeziers = Easing.bezier(
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random()
  );
  const randomDuration = Math.floor(Math.random() * 1000) + 1000;
  const randomOpacityDuration = Math.floor(Math.random() * 2000) + 1000;
  const randomX = layout.width * Math.random();

  const xAxis = direction === 'left' ? -randomX : randomX;

  const randomDelay = Math.floor(Math.random() * 100);

  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, renderDelay);
  }, [renderDelay]);

  useEffect(() => {
    if (!ready) {
      return;
    }
    x.value = fromCenter ? xAxis : clamp(xAxis, 0, layout.width);
    y.value = stop ?? 0;
    opacity.value = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, fromCenter]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withDelay(
            randomDelay,
            withTiming(y.value, {
              duration: speed ?? randomDuration,
              easing: randomBeziers,
            })
          ),
        },
        {
          translateX: withDelay(
            randomDelay,
            withTiming(x.value, {
              duration: speed ?? randomDuration,
              easing: randomBeziers,
            })
          ),
        },
        {
          rotate: withTiming(`${Math.random() * 360}deg`, {
            duration: speed ?? randomDuration,
            easing: randomBeziers,
          }),
        },
      ],
      opacity: withTiming(opacity.value, {
        duration: speed ?? randomOpacityDuration,
      }),
    };
  });

  if (!ready) {
    return null;
  }

  if (svg) {
    return (
      <Animated.View
        style={[
          {
            width: itemSize,
            height: itemSize,
            position: 'absolute',
            left: randomX,
          },
          animatedStyle,
        ]}
      >
        {svg}
      </Animated.View>
    );
  }

  if (img) {
    return (
      <Animated.Image
        source={img}
        style={[
          {
            width: itemSize,
            height: itemSize,
            resizeMode: 'contain',
            position: 'absolute',
            left: randomX,
          },
          animatedStyle,
        ]}
      />
    );
  }

  return null;
};

const ConfettiTumbleItem = ({
  start,
  stop,
  speed,
  itemSize,
  img,
  svg,
  direction,
  layout,
  fromCenter,
}: {
  start?: number;
  stop?: number;
  speed?: number;
  itemSize: number;
  img?: ImageSourcePropType;
  svg?: string;
  direction?: 'left' | 'right';
  layout: { width: number; height: number };
  fromCenter?: boolean;
}) => {
  const renderDelay = Math.floor(Math.random() * 5000);
  const [ready, setReady] = React.useState(false);
  const y = useSharedValue(start ?? layout.height);
  const x = useSharedValue(0);
  const opacity = useSharedValue(1);
  const randomBeziers = Easing.bezier(
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random()
  );
  const randomDuration = Math.floor(Math.random() * 1000) + 1000;
  const randomOpacityDuration = Math.floor(Math.random() * 2000) + 1000;
  const randomX = layout.width * Math.random();

  const xAxis = direction === 'left' ? -randomX : randomX;

  const randomDelay = Math.floor(Math.random() * 100);

  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, renderDelay);
  }, [renderDelay]);

  useEffect(() => {
    if (!ready) {
      return;
    }
    x.value = fromCenter ? xAxis : clamp(xAxis, 0, layout.width);
    y.value = stop ?? 0;
    opacity.value = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, fromCenter]);

  // @ts-ignore
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSequence(
            withDelay(
              randomDelay,
              withTiming(y.value, {
                duration:
                  (speed ?? randomDuration) * clamp(Math.random(), 0.4, 0.7),
                easing: randomBeziers,
              })
            ),
            // @ts-ignore
            withTiming(start, {
              duration:
                (speed ?? randomDuration) * clamp(Math.random(), 0.4, 0.7),
              easing: randomBeziers,
            })
          ),
        },
        {
          translateX: withDelay(
            randomDelay,
            withTiming(x.value, {
              duration: speed ?? randomDuration,
              easing: randomBeziers,
            })
          ),
        },
        {
          rotate: withTiming(`${Math.random() * 360}deg`, {
            duration: speed ?? randomDuration,
            easing: randomBeziers,
          }),
        },
      ],
      opacity: withSequence(
        withTiming(1, {
          duration:
            (speed ?? randomOpacityDuration) * clamp(Math.random(), 0.4, 0.7),
        }),
        withTiming(0, {
          duration:
            (speed ?? randomOpacityDuration) * clamp(Math.random(), 0.4, 0.7),
        })
      ),
    };
  });

  if (!ready) {
    return null;
  }

  if (svg) {
    return (
      <Animated.View
        style={[
          {
            width: itemSize,
            height: itemSize,
            position: 'absolute',
            ...(fromCenter
              ? {
                  left: layout.width / 2 - itemSize / 2,
                }
              : {
                  left: randomX,
                }),
          },
          animatedStyle,
        ]}
      >
        {svg}
      </Animated.View>
    );
  }

  if (img) {
    return (
      <Animated.View
        style={[
          {
            width: itemSize,
            height: itemSize,
            position: 'absolute',
            ...(fromCenter
              ? {
                  left: layout.width / 2 - itemSize / 2,
                }
              : {
                  left: randomX,
                }),
          },
          animatedStyle,
        ]}
      >
        <Image
          source={img}
          style={{ width: itemSize, height: itemSize, resizeMode: 'contain' }}
        />
      </Animated.View>
    );
  }

  return null;
};

export const ConfettiItemFall = React.memo(ConfettiFallItem);

export const ConfettiItemTumble = React.memo(ConfettiTumbleItem);
