import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import MainScreen from '../screens/MainScreen';
import { BottomTabParamList, MainParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

interface Props {
  color: string;
}

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Main"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Main"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }: Props) => <TabBarIcon name="ios-code" color={color} />
        }}
      />
      <BottomTab.Screen
        name="History"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }: Props) => <TabBarIcon name="ios-code" color={color} />
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }: Props) => <TabBarIcon name="ios-code" color={color} />
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon({ name, color }: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} name={name} color={color} />;
}

const MainStack = createStackNavigator<MainParamList>();

function TabTwoNavigator() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{ headerTitle: 'Authenticated' }}
      />
    </MainStack.Navigator>
  );
}
