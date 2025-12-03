import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { fbt } from 'fbtee';

const FbteeExample: React.FC = () => {
  const [contactMatchedCount, setContactMatchedCount] = useState(0);

  const MATCHED_CONTACTS = (count: number) =>
    fbt(
      fbt.plural('', count, {
        many: 'Matches ',
      }) +
        fbt.plural('', count, {
          name: 'number of matched contacts',
          many: 'contacts:',
          showCount: 'ifMany',
        }),
      'Call.numberOfMatchedContacts',
    ).toString();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fbtee Plural Test</Text>
      
      <View style={styles.buttonContainer}>
        <Button title="0 Contacts" onPress={() => setContactMatchedCount(0)} />
        <Button title="1 Contact" onPress={() => setContactMatchedCount(1)} />
        <Button title="5 Contacts" onPress={() => setContactMatchedCount(5)} />
        <Button title="10 Contacts" onPress={() => setContactMatchedCount(10)} />
      </View>

      <View style={styles.resultContainer}>
        <Text style={styles.label}>Count: {contactMatchedCount}</Text>
        <Text style={styles.result}>
          {MATCHED_CONTACTS(contactMatchedCount)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  resultContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  result: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});

export default FbteeExample;
