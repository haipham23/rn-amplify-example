import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';
import Auth from '@aws-amplify/auth';
import { useFocusEffect } from '@react-navigation/native';

import { View } from '../components/Themed';
import Loader from '../components/Loader';

interface Props {
  navigation: any;
}

const TabTwoScreen = ({ navigation }: Props) => {
  const [formState, setFormState] = React.useState<string>('empty');

  const onScreenFocus = React.useCallback(() => {
    const navigateIfAuth = async () => {
      setFormState('loading');

      try {
        const user = await Auth.currentAuthenticatedUser();

        if (!user) {
          navigation.navigate('TabOne');
          return;
        }

        setFormState('active');
      } catch (e) {
        // logged out
        navigation.navigate('TabOne');
      }
    };

    navigateIfAuth();

    return () => setFormState('empty');
  }, []);

  const logout = async () => {
    try {
      await Auth.signOut();
    } catch (e) {
      // do nothing
    } finally {
      navigation.navigate('TabOne');
    }
  };

  useFocusEffect(onScreenFocus);

  if (formState === 'empty') {
    return null;
  }

  if (formState === 'loading') {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
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
