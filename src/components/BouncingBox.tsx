import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

export default function BouncingBox() {
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  React.useEffect(() => {
    // Bouncing animation
    translateY.value = withRepeat(
      withTiming(-50, {
        duration: 800,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
      }),
      -1, // Infinite repeat
      true // Reverse on each iteration
    );

    // Pulsing scale animation
    scale.value = withRepeat(
      withTiming(1.2, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, [translateY, scale]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bouncing Animation Demo</Text>
      <View style={styles.animationArea}>
        <Animated.View style={[styles.box, animatedStyle]} />
      </View>
      <Text style={styles.description}>
        A simple box that bounces and pulses using Reanimated.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 20,
  },
  animationArea: {
    height: 150,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  box: {
    width: 80,
    height: 80,
    backgroundColor: 'tomato',
    borderRadius: 16,
  },
});