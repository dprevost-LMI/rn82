import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

type TetrisShape = 'I' | 'O' | 'L' | 'T';

type TetrisBlockProps = {
  shape: TetrisShape;
  color: string;
  left: number;
  toY: number;
  delay: number;
  replayKey: number;
};

function TetrisBlock({shape, color, left, toY, delay, replayKey}: TetrisBlockProps) {
  const offset = useSharedValue(-400); // Start well above the container
  
  const style = useAnimatedStyle(() => ({
    position: 'absolute',
    left,
    bottom: toY, // Stack position from bottom
    transform: [{translateY: offset.value}],
  }));

  React.useEffect(() => {
    // Reset position for replay
    offset.value = -400;
    const timer = setTimeout(() => {
      offset.value = withTiming(0, { // Fall to final stacked position
        duration: 1200,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94), // Smooth landing without bounce
      });
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, toY, replayKey, offset]);

  // Render different shapes
  let squares = [];
  
  switch (shape) {
    case 'I':
      squares = [0, 1, 2, 3].map(i => (
        <View key={i} style={[styles.square, {backgroundColor: color}]} />
      ));
      return (
        <Animated.View style={[styles.tetrisGroup, style]}>
          <View style={styles.row}>{squares}</View>
        </Animated.View>
      );
    case 'O':
      squares = [0, 1, 2, 3].map(i => (
        <View key={i} style={[styles.square, {backgroundColor: color}]} />
      ));
      return (
        <Animated.View style={[styles.tetrisGroup, style]}>
          <View style={styles.row}>{squares.slice(0,2)}</View>
          <View style={styles.row}>{squares.slice(2,4)}</View>
        </Animated.View>
      );
    case 'L':
      return (
        <Animated.View style={[styles.tetrisGroup, style]}>
          <View style={styles.row}>
            <View style={[styles.square, {backgroundColor: color}]} />
            <View style={[styles.square, {backgroundColor: color}]} />
          </View>
          <View style={styles.row}>
            <View style={[styles.square, {backgroundColor: color}]} />
            <View style={[styles.square, styles.transparentSquare]} />
          </View>
        </Animated.View>
      );
    case 'T':
      return (
        <Animated.View style={[styles.tetrisGroup, style]}>
          <View style={styles.row}>
            <View style={[styles.square, {backgroundColor: color}]} />
            <View style={[styles.square, {backgroundColor: color}]} />
            <View style={[styles.square, {backgroundColor: color}]} />
          </View>
          <View style={styles.rowCentered}>
            <View style={[styles.square, {backgroundColor: color}]} />
          </View>
        </Animated.View>
      );
    default:
      return null;
  }
}

export default function TetrisAnimation() {
  const blockSize = 20; // Size of individual squares
  const colors = ['#39f', '#f93', '#3f9', '#f39', '#fc3'];
  const shapes: TetrisShape[] = ['I', 'O', 'L', 'T', 'O']; // 5 blocks
  
  // Calculate container width so all blocks fit on screen
  const containerPadding = 10;
  const blockWidth = blockSize * 3; // Reduced spacing
  const containerWidth = Math.min(350, containerPadding * 2 + shapes.length * (blockWidth + 2));
  
  // Calculate actual heights for each shape to stack tightly
  const getShapeHeight = (shape: TetrisShape) => {
    switch (shape) {
      case 'I': return blockSize + 2; // Single row
      case 'O': return blockSize * 2 + 4; // Two rows
      case 'L': return blockSize * 2 + 4; // Two rows
      case 'T': return blockSize * 2 + 4; // Two rows
      default: return blockSize + 2;
    }
  };
  
  // Calculate cumulative heights for tight stacking
  const stackPositions = shapes.reduce((acc, shape, i) => {
    if (i === 0) {
      acc.push(0);
    } else {
      const prevHeight = getShapeHeight(shapes[i - 1]);
      acc.push(acc[i - 1] + prevHeight);
    }
    return acc;
  }, [] as number[]);

  // Animation replay logic
  const [replayKey, setReplayKey] = React.useState(0);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setReplayKey(k => k + 1);
    }, shapes.length * 600 + 1200);
    return () => clearTimeout(timer);
  }, [replayKey, shapes.length]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tetris Animation Demo</Text>
      <View
        style={[
          styles.tetrisContainer,
          {
            height: Math.max(300, stackPositions[stackPositions.length - 1] + getShapeHeight(shapes[shapes.length - 1]) + 100),
            width: containerWidth,
          }
        ]}>
        {shapes.map((shape, i) => (
          <TetrisBlock
            key={replayKey + '-' + i}
            shape={shape}
            color={colors[i % colors.length]}
            left={containerWidth / 2 - blockSize * 2} // Center all blocks in the same column
            toY={stackPositions[i]} // Use calculated stack position for tight stacking
            delay={i * 600}
            replayKey={replayKey}
          />
        ))}
      </View>
      <Text style={styles.description}>
        Different Tetris blocks fall and stack. Animation replays in a loop.
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
  tetrisContainer: {
    position: 'relative',
    alignSelf: 'center',
    backgroundColor: '#eee',
    borderRadius: 12,
    overflow: 'hidden',
  },
  tetrisGroup: {
    position: 'absolute',
  },
  square: {
    width: 20,
    height: 20,
    margin: 1,
  },
  row: {
    flexDirection: 'row',
  },
  rowCentered: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  transparentSquare: {
    backgroundColor: 'transparent',
  },
});