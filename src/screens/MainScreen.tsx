import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';
import Auth from '@aws-amplify/auth';

import { View } from '../components/Themed';

interface Props {
  navigation: any;
}

const MainScreen = ({ navigation }: Props) => {
  const logout = async () => {
    try {
      await Auth.signOut();
    } catch (e) {
      // do nothing
    } finally {
      navigation.navigate('Auth');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Authenticated screen</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button full onPress={logout}>
        <Text>Logout</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  }
});

export default MainScreen;
