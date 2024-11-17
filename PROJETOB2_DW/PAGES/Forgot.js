import React, { useState } from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import {TextInput} from 'react-native-paper';
import { supabase } from '../supabase';

export default function Forgot({ navigation }){
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleResetPassword = async () => {
    setMessage('');
    setMessageType('');

    if (!email) {
      setMessage('Por favor, insira um email válido.');
      setMessageType('error');
      return;
    }

    try {
      let { error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) {
        setMessage('Não foi possível enviar o email de redefinição. Verifique o endereço e tente novamente.');
        setMessageType('error');
      } else {
        setMessage('Um link de redefinição de senha foi enviado para o seu email.');
        setMessageType('success');
      }
    } catch (error) {
      setMessage('Erro ao conectar ao servidor. Tente novamente mais tarde.');
      setMessageType('error');
      console.error(error);
    }
  };
  
  return(
    <View style={styles.container}>        
      <Text style={styles.p1}>
        REDEFINIÇÃO DE SENHA!
      </Text>
      <Text style={styles.p2}>
        Informe o e-mail para qual deseja redefinir a sua senha. Um link de recuperação será mandado para este email.
      </Text>

      {message ? (
        <Text style={[styles.message, messageType === 'error' ? styles.error : styles.success]}>
          {message}
        </Text>
      ) : null}
                
      <TextInput
      label="Email"
      style={styles.input}
      theme={{ colors: { primary: '#ffaf1b' } }} // Muda a cor de foco
      value={email}
      onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Enviar</Text>
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
   message: {
    marginBottom: 20,
    fontSize: 12,
    textAlign: 'center',
  },
  error: {
    color: '#ff5600',
  },
  success: {
    color: '#00FF35',
  },
  
});
