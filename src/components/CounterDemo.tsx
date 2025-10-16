import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { increment, decrement, incrementByAmount } from '../store/slices/counterSlice';

const CounterDemo: React.FC = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const isDarkMode = useColorScheme() === 'dark';

  const buttonStyle = [
    styles.button,
    { backgroundColor: isDarkMode ? '#333' : '#007AFF' },
  ];

  const textStyle = [
    styles.buttonText,
    { color: isDarkMode ? '#fff' : '#fff' },
  ];

  const countTextStyle = [
    styles.countText,
    { color: isDarkMode ? '#fff' : '#000' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <Text style={styles.title}>Redux DevTools Demo</Text>
      <Text style={countTextStyle}>Count: {count}</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={buttonStyle}
          onPress={() => dispatch(decrement())}
        >
          <Text style={textStyle}>-</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={buttonStyle}
          onPress={() => dispatch(increment())}
        >
          <Text style={textStyle}>+</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={buttonStyle}
          onPress={() => dispatch(incrementByAmount(5))}
        >
          <Text style={textStyle}>+5</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.instructions}>
        Use Rozenite Redux DevTools to inspect state changes!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007AFF',
  },
  countText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 30,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
  },
});

export default CounterDemo;