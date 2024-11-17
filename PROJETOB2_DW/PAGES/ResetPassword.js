import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { supabase } from '../supabase';

export default function ResetPassword({ navigation }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleUpdatePassword = async () => {
    setMessage('');
    setMessageType('');

    if (!password || !confirmPassword) {
      setMessage('Por favor, preencha todos os campos.');
      setMessageType('error');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem.');
      setMessageType('error');
      return;
    }

    try {
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        setMessage('Não foi possível redefinir a senha. Tente novamente.');
        setMessageType('error');
        console.error(error);
      } else {
        setMessage('Senha redefinida com sucesso!');
        setMessageType('success');
        setTimeout(() => {
          navigation.navigate('Login');
        }, 2000);
      }
    } catch (error) {
      setMessage('Erro ao conectar ao servidor. Tente novamente mais tarde.');
      setMessageType('error');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.p1}>REDEFINIR SENHA</Text>

      {message ? (
        <Text style={[styles.message, messageType === 'error' ? styles.error : styles.success]}>
          {message}
        </Text>
      ) : null}

      <TextInput
        label="Nova Senha"
        style={styles.textInput}
        theme={{ colors: { primary: '#ffaf1b' } }}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        label="Confirmar Nova Senha"
        style={styles.textInput}
        theme={{ colors: { primary: '#ffaf1b' } }}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <View style={styles.container3}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.cancelar}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleUpdatePassword}>
          <Text style={styles.buttonText}>Redefinir Senha</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 30,
    fontWeight: 'bold',
    color: '#9cae28',
    marginBottom: 25,
    textAlign: 'center',
  },
  textInput: {
    backgroundColor: 'white',
    marginBottom: 10,
    width: '70%',
    height: 55,
  },
  container3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginTop: 20,
  },
  cancelar: {
    color: '#ffaf1b',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#ffaf1b',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#006673',
    fontWeight: 'bold',
  },
  message: {
    marginBottom: 15,
    fontSize: 16,
    textAlign: 'center',
  },
  error: {
    color: '#FF0000',
  },
  success: {
    color: '#00FF35',
  },
});
