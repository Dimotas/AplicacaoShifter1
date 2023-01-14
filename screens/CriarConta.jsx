import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import DropDownPicker from 'react-native-dropdown-picker';

const CriarConta = () => {
  const [email, escolheremail] = useState('');
  const [password, escolherpass] = useState('');
  const [nome, escolhernome] = useState('');
  const [Admin, escolheradmin] = useState(null);
  const [opcao, escolheropcao] = useState(false);
  const [opcoes, escolheropcoes] = useState([
    {label: 'Administrador', value: true},
    {label: 'Funcionário', value: false},
  ]);

  const Registo = () => {
    if (email && password && nome && Admin !== null) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firestore().collection('users').doc(auth().currentUser.uid).set({
            id: auth().currentUser.uid,
            nome: nome,
            email: email,
            admin: Admin,
          });
        })

        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Toast.show({
              text1: 'Email já se encontra registado',
              position: 'bottom',
            });
          }

          if (error.code === 'auth/invalid-email') {
            Toast.show({
              text1: 'Email não existente',
              position: 'bottom',
            });
          }

          if (error.code === 'auth/weak-password') {
            Toast.show({
              text1: 'Password com pouca segurança',
              position: 'bottom',
            });
          }
        });
    } else {
      Toast.show({
        text1: 'Falta de email ou passowrd',
        position: 'bottom',
      });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.fundo}>


      <Text style={styles.titulo}>Registo </Text>

      <View style={styles.caixatexto}>
        <TextInput
          value={nome}
          onChangeText={escolhernome}
          placeholder="Nome"
          style={styles.texto}></TextInput>
      </View>

      <View style={styles.caixatexto}>
        <TextInput
          value={email}
          onChangeText={escolheremail}
          placeholder="Email"
          style={styles.texto}
          keyboardType="email-address"
          autoCapitalize="none"></TextInput>
      </View>

      <View style={styles.caixatexto}>
        <TextInput
          value={password}
          onChangeText={escolherpass}
          placeholder="Password"
          secureTextEntry
          style={styles.texto}></TextInput>
      </View>

      <DropDownPicker
        open={opcao}
        value={Admin}
        items={opcoes}
        setOpen={escolheropcao}
        setValue={escolheradmin}
        setItems={escolheropcoes}
        placeholder="Qual a sua função?"
        style={styles.caixatexto}
        labelStyle={{
          fontSize: 20,
          color: '#393E46',
        }}
        placeholderStyle={{
          fontSize: 20,
          color: '#393E46',
        }}
        opcoesfundo={styles.opcoesfundo}
        opcaoescolhida={{
          color: '#393E46',
        }}
        opcaoselecionada={{
          color: '#393E46',
        }}
      />

      <TouchableOpacity onPress={Registo} style={styles.botaologin}>
        <Text style={styles.textologin}>Criar conta</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default CriarConta;

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00ADB5',
  },
  titulo: {
    color: '#222831',
    fontSize: 40,
    position: 'relative',
    top: -45,
  },

  caixatexto: {
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
    alignSelf: 'center',
    width: '70%',
    height: 65,
    borderColor: '#393E46',
    borderWidth: 3,
    marginTop: 15,
  },

  opcoesfundo: {
    justifyContent: 'center',
    backgroundColor: '#00ADB5',
    alignSelf: 'center',
    width: '80%',
    height: 90,
    borderColor: '#876445',
    borderWidth: 5,
    marginTop: 10,
  },

  texto: {
    fontSize: 20,
    
  },

  botaologin: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#393E46',
    width: '65%',
    height: 65,
    marginTop: 15,
    borderColor: '#EEEEEE',
    borderWidth: 5,
  },

  textologin: {
    color: 'white',
    fontSize: 30,
    
  },

});
