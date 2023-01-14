import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useNavigation} from '@react-navigation/native';

const ListaTarefas = ({titulo, feito, funcao, data, id}) => {
  const nav = useNavigation();
  return (
    <TouchableOpacity
      style={styles.fundo}
      onPress={() => {
        nav.navigate('DetalhesTarefa', {titulo, feito, funcao, data, id});
      }}>
        
      <View
        style={{
          marginHorizontal: 15,
          alignItems: 'center',
          
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 13,
          }}>
          Cumprida
        </Text>
        <BouncyCheckbox
          isChecked={feito}
          disableBuiltInState
          fillColor="black"
          disableText
          style={{marginTop: 5,}}
        />
      </View>
      <Text style={styles.titulo}>Tarefa: {titulo}</Text>
    </TouchableOpacity>
  );
};

export default ListaTarefas;

const styles = StyleSheet.create({
  fundo: {
    width: '80%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    height: 75,
    backgroundColor: '#EEEEEE',
    borderColor: '#393E46',
    borderWidth: 3,
    margin: 10,
    alignItems: 'center',
    
  },

  titulo: {
    marginRight: 100,
    padding: 10,
    color: 'black',
    fontSize: 20,
    alignSelf: 'center',
  },
});
