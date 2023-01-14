import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import firestore from '@react-native-firebase/firestore';

const DetalhesTarefa = ({route}) => {
  const {titulo, feito, funcao, data, id} = route.params;
  const [changesMade, gravaralteracoes] = useState(false);

  const [cumprido, escolhercumprido] = useState(feito);

  const alterarsave = () => {
    gravaralteracoes(true);
    escolhercumprido(!cumprido);
  };

  const gravar = () => {
    firestore()
      .collection('users')
      .doc(id)
      .collection('tarefas')
      .doc(titulo)
      .update({
        estaFeito: cumprido,
      });
      gravaralteracoes(false);
  };
  return (
    <SafeAreaView style={styles.fundo}>
      <View style={{flexDirection: 'row',alignSelf:'center'}}>
        <Text style={styles.titulo}>Tarefa Atual</Text>

      </View>

      
        <Text style={styles.subtitulo}>Titulo da Tarefa:</Text>
        
        <View style={styles.box}>
          <Text style={styles.texto}>{titulo}</Text>
        </View>

        <Text style={styles.subtitulo}>Funções a Realizar:</Text>

        <View style={styles.box2}>
          <Text style={styles.texto}>{funcao}</Text>
        </View>


        <Text style={styles.subtitulo}>Limite das Funções:</Text>

        <View style={styles.box}>
          <Text style={styles.texto}>{data}</Text>
        </View>

         
        
      <View style={{flexDirection: 'row'}}>

        <Text
          style={{
            color: 'black',
            fontSize: 25,
            marginTop: 20,
            marginLeft: 15,
            
          }}>
          Cumprida:
        </Text>
        <Text
          style={{
            color: 'black',
            marginTop: 30,
            marginLeft: 25,
            
          }}>
        
        </Text>
        <BouncyCheckbox
          isChecked={cumprido}
          onPress={alterarsave}
          fillColor="black"
          disableText
          size={50}
          style={{marginTop: 15}}
          iconImageStyle={{height: '20%', width: '20%'}}
        />
        <Text
          style={{
            color: 'black',
            marginTop: 15,
            marginLeft: 35,
            
          }}>
        
        </Text>

      {changesMade && (
        <TouchableOpacity style={styles.botaocumprido}>
          <Icon
            name="content-save"
            size={40}
            color={'black'}
            onPress={gravar}></Icon>
        </TouchableOpacity>
      )}
      </View>

      
    </SafeAreaView>
  );
};

export default DetalhesTarefa;

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: '#00ADB5',
  },

  titulo: {
    color: 'black',
    fontSize: 30,
    margin: 15,
  },
  texto: {
    color: 'black',
    fontSize: 19,
    alignSelf: 'center',
  },

  subtitulo: {
    color: 'black',
    fontSize: 22,
    marginLeft: 15,  
    marginTop: 15,
  },

  box: {
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
    alignSelf: 'center',
    width: '70%',
    height: 45,
    borderColor: '#393E46',
    borderWidth: 3,
    marginTop: 15,    
  },

  box2: {
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
    alignSelf: 'center',
    width: '70%',
    height: 100,
    borderColor: '#393E46',
    borderWidth: 3,
    marginTop: 15,    
  },

  botaocumprido: {
    height: 50,
    width: 50,
    backgroundColor: '#EEEEEE',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#393E46',
    borderWidth: 3,
    alignSelf: 'center',
    marginTop: 15,
    marginRight: 35,
  },
});
