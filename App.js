import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './screens/Login';
import CriarConta from './screens/CriarConta';
import Toast from 'react-native-toast-message';
import BarraAuxiliar from './navigator/BarraAuxiliar';
import Informacao from './screens/Informacao';
import AddTarefa from './screens/AddTarefa';
import firestore from '@react-native-firebase/firestore';

import DetalhesTarefa from './screens/DetalhesTarefa';

import store from './store';

import {Provider, useDispatch} from 'react-redux';
import {addUser} from './reducers/userSlice';
import Utilizador from './screens/Utilizador';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App = () => {
  const Stack = createNativeStackNavigator();

  const [logado, setlogado] = useState();
  const dispatch = useDispatch();

  const saveUser = user => {
    const {id, admin, email, nome} = user;
    dispatch(addUser({id, email, name: nome, role: admin}));
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        firestore()
          .collection('users')
          .doc(auth().currentUser.uid)
          .get()
          .then(user => {
            saveUser(user.data());
          });

        setlogado(true);
      } else {
        setlogado(false);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {logado ? (
          <>
            <Stack.Screen
              name="BarraAuxiliar"
              component={BarraAuxiliar}
              options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen
              name="Informacao"
              component={Informacao}
              options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen
              name="AddTarefa"
              component={AddTarefa}
              options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen
              name="UserProfile"
              component={Utilizador}
              options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen
              name="DetalhesTarefa"
              component={DetalhesTarefa}
              options={{headerShown: false}}></Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={CriarConta}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
      <Toast></Toast>
    </NavigationContainer>
  );
};

export default AppWrapper;
