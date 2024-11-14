import * as React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import {TextInput} from 'react-native-paper';

export default function Forgot({ navigation }){
  return(
    <View style={styles.container}>        
        <Text style={styles.p1}>
          REDEFINIÇÃO DE SENHA!
        </Text>

        <Text style={styles.p2}>
          Informe o e-mail para qual deseja redefinir a sua senha
        </Text>
                
        <TextInput
        label="Email"
        style={styles.input}
        theme={{ colors: { primary: '#ffaf1b' } }} // Muda a cor de foco
      />

        <TouchableOpacity style={styles.button} onPress={() => console.log('Pressed')}>
          <Text style={styles.buttonText}>Enviar link de recuperação</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.cancelar}>
            Cancelar
          </Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#006673',
  },

  p1: {
    color: '#9cae28',
    fontSize: 25,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },

  p2: {
    color: 'white',
    fontSize: 12,
    padding: 20,
    textAlign: 'center',
    width: '100%',
  },

  input: {
    backgroundColor: 'white',
    marginBottom: 10,
    width: '70%',
    height: 55,
  }, 
  
  button: {
    backgroundColor: '#ffaf1b',
    marginTop: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  buttonText: {
    color: '#006673',
    fontSize: 13,
    fontWeight: 'bold',
  },

  cancelar: {
      textAlign: 'center',
      color: '#ffaf1b',
      marginTop: 15,
      textDecorationLine: 'underline',
    },
  
});
