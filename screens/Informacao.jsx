import {StyleSheet, Text, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';


const Informacao = () => {

  return (
    <SafeAreaView style={styles.fundo}>
  
    <ScrollView>
      <Text style={styles.texto}>
         Projeto desenvolvido com objetivo de simular uma aplicação "shifter",
        do qual permite admins e utilizadores efetuarem log in, e desta forma,
        cada um deles pode verificar as suas tarefas ou atribu-las caso seja 
        administrador, o projeto é para a disciplina de DDMIII,

        Desenvolvimento de dispositivos móveis III.
      </Text>
      <Text style={styles.texto}>Trabalho elaborado por Tiago Moitas.</Text>
    </ScrollView>
    </SafeAreaView>
  );
};

export default Informacao;

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00ADB5',
  },

  texto: {
    color: 'black',
    fontSize: 35,
    padding: 18,
  },

});
