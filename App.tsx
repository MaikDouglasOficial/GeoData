import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CountryDetailsScreen from './screens/CountryDetailsScreen';

export type RootStackParamList = {
  Home: undefined;
  CountryDetails: { country: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "GEODATA" }} />
        <Stack.Screen name="CountryDetails" component={CountryDetailsScreen} options={{ title: "Detalhes do País" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};