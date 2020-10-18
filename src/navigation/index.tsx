import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import AuthScreen from '../screens/AuthScreen';

interface Props {
  colorScheme: ColorSchemeName;
  user: undefined | null;
}

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = ({ colorScheme, user }: Props) => (
  <NavigationContainer
    linking={LinkingConfiguration}
    theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
  >
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={user ? 'Root' : 'Auth'}
    >
      {
        user && (
          <Stack.Screen name="Root" component={BottomTabNavigator} />
        )
      }
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default RootNavigator;
