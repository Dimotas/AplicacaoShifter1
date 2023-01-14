import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {clearUser} from '../reducers/userSlice';

const Conta = () => {
  const direcao = useNavigation();
  const dispatch = useDispatch();
  const SignOut = () => {
    auth()
      .signOut()
      .then(() => dispatch(clearUser()));
  };
  return (
    <SafeAreaView style={styles.fundo}>
      <Text style={styles.titulo}>Conta</Text>
      <View>
      <TouchableOpacity
          style={[styles.botao]}
          onPress={() => direcao.navigate('Informacao')}>
          <Text style={styles.textobotao}>Informação</Text>
          <Icon name="information-variant" style={styles.icon}></Icon>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={SignOut}>
          <Text style={styles.textobotao}>Sair</Text>
          <Icon name="exit-to-app" style={styles.icon}></Icon>
        </TouchableOpacity>


      </View>
    </SafeAreaView>
  );
};

export default Conta;

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: '#00ADB5',
  },

  titulo: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 45,
    marginTop: 30,
    marginBottom: 40,
  },

  botao: {
    width: '70%',
    height: 65,
    backgroundColor: '#EEEEEE',
    borderColor: '#393E46',
    borderWidth: 3,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 50,
  },

  textobotao: {
    color: 'black',
    fontSize: 30,
    position: 'absolute',
    left: 15,
  },
  icon: {
    color: 'black',
    fontSize: 40,
    position: 'absolute',
    right: 10,
  },
});
