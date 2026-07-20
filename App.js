// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import TodoScreen from './src/screens/TodoScreen';
import DoneScreen from './src/screens/DoneScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const iconName = route.name === 'A Fazer' ? 'list-outline' : 'checkmark-done-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2e7d32',
          tabBarInactiveTintColor: '#999',
          headerTitleAlign: 'center',
        })}
      >
        <Tab.Screen name="A Fazer" component={TodoScreen} />
        <Tab.Screen name="Concluídas" component={DoneScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
