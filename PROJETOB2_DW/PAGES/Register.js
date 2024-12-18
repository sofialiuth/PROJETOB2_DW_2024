import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { supabase } from '../supabase';

export default function Register({ navigation }) {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState(''); // Estado para mensagens de erro ou sucesso
  const [messageType, setMessageType] = useState(''); // Estado para definir o tipo de mensagem ('success' ou 'error')
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  const handleRegister = async () => {
    setMessage('');
    setMessageType('');

    // Verifica se todos os campos estão preenchidos
    if (!nomeCompleto || !email || !senha) {
      setMessage('Por favor, preencha todos os campos.');
      setMessageType('error');
      return;
    }
    if (!isValidEmail(email)) {
      setMessage('Por favor, insira um e-mail válido.');
      setMessageType('error');
      return;
    }

    try {
      let { data, error } = await supabase.auth.signUp({
        email: email,
        password: senha,
      })

      if (error) {
        setMessage(error.message);
        setMessageType('error');
        return;
      }

      setMessage('Conta criada com sucesso!');
      setMessageType('success');
      setTimeout(() => {
          navigation.navigate('Login'); 
      }, 2000); 
    } 
    catch (error) 
    {
      console.error(error);
      setMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.p1}>CRIANDO UMA CONTA!</Text>

      {message ? (
        <Text style={[styles.message, messageType === 'success' ? styles.success : styles.error]}>
          {message}
        </Text>
      ) : null}

      <TextInput
        label="Nome Completo"
        value={nomeCompleto}
        onChangeText={text => setNomeCompleto(text)}
        style={styles.textInput}
        theme={{ colors: { primary: '#ffaf1b' } }}
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.textInput}
        theme={{ colors: { primary: '#ffaf1b' } }}
      />

      <TextInput
        label="Senha"
        value={senha}
        onChangeText={text => setSenha(text)}
        secureTextEntry={true}
        style={styles.textInput}
        theme={{ colors: { primary: '#ffaf1b' } }}
      />

      <View style={styles.container3}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.cancelar}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Criar conta</Text>
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
  container3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginTop: 20,
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
