import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BecasList from './components/BecasList';
import BecasInfo from './components/BecasInfo';
import CrearBecas from './components/CrearBecas';
import ActualizarBeca from './components/ActualizarBeca';
import BecasPopulares from './components/BecasPopulares';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BecasList" component={BecasList} options={{ title: "Lista de Becas" }} />
      <Stack.Screen name="CrearBecas" component={CrearBecas} options={{ title: "Crear Beca" }} />
      <Stack.Screen name="BecasInfo" component={BecasInfo} options={{ title: "Información de la Beca" }} />
      <Stack.Screen name="ActualizarBeca" component={ActualizarBeca} options={{ title: "Editar Beca" }} />
      <Stack.Screen name="BecasPopulares" component={BecasPopulares} options={{ title: "Becas populares" }} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 50,
  }
});
