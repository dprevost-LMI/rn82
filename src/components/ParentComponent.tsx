import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';

const ParentComponent: React.FC = () => {
  const handleParentPress = () => {
    console.log('Parent Pressable pressed!');
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.parentContainer}
        onPress={handleParentPress}
      >
        <Text style={styles.parentText}>Parent Component</Text>
        <View pointerEvents="box-only">
            <Pressable
              style={childStyles.childContainer}
              onPress={()=> console.log('Child Pressable pressed!')}
            >
              <Text style={childStyles.childText}>{"Child"}</Text>
            </Pressable>
        </View>
      </Pressable>
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
  parentContainer: {
    backgroundColor: '#fff3e0',
    padding: 30,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FF9800',
    minWidth: 300,
  },
  parentText: {
    fontSize: 18,
    color: '#F57C00',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

const childStyles = StyleSheet.create({
  childContainer: {
    backgroundColor: '#e8f4fd',
    padding: 20,
    margin: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  childText: {
    fontSize: 16,
    color: '#1976D2',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default ParentComponent;