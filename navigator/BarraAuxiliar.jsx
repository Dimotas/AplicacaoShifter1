import {StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Filtro from '../screens/Filtro';
import Conta from '../screens/Conta';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const BarraAuxiliar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.estilo,
      }}>
      <Tab.Screen
        name="Filtro"
        component={Filtro}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                name="format-list-bulleted"
                size={30}
                color={focused ? '#222831' : '#393E46'}></Icon>
            );
          },
        }}></Tab.Screen>

      <Tab.Screen
        name="Conta"
        component={Conta}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                name="account"
                size={30}
                color={focused ? '#222831' : '#393E46'}></Icon>
            );
          },
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  estilo: {
    position: 'absolute',
    bottom: 35,
    height: 60,
    marginHorizontal: 40,
    backgroundColor: '#EEEEEE',
  },
});

export default BarraAuxiliar;
