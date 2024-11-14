import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { supabase } from '../supabase'; // Certifique-se de que o arquivo supabase.js esteja configurado corretamente

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');  // Estado para a mensagem
  const [messageType, setMessageType] = useState('');  // Tipo de mensagem (sucesso ou erro)

  // Função para lidar com o login
  const handleLogin = async () => {
    if (!email || !senha) {
      setMessage('Por favor, preencha todos os campos.');
      setMessageType('error'); // Tipo de mensagem: erro
      return;
    }

    try {
      // Verifica se o usuário existe na tabela 'Aluno'
      const { data, error } = await supabase
        .from('Aluno')
        .select('*')  // Seleciona todos os campos
        .eq('email', email)  // Verifica se o email corresponde
        .eq('senha', senha)  // Verifica se a senha corresponde
        .single();  // Espera apenas um resultado, já que o e-mail deve ser único

      if (error) {
        setMessage('E-mail ou senha incorretos.');
        setMessageType('error'); // Tipo de mensagem: erro
      } else if (data) {
        // Login bem-sucedido
        setMessage('Login realizado com sucesso!');
        setMessageType('success'); // Tipo de mensagem: sucesso

        // Redireciona após 2 segundos
        setTimeout(() => {
          navigation.navigate('Main');
        }, 2000);
      }
    } catch (err) {
      setMessage('Houve um problema ao tentar fazer login. Tente novamente.');
      setMessageType('error'); // Tipo de mensagem: erro
      console.log('Erro inesperado:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.p}>ÁREA DE LOGIN</Text>

      {/* Exibe a mensagem de erro ou sucesso */}
      {message ? (
        <Text style={[styles.message, messageType === 'error' ? styles.error : styles.success]}>
          {message}
        </Text>
      ) : null}

      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.textInput}
        theme={{ colors: { primary: '#ffaf1b' } }} // Muda a cor de foco
      />

      <TextInput
        label="Senha"
        value={senha}
        onChangeText={text => setSenha(text)}
        secureTextEntry={true}
        style={styles.textInput}
        theme={{ colors: { primary: '#ffaf1b' } }}
      />

      
      <View style={styles.container2}>
        <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
          <Text style={styles.esqueceu}>esqueceu a senha?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.esqueceu}>criar conta</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
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
  container2: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  p: {
    marginBottom: 30,
    fontSize: 35,
    fontWeight: 'bold',
    color: '#9cae28',
  },
  button: {
    backgroundColor: '#ffaf1b',
    padding: 10,
    borderRadius: 5,
    width: '40%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#006673',
    fontWeight: 'bold',
    fontSize: 18,
  },
  textInput: {
    backgroundColor: 'white',
    marginBottom: 10,
    width: '70%',
    height: 55,
  },
  esqueceu: {
    textAlign: 'center',
    color: '#ffaf1b',
    fontSize: 12,
    marginTop: 3,
    textDecorationLine: 'underline',
  },
  message: {
    marginBottom: 20,
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
