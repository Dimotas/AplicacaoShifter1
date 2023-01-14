import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {addUsersList, clearUsers} from '../reducers/usersListSlice';
import {useNavigation} from '@react-navigation/native';
import TaskCard from '../components/ListaTarefas';

const Filtro = () => {
  const escolhauser = useSelector(state => state.utilizador);

  if (escolhauser.role === null) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#00ADB5',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.titulo}>Lista indisponivel...</Text>
      </View>
    );
  }

  if (escolhauser.role === true) {
    return <FiltroAdmin></FiltroAdmin>;
  } else if (escolhauser.role === false) {
    return <FiltroUtilizador></FiltroUtilizador>;
  }
};

const FiltroUtilizador = () => {
  const escolhauser = useSelector(state => state.utilizador);

  const [tarefas, escolhertarefas] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(escolhauser.id)
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
      <View>
        <Text style={styles.titulo}>Bem vindo {escolhauser.name}!</Text>
        <Text style={styles.subtitulo}>Lista de Tarefas:</Text>
      </View>

    
      <FlatList
        data={tarefas}
        renderItem={({item}) => (
          <TaskCard
            titulo={item.key}
            feito={item.estaFeito}
            data={item.tempo.toDate().toLocaleString('pt-PT')}
            funcao={item.funcaoAtribuida}
            id={escolhauser.id}
          />
        )}
      />
    </SafeAreaView>
  );
};

const FiltroAdmin = () => {
  const dispatch = useDispatch();

  const escolhauser = useSelector(state => state.utilizador);
  const utilizador = useSelector(state => state.todosUtilizadores.users);
  const navigation = useNavigation();

  useEffect(() => {
    firestore()
      .collection('users')
      .where('admin', '==', escolhauser.role === false)
      .onSnapshot(users => {
        if (!users.empty) {
          dispatch(clearUsers());
          users.forEach(utilizador => {
            dispatch(addUsersList(utilizador.data()));
          });
        }
      });
  }, [escolhauser]);

  return (
    <SafeAreaView style={styles.fundo}>
      <View>
        <Text style={styles.titulo}>Bem Vindo {escolhauser.name}</Text>
        <Text style={styles.subtitulo}>Funcionários:</Text>
      </View>

      <View style={{marginLeft: 20, marginRight: 20}}>
        <FlatList
          data={utilizador}
          renderItem={({item}) => (
            <View style={styles.boxnomes}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('UserProfile', {
                    id: item.id,
                    nome: item.nome,
                    email: item.email,
                  });
                }}>
                <Text style={styles.nomes}>{item.nome}</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};
export default Filtro;

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: '#00ADB5',
  },

  titulo: {
    color: 'black',
    fontSize: 30,
    margin: 20,
    alignSelf: 'center',
  },
  subtitulo: {
    color: 'black',
    fontSize: 25,
    marginLeft: 20,
    marginBottom: 20,
  },

  loading: {
    color: 'black',
    fontSize: 30,
  },

  nomes: {
    color: 'black',
    fontSize: 30,
    padding: 3,
    alignSelf: 'center',
  },

  boxnomes: {
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
    alignSelf: 'center',
    width: '75%',
    height: 65,
    borderColor: '#393E46',
    borderWidth: 3,
    marginTop: 15,
  },
});
