import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';
import { firebase } from '../config/config';

const Home = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleTimbre = () => {
    setIsEnabled(!isEnabled);
    firebase.database()
    .ref('/T02/')
    .set({
        State:!isEnabled
    })
  };

  return (
    <View style={styles.contentContainer}>
      <Text>Activar timbre</Text>
      <Switch
        value={isEnabled}
        onValueChange={toggleTimbre}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: 'black',
    borderColor: "#9eb4c1",
    borderWidth: 0.8,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default Home;
