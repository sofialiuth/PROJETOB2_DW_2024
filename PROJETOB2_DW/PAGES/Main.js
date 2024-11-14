import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Appbar } from 'react-native-paper';
import { supabase } from '../supabase'; 


function Card({ elemento }) {
  const [showDetails, setShowDetails] = useState(false); 

  const toggleDetails = () => {
    setShowDetails(!showDetails); 
  };

  return (
    <View style={styles.card}>
      <Text style={styles.pCard}>Grupo: {elemento.nome_grupo}</Text>
      
      <TouchableOpacity onPress={toggleDetails}>
        <Text style={styles.toggleText}>{showDetails ? 'Ver Menos' : 'Ver Mais'}</Text>
      </TouchableOpacity>

      {showDetails && (
        <>
          <Text style={styles.pCard}>Descrição: {elemento.descricao}</Text>
          <Text style={styles.pCard}>Integrantes: {elemento.integrantes.join(', ')}</Text>
          <Text style={styles.pCard}>Nota: {elemento.nota_gp || 'Ainda não avaliado'}</Text>
        </>
      )}
    </View>
  );
}


export default function Main({ navigation }) {
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchData = async () => {
    try {
      let { data, error } = await supabase
        .from('Grupo')
        .select(`
          id,
          descricao,
          nome_grupo,
          Aluno (nome_completo),
          Avaliacao (nota)
        `);

      if (error) {
        console.error('Erro ao buscar os dados:', error);
      } else {
        const gruposFormatados = data.map(grupo => ({
          ...grupo,
          integrantes: grupo.Aluno.map(aluno => aluno.nome_completo), 
          nota_gp: grupo.Avaliacao?.nota || 'Ainda não avaliado' 
        }));
        setGrupos(gruposFormatados); 
      }
    } catch (err) {
      console.error('Erro inesperado:', err);
    } finally {
      setLoading(false); 
    }
  };

  fetchData();
}, []);


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffaf1b" />
        <Text style={styles.loadingText}>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.navigate('Login')} />
      </Appbar.Header>
      <View style={styles.container1}>
        <Text style={styles.p}>Olá, confira os projetos para o InovaWeek 2025!</Text>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {grupos.map((grupo, index) => (
            <Card key={index} elemento={grupo} />
          ))}
        </ScrollView>
      </View>
    </>
  );
}


const styles = StyleSheet.create({
  card: {
    width: 280,
    borderRadius: 10,
    backgroundColor: '#ffaf1b',
    marginBottom: 10,
    marginTop: 10,
    padding: 15,
    justifyContent: 'center',
    overflow: 'hidden',
  },

  header: {
    backgroundColor: '#006673',
    height: 60,
  },

  pCard: {
    color: '#006673',
    fontSize: 15,
    fontWeight: 'bold',
  },

  toggleText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
  },

  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#006673',
  },

  p: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    marginTop: 30,
    marginBottom: 20,
    padding: 5,
    textAlign: 'center',
  },

  scrollView: {
    height: 1, // GAMBIARRA
    padding: 1, // GAMBIARRA pt2
    alignItems: 'center',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#006673',
  },

  loadingText: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
  },
});

