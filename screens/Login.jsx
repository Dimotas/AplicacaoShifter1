import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const Login = () => {
  const [email, escolheremail] = useState('');
  const [password, escolherpass] = useState('');

  const dadosLogin = () => {
    if (email && password) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {})
        .catch(error => {
          if (error.code === 'auth/invalid-email') {
            Toast.show({
              text1: 'Email Inválido',
              position: 'bottom',
            });
          }

          if (error.code === 'auth/wrong-password') {
            Toast.show({
              text1: 'Password Errada',
              position: 'bottom',
            });
          }

          if (error.code === 'auth/user-not-found') {
            Toast.show({
              text1: 'Utilizador não reconhecido,',
              text2:'certifique-se que inseriu bem o utilizador!',
              position: 'bottom',
            });
          }
        });
    } else {
      Toast.show({
        text1: 'Falta de email e/ou password!',
        position: 'bottom',
      });
    }
  };

  const nav = useNavigation();

  return (
    <KeyboardAvoidingView style={styles.fundo}>
      
      <View style={styles.caixadetexto}>
        <TextInput
          value={email}
          onChangeText={escolheremail}
          placeholder="Email"
          style={styles.texto}
          keyboardType="email-address"
          autoCapitalize="none"></TextInput>
      </View>

      <View style={styles.caixadetexto}>
        <TextInput
          value={password}
          onChangeText={escolherpass}
          placeholder="Password"
          secureTextEntry
          style={styles.texto}></TextInput>
      </View>

      <TouchableOpacity onPress={dadosLogin} style={styles.botaologin}>
        <Text style={styles.textologin}>ENTRAR</Text>
      </TouchableOpacity>


        
        <Text
          onPress={() => nav.navigate('Register')}
          style={{color: '#393E46',fontSize: 25, marginTop: 20,}}>
          
          Crie aqui a sua conta
        </Text>

    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00ADB5',
  },

  caixadetexto: {
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
    width: '70%',
    height: 65,
    borderColor: '#393E46',
    borderWidth: 3,
    marginTop: 15,
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
    marginTop: 30,
    borderColor: '#EEEEEE',
    borderWidth: 3,
  },

  textologin: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
  },
});
