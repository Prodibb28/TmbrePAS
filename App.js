import { StyleSheet, Text, View } from 'react-native';
import { firebase } from './src/config/config'
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';


import Login from './src/screens/Login';
import SingUp from './src/screens/SingUp';
import Registro from './src/screens/Registro';
import Home from './src/screens/Home'
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

 function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
   }

   useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if(initializing) return null;

  if(!user){
  return(
    <Stack.Navigator
    screenOptions={{headerShown: false}}>
      <Stack.Screen 
       name="Login" 
       component={Login}
      /> 
      <Stack.Screen 
       name="SingUp" 
       component={SingUp}
      /> 
    </Stack.Navigator>
  )};
  return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        activeTintColor: '#1976D2', // Color del ícono y el texto cuando está seleccionado
        inactiveTintColor: 'gray',// Color del ícono y el texto cuando no está seleccionado
        tabBarStyle: { position: 'absolute',  height: 55},
        tabBarLabelStyle : { fontSize: 12, marginBottom:5 },  // Tamaño de la letra
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Registro') {
            iconName = focused ? 'podium' : 'podium-outline';
          }

          // Puedes cambiar el tamaño de los iconos ajustando el valor de 'size'
          return <Icon style={{marginTop:5,}} name={iconName} size={size} color={color} />;
        },
      })}

      >
        <Tab.Screen name="Dashboard" component={Home} 
          options={{
            headerTitleAlign:'center',
            
          }}
        />
        <Tab.Screen name="Registro" component={Registro} 
          options={{
            headerTitleAlign:'center'
          }}
        />

      </Tab.Navigator>
  );
}
export default() => {
  return (
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
