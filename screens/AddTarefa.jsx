import {
  Platform,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';

const AddTarefa = ({route, navigation}) => {
  
  const [funcao, escolherfuncao] = useState('');
  const [titulo, escolhertitulo] = useState('');
  const [date, escolherdate] = useState(new Date());
  const [mode, escolhermode] = useState('date');
  const [ver, escolherver] = useState(false);
  const [texto_tempo, setTexto_tempo] = useState('Horas');
  const [txt_data, settxt_data] = useState('Data');
  const {nome, id} = route.params;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    escolherver(Platform.OS === 'ios');
    escolherdate(currentDate);
    let tempdate = new Date(currentDate);
    let fDate =
      tempdate.getDate() +
      '/' +
      (tempdate.getMonth() + 1) +
      '/' +
      tempdate.getFullYear();
    let fTime =
      tempdate.getHours() +
      'h:' +
      (tempdate.getMinutes() < 10 ? '0' : '') +
      tempdate.getMinutes() +
      'm';

    setTexto_tempo(fTime);
    settxt_data(fDate);
  };

  const ShowMode = currentMode => {
    escolherver(true);
    escolhermode(currentMode);
  };

  const AdicionarTarefa = () => {
    if (titulo && funcao && date) {
      firestore()
        .collection('users')
        .doc(id)
        .collection('tarefas')
        .doc(titulo)
        .set({
          funcaoAtribuida: funcao,
          tempo: date,
          estaFeito: false,
        });

      navigation.navigate('Filtro');
      Toast.show({
        text1: 'Nova tarefa criada',
        position: 'bottom',
      });
    } else {
      Toast.show({
        text1: 'Preencher todos os campos',
        position: 'bottom',
      });
    }
  };

  return (
    <SafeAreaView style={styles.fundo}>
      <View style={{flexDirection: 'row'}}>
        <Text style={[styles.titulo, {marginTop: 20,}]}>Tarefas para {nome}</Text>
      </View>

      <Text style={[styles.subtitulo, {marginTop: 5}]}>Funções realizadas até:</Text>

<View style={{marginLeft: 20,marginTop: 15, flexDirection: 'row'}}>
<Icon
    name="clipboard-text-clock-outline"
    size={35}
    color={'black'}
    style={{alignSelf: 'center'}}
    onPress={() => ShowMode('date')}></Icon>

  <View style={styles.data}>
    <Text style={styles.textodata}>{txt_data}</Text>
  </View>
  <Icon
    name="clock-time-nine-outline"
    size={35}
    color={'black'}
    style={{alignSelf: 'center'}}
    onPress={() => ShowMode('time')}></Icon>

  <View style={styles.data}>
    <Text style={styles.textodata}>{texto_tempo}</Text>
  </View>
</View>



      
<Text style={[styles.subtitulo, {marginTop: 5}]}>Titulo da tarefa:</Text>
      <View style={[styles.caixatextofuncoes, {height: 60}]}>
        <TextInput
          value={titulo}
          onChangeText={escolhertitulo}
          placeholder="Titulo"
          style={styles.caixafuncoes}
          maxLength={20}></TextInput>
      </View>
      
<Text style={[styles.subtitulo, {marginTop: 5}]}>Funções a realizar:</Text>
      <View style={styles.caixatextofuncoes}>
        <TextInput
          value={funcao}
          onChangeText={escolherfuncao}
          placeholder="Funções"
          style={styles.caixafuncoes}
          multiline
          maxLength={100}></TextInput>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#EEEEEE',
          borderColor: '#393E46',
          borderWidth: 3,
          width: '50%',
          height: 50,
          alignSelf: 'center',
          top: 5,
          justifyContent: 'center',
        }}
        onPress={AdicionarTarefa}>
  <Text style={[styles.gravar, {marginTop: 5}]}>Gravar</Text>
          
        
      </TouchableOpacity>

    {ver && (
  <DateTimePicker
    value={date}
    mode={mode}
    is24Hour={true}
    display="default"
    onChange={onChange}
    minimumDate={new Date()}></DateTimePicker>
)}
    </SafeAreaView>
  );
};

export default AddTarefa;

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: '#00ADB5',
  },
  titulo: {
    color: 'black',
    marginLeft: 50,
    fontSize: 30,
    margin: 20,
  },

  subtitulo: {
    color: 'black',
    fontSize: 25,
    marginLeft: 20,
  },

  caixatextofuncoes: {
    backgroundColor: '#EEEEEE',
    width: '80%',
    height: 120,
    alignSelf: 'center',
    marginTop: 20,
    borderColor: '#393E46',
    borderWidth: 3,
  },

  caixafuncoes: {
    color: 'black',
    padding: 10,
    fontSize: 20,
    
  },
  data: {
    height: '90%',
    width: '35%',
    alignSelf: 'center',
    borderColor: '#393E46',
    borderWidth: 3,
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
  },

  textodata: {
    color: 'black',
    fontSize: 25,
    top: -3,
    
  },

  gravar: {
    color: 'black',
    fontSize: 25,
    alignSelf: 'center',
    top: -3,
  }
});
