import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PantallaJuego from './views/PantallaJuego';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PantallaJuego"
          component={PantallaJuego}
          options={{ title: 'Juego de Memoria' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
