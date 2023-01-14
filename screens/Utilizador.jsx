import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TaskCard from '../components/ListaTarefas';
import firestore from '@react-native-firebase/firestore';

const Utilizador = ({route, navigation}) => {
  const {nome, id, email} = route.params;

  const [tarefas, escolhertarefas] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(id)
      .collection('tarefas')
      .onSnapshot(querySnapshot => {
        const tarefas = [];
        querySnapshot.forEach(documentSnapshot => {
          tarefas.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        escolhertarefas(tarefas);
      });

    return () => subscriber();
  }, []);

  return (
    <SafeAreaView style={styles.fundo}>
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <Text style={styles.titulo}>Utilizador {nome}</Text>

      </View>

      <Text style={styles.subtitulo}>Info: {nome}</Text>
      <View style={{marginLeft: 35,marginTop:5}}>
        <Text style={styles.texto}>Nome : {nome}</Text>
        <Text style={styles.texto}>Email : {email}</Text>
      </View>
      <Text style={styles.subtitulo2}>Lista Tarefas</Text>

      <FlatList
        data={tarefas}
        renderItem={({item}) => (
          <TaskCard
            titulo={item.key}
            feito={item.estaFeito}
            data={item.tempo.toDate().toLocaleString('pt-PT')}
            funcao={item.funcaoAtribuida}
            id={id}
          />
        )}
      />

      <TouchableOpacity
        style={styles.botaoadicionar}
        onPress={() => {
          navigation.navigate('AddTarefa', {nome, email, id});
        }}>
        <Text
          style={{
            color: 'black',

            padding: 10,
          }}>
          Adicionar Tarefa
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Utilizador;

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: '#00ADB5',
    justifyContent: 'space-between',

  },
  titulo: {
    color: 'black',
    fontSize: 35,
    margin: 15,
  },

  subtitulo: {
    color: 'black',
    fontSize: 25,
    marginLeft: 15,
  },

  subtitulo2: {
    color: 'black',
    fontSize: 25,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 15,
  },

  texto: {
    color: 'black',
    fontSize: 19,
  },

  botaoadicionar: {
    flexDirection: 'row',
    backgroundColor: '#EEEEEE',
    borderColor: '#393E46',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    margin: 20,
    alignSelf: 'center',
  },
});

