import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface Treino {
  id: string;
  nome: string;
  categoria: string;
  duracao: string;
  nivel: string;
  tecnicas: number;
  status: 'ativo' | 'inativo';
  alunosAtivos: number;
}

export default function GerenciarTreinosScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme || 'light';
  const [searchTerm, setSearchTerm] = useState('');
  const [treinos] = useState<Treino[]>([
    { id: '1', nome: 'Treino de Guarda', categoria: 'Guarda', duracao: '45 min', nivel: 'Intermediário', tecnicas: 8, status: 'ativo', alunosAtivos: 15 },
    { id: '2', nome: 'Treino de Passagem', categoria: 'Passagem', duracao: '30 min', nivel: 'Avançado', tecnicas: 6, status: 'ativo', alunosAtivos: 12 },
    { id: '3', nome: 'Treino de Finalização', categoria: 'Finalização', duracao: '40 min', nivel: 'Básico', tecnicas: 10, status: 'ativo', alunosAtivos: 20 },
    { id: '4', nome: 'Treino de Defesa', categoria: 'Defesa', duracao: '35 min', nivel: 'Intermediário', tecnicas: 7, status: 'inativo', alunosAtivos: 0 },
    { id: '5', nome: 'Treino de Competição', categoria: 'Competição', duracao: '60 min', nivel: 'Avançado', tecnicas: 12, status: 'ativo', alunosAtivos: 8 },
  ]);

  const handleBack = () => {
    router.back();
  };

  const handleAddTreino = () => {
    Alert.alert('Adicionar Treino', 'Funcionalidade em desenvolvimento');
  };

  const handleEditTreino = (treino: Treino) => {
    Alert.alert('Editar Treino', `Editar: ${treino.nome}`);
  };

  const handleToggleStatus = (treino: Treino) => {
    Alert.alert(
      'Alterar Status',
      `Deseja ${treino.status === 'ativo' ? 'desativar' : 'ativar'} o treino "${treino.nome}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', style: 'destructive' }
      ]
    );
  };

  const handleViewDetails = (treino: Treino) => {
    Alert.alert('Detalhes do Treino', `Ver detalhes de: ${treino.nome}`);
  };

  const filteredTreinos = treinos.filter(treino =>
    treino.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    treino.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
    treino.nivel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <IconSymbol name="chevron.left" size={24} color={Colors[theme].text} />
          </TouchableOpacity>
          <ThemedText style={styles.title}>Gerenciar Treinos</ThemedText>
          <TouchableOpacity style={styles.addButton} onPress={handleAddTreino}>
            <IconSymbol name="plus" size={24} color={Colors[theme].accent} />
          </TouchableOpacity>
        </View>

        {/* Campo de busca */}
        <View style={[styles.searchContainer, { backgroundColor: Colors[theme].card }]}>
          <IconSymbol name="magnifyingglass" size={20} color={Colors[theme].icon} />
          <TextInput
            style={[styles.searchInput, { color: Colors[theme].text }]}
            placeholder="Buscar treinos..."
            placeholderTextColor={Colors[theme].icon}
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>

        {/* Estatísticas */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: Colors[theme].card }]}>
            <ThemedText style={styles.statValue}>{treinos.length}</ThemedText>
            <ThemedText style={styles.statLabel}>Total</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: Colors[theme].card }]}>
            <ThemedText style={styles.statValue}>{treinos.filter(t => t.status === 'ativo').length}</ThemedText>
            <ThemedText style={styles.statLabel}>Ativos</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: Colors[theme].card }]}>
            <ThemedText style={styles.statValue}>{treinos.reduce((acc, t) => acc + t.alunosAtivos, 0)}</ThemedText>
            <ThemedText style={styles.statLabel}>Alunos</ThemedText>
          </View>
        </View>

        {/* Lista de treinos */}
        <View style={styles.treinosContainer}>
          {filteredTreinos.map((treino) => (
            <View 
              key={treino.id} 
              style={[styles.treinoCard, { backgroundColor: Colors[theme].card }]}
            >
              <View style={styles.treinoInfo}>
                <View style={styles.treinoHeader}>
                  <ThemedText style={styles.treinoNome}>{treino.nome}</ThemedText>
                  <View style={[
                    styles.statusBadge, 
                    { backgroundColor: treino.status === 'ativo' ? '#4CAF50' : '#F44336' }
                  ]}>
                    <ThemedText style={styles.statusText}>
                      {treino.status === 'ativo' ? 'Ativo' : 'Inativo'}
                    </ThemedText>
                  </View>
                </View>
                
                <View style={styles.treinoDetails}>
                  <View style={styles.detailItem}>
                    <IconSymbol name="tag.fill" size={12} color={Colors[theme].icon} />
                    <ThemedText style={styles.detailText}>{treino.categoria}</ThemedText>
                  </View>
                  <View style={styles.detailItem}>
                    <IconSymbol name="clock.fill" size={12} color={Colors[theme].icon} />
                    <ThemedText style={styles.detailText}>{treino.duracao}</ThemedText>
                  </View>
                  <View style={styles.detailItem}>
                    <IconSymbol name="star.fill" size={12} color={Colors[theme].icon} />
                    <ThemedText style={styles.detailText}>{treino.nivel}</ThemedText>
                  </View>
                  <View style={styles.detailItem}>
                    <IconSymbol name="figure.martial.arts" size={12} color={Colors[theme].icon} />
                    <ThemedText style={styles.detailText}>{treino.tecnicas} técnicas</ThemedText>
                  </View>
                </View>
                
                <View style={styles.alunosInfo}>
                  <IconSymbol name="person.3.fill" size={14} color={Colors[theme].accent} />
                  <ThemedText style={styles.alunosText}>{treino.alunosAtivos} alunos ativos</ThemedText>
                </View>
              </View>
              
              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={[styles.actionButton, { backgroundColor: Colors[theme].accent }]}
                  onPress={() => handleViewDetails(treino)}
                >
                  <IconSymbol name="eye.fill" size={16} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.actionButton, { backgroundColor: '#FF9800' }]}
                  onPress={() => handleEditTreino(treino)}
                >
                  <IconSymbol name="pencil" size={16} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.actionButton, { backgroundColor: treino.status === 'ativo' ? '#F44336' : '#4CAF50' }]}
                  onPress={() => handleToggleStatus(treino)}
                >
                  <IconSymbol 
                    name={treino.status === 'ativo' ? 'pause.fill' : 'play.fill'} 
                    size={16} 
                    color="#FFFFFF" 
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  addButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
    height: 50,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  treinosContainer: {
    marginBottom: 24,
  },
  treinoCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  treinoInfo: {
    marginBottom: 16,
  },
  treinoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  treinoNome: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  treinoDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  detailText: {
    fontSize: 12,
    marginLeft: 4,
    opacity: 0.7,
  },
  alunosInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alunosText: {
    fontSize: 12,
    marginLeft: 6,
    color: Colors.light.accent,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});
