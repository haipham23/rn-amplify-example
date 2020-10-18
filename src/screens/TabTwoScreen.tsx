import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';
import Auth from '@aws-amplify/auth';
import { useFocusEffect } from '@react-navigation/native';

import { View } from '../components/Themed';
import Loader from '../components/Loader';

import FormStates from '../constants/FormStates';

interface Props {
  navigation: any;
}

const TabTwoScreen = ({ navigation }: Props) => {
  const [formState, setFormState] = React.useState<string>(FormStates.empty);

  const onScreenFocus = React.useCallback(() => {
    const navigateIfAuth = async () => {
      setFormState(FormStates.loading);

      try {
        const user = await Auth.currentAuthenticatedUser();

        if (!user) {
          navigation.navigate('Auth');
          return;
        }

        setFormState(FormStates.active);
      } catch (e) {
        // logged out
        navigation.navigate('Auth');
      }
    };

    navigateIfAuth();

    return () => setFormState(FormStates.empty);
  }, []);

  const logout = async () => {
    try {
      await Auth.signOut();
    } catch (e) {
      // do nothing
    } finally {
      navigation.navigate('Auth');
    }
  };

  useFocusEffect(onScreenFocus);

  if (formState === FormStates.empty) {
    return null;
  }

  if (formState === FormStates.login) {
    return <Loader />;
  }

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

export default TabTwoScreen;
