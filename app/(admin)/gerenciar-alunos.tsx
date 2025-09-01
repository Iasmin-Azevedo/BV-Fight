import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface Aluno {
  id: string;
  nome: string;
  email: string;
  faixa: string;
  nivel: string;
  status: 'ativo' | 'inativo' | 'pendente';
  ultimoAcesso: string;
  treinosCompletados: number;
  avatar?: string;
}

export default function GerenciarAlunosScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme || 'light';
  const [searchTerm, setSearchTerm] = useState('');
  const [alunos] = useState<Aluno[]>([
    { id: '1', nome: 'João Silva', email: 'joao@email.com', faixa: 'Azul', nivel: 'Intermediário', status: 'ativo', ultimoAcesso: 'Hoje', treinosCompletados: 45, avatar: 'https://picsum.photos/100/100?random=1' },
    { id: '2', nome: 'Maria Santos', email: 'maria@email.com', faixa: 'Roxa', nivel: 'Avançado', status: 'ativo', ultimoAcesso: 'Ontem', treinosCompletados: 78, avatar: 'https://picsum.photos/100/100?random=2' },
    { id: '3', nome: 'Pedro Costa', email: 'pedro@email.com', faixa: 'Branca', nivel: 'Iniciante', status: 'ativo', ultimoAcesso: 'Há 2 dias', treinosCompletados: 12, avatar: 'https://picsum.photos/100/100?random=3' },
    { id: '4', nome: 'Ana Oliveira', email: 'ana@email.com', faixa: 'Marrom', nivel: 'Avançado', status: 'inativo', ultimoAcesso: 'Há 1 semana', treinosCompletados: 65, avatar: 'https://picsum.photos/100/100?random=4' },
    { id: '5', nome: 'Carlos Lima', email: 'carlos@email.com', faixa: 'Azul', nivel: 'Intermediário', status: 'pendente', ultimoAcesso: 'Nunca', treinosCompletados: 0, avatar: 'https://picsum.photos/100/100?random=5' },
    { id: '6', nome: 'Fernanda Rocha', email: 'fernanda@email.com', faixa: 'Preta', nivel: 'Mestre', status: 'ativo', ultimoAcesso: 'Hoje', treinosCompletados: 156, avatar: 'https://picsum.photos/100/100?random=6' },
  ]);

  const handleBack = () => {
    router.back();
  };

  const handleAddAluno = () => {
    Alert.alert('Adicionar Aluno', 'Funcionalidade em desenvolvimento');
  };

  const handleEditAluno = (aluno: Aluno) => {
    Alert.alert('Editar Aluno', `Editar: ${aluno.nome}`);
  };

  const handleToggleStatus = (aluno: Aluno) => {
    Alert.alert(
      'Alterar Status',
      `Deseja alterar o status do aluno "${aluno.nome}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', style: 'destructive' }
      ]
    );
  };

  const handleViewProfile = (aluno: Aluno) => {
    Alert.alert('Perfil do Aluno', `Ver perfil de: ${aluno.nome}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return '#4CAF50';
      case 'inativo': return '#F44336';
      case 'pendente': return '#FF9800';
      default: return '#9E9E9E';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ativo': return 'Ativo';
      case 'inativo': return 'Inativo';
      case 'pendente': return 'Pendente';
      default: return 'Desconhecido';
    }
  };

  const filteredAlunos = alunos.filter(aluno =>
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aluno.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aluno.faixa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <IconSymbol name="chevron.left" size={24} color={Colors[theme].text} />
          </TouchableOpacity>
          <ThemedText style={styles.title}>Gerenciar Alunos</ThemedText>
          <TouchableOpacity style={styles.addButton} onPress={handleAddAluno}>
            <IconSymbol name="plus" size={24} color={Colors[theme].accent} />
          </TouchableOpacity>
        </View>

        {/* Campo de busca */}
        <View style={[styles.searchContainer, { backgroundColor: Colors[theme].card }]}>
          <IconSymbol name="magnifyingglass" size={20} color={Colors[theme].icon} />
          <TextInput
            style={[styles.searchInput, { color: Colors[theme].text }]}
            placeholder="Buscar alunos..."
            placeholderTextColor={Colors[theme].icon}
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>

        {/* Estatísticas */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: Colors[theme].card }]}>
            <ThemedText style={styles.statValue}>{alunos.length}</ThemedText>
            <ThemedText style={styles.statLabel}>Total</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: Colors[theme].card }]}>
            <ThemedText style={styles.statValue}>{alunos.filter(a => a.status === 'ativo').length}</ThemedText>
            <ThemedText style={styles.statLabel}>Ativos</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: Colors[theme].card }]}>
            <ThemedText style={styles.statValue}>{alunos.filter(a => a.status === 'pendente').length}</ThemedText>
            <ThemedText style={styles.statLabel}>Pendentes</ThemedText>
          </View>
        </View>

        {/* Lista de alunos */}
        <View style={styles.alunosContainer}>
          {filteredAlunos.map((aluno) => (
            <View 
              key={aluno.id} 
              style={[styles.alunoCard, { backgroundColor: Colors[theme].card }]}
            >
              <View style={styles.alunoInfo}>
                <View style={styles.alunoHeader}>
                  <View style={styles.avatarContainer}>
                    {aluno.avatar ? (
                      <Image source={{ uri: aluno.avatar }} style={styles.avatar} />
                    ) : (
                      <View style={[styles.avatarPlaceholder, { backgroundColor: Colors[theme].accent }]}>
                        <IconSymbol name="person.fill" size={24} color="#FFFFFF" />
                      </View>
                    )}
                  </View>
                  
                  <View style={styles.alunoDetails}>
                    <ThemedText style={styles.alunoNome}>{aluno.nome}</ThemedText>
                    <ThemedText style={styles.alunoEmail}>{aluno.email}</ThemedText>
                    <View style={styles.alunoStats}>
                      <View style={styles.statItem}>
                        <IconSymbol name="figure.martial.arts" size={12} color={Colors[theme].icon} />
                        <ThemedText style={styles.statText}>{aluno.faixa}</ThemedText>
                      </View>
                      <View style={styles.statItem}>
                        <IconSymbol name="star.fill" size={12} color={Colors[theme].icon} />
                        <ThemedText style={styles.statText}>{aluno.nivel}</ThemedText>
                      </View>
                      <View style={styles.statItem}>
                        <IconSymbol name="chart.line.uptrend.xyaxis" size={12} color={Colors[theme].icon} />
                        <ThemedText style={styles.statText}>{aluno.treinosCompletados}</ThemedText>
                      </View>
                    </View>
                  </View>
                  
                  <View style={[
                    styles.statusBadge, 
                    { backgroundColor: getStatusColor(aluno.status) }
                  ]}>
                    <ThemedText style={styles.statusText}>
                      {getStatusText(aluno.status)}
                    </ThemedText>
                  </View>
                </View>
                
                <View style={styles.alunoFooter}>
                  <View style={styles.ultimoAcesso}>
                    <IconSymbol name="clock.fill" size={12} color={Colors[theme].icon} />
                    <ThemedText style={styles.ultimoAcessoText}>
                      Último acesso: {aluno.ultimoAcesso}
                    </ThemedText>
                  </View>
                </View>
              </View>
              
              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={[styles.actionButton, { backgroundColor: Colors[theme].accent }]}
                  onPress={() => handleViewProfile(aluno)}
                >
                  <IconSymbol name="eye.fill" size={16} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.actionButton, { backgroundColor: '#FF9800' }]}
                  onPress={() => handleEditAluno(aluno)}
                >
                  <IconSymbol name="pencil" size={16} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.actionButton, { backgroundColor: '#9C27B0' }]}
                  onPress={() => handleToggleStatus(aluno)}
                >
                  <IconSymbol name="gear" size={16} color="#FFFFFF" />
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
  alunosContainer: {
    marginBottom: 24,
  },
  alunoCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  alunoInfo: {
    marginBottom: 16,
  },
  alunoHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alunoDetails: {
    flex: 1,
  },
  alunoNome: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  alunoEmail: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 8,
  },
  alunoStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  statText: {
    fontSize: 11,
    marginLeft: 4,
    opacity: 0.7,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  alunoFooter: {
    marginTop: 8,
  },
  ultimoAcesso: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ultimoAcessoText: {
    fontSize: 11,
    marginLeft: 4,
    opacity: 0.7,
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
