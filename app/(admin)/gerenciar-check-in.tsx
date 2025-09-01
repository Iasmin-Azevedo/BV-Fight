import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface Tecnica {
  id: string;
  nome: string;
  categoria: string;
  posicao: string;
  nivel: string;
  status: 'ativo' | 'inativo';
}

export default function GerenciarTecnicasScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme || 'light';
  const [searchTerm, setSearchTerm] = useState('');
  const [tecnicas] = useState<Tecnica[]>([
    { id: '1', nome: 'Armlock da Guarda', categoria: 'Finalização', posicao: 'Guarda Fechada', nivel: 'Intermediário', status: 'ativo' },
    { id: '2', nome: 'Triângulo da Guarda', categoria: 'Finalização', posicao: 'Guarda Aberta', nivel: 'Avançado', status: 'ativo' },
    { id: '3', nome: 'Kimura da Guarda', categoria: 'Finalização', posicao: 'Guarda Fechada', nivel: 'Básico', status: 'ativo' },
    { id: '4', nome: 'Omoplata da Guarda', categoria: 'Finalização', posicao: 'Guarda Aberta', nivel: 'Intermediário', status: 'inativo' },
    { id: '5', nome: 'Guillotine', categoria: 'Finalização', posicao: 'Front Headlock', nivel: 'Básico', status: 'ativo' },
  ]);

  const handleBack = () => {
    router.back();
  };

  const handleAddTecnica = () => {
    Alert.alert('Adicionar Técnica', 'Funcionalidade em desenvolvimento');
  };

  const handleEditTecnica = (tecnica: Tecnica) => {
    Alert.alert('Editar Técnica', `Editar: ${tecnica.nome}`);
  };

  const handleToggleStatus = (tecnica: Tecnica) => {
    Alert.alert(
      'Alterar Status',
      `Deseja ${tecnica.status === 'ativo' ? 'desativar' : 'ativar'} a técnica "${tecnica.nome}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', style: 'destructive' }
      ]
    );
  };

  const filteredTecnicas = tecnicas.filter(tecnica =>
    tecnica.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tecnica.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tecnica.posicao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <IconSymbol name="chevron.left" size={24} color={Colors[theme].text} />
          </TouchableOpacity>
          <ThemedText style={styles.title}>Gerenciar Técnicas</ThemedText>
          <TouchableOpacity style={styles.addButton} onPress={handleAddTecnica}>
            <IconSymbol name="plus" size={24} color={Colors[theme].accent} />
          </TouchableOpacity>
        </View>

        {/* Campo de busca */}
        <View style={[styles.searchContainer, { backgroundColor: Colors[theme].card }]}>
          <IconSymbol name="magnifyingglass" size={20} color={Colors[theme].icon} />
          <TextInput
            style={[styles.searchInput, { color: Colors[theme].text }]}
            placeholder="Buscar técnicas..."
            placeholderTextColor={Colors[theme].icon}
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>

        {/* Estatísticas */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: Colors[theme].card }]}>
            <ThemedText style={styles.statValue}>{tecnicas.length}</ThemedText>
            <ThemedText style={styles.statLabel}>Total</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: Colors[theme].card }]}>
            <ThemedText style={styles.statValue}>{tecnicas.filter(t => t.status === 'ativo').length}</ThemedText>
            <ThemedText style={styles.statLabel}>Ativas</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: Colors[theme].card }]}>
            <ThemedText style={styles.statValue}>{tecnicas.filter(t => t.status === 'inativo').length}</ThemedText>
            <ThemedText style={styles.statLabel}>Inativas</ThemedText>
          </View>
        </View>

        {/* Lista de técnicas */}
        <View style={styles.tecnicasContainer}>
          {filteredTecnicas.map((tecnica) => (
            <View 
              key={tecnica.id} 
              style={[styles.tecnicaCard, { backgroundColor: Colors[theme].card }]}
            >
              <View style={styles.tecnicaInfo}>
                <ThemedText style={styles.tecnicaNome}>{tecnica.nome}</ThemedText>
                <View style={styles.tecnicaDetails}>
                  <View style={styles.detailItem}>
                    <IconSymbol name="tag.fill" size={12} color={Colors[theme].icon} />
                    <ThemedText style={styles.detailText}>{tecnica.categoria}</ThemedText>
                  </View>
                  <View style={styles.detailItem}>
                    <IconSymbol name="figure.martial.arts" size={12} color={Colors[theme].icon} />
                    <ThemedText style={styles.detailText}>{tecnica.posicao}</ThemedText>
                  </View>
                  <View style={styles.detailItem}>
                    <IconSymbol name="star.fill" size={12} color={Colors[theme].icon} />
                    <ThemedText style={styles.detailText}>{tecnica.nivel}</ThemedText>
                  </View>
                </View>
                <View style={[
                  styles.statusBadge, 
                  { backgroundColor: tecnica.status === 'ativo' ? '#4CAF50' : '#F44336' }
                ]}>
                  <ThemedText style={styles.statusText}>
                    {tecnica.status === 'ativo' ? 'Ativa' : 'Inativa'}
                  </ThemedText>
                </View>
              </View>
              
              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={[styles.actionButton, { backgroundColor: Colors[theme].accent }]}
                  onPress={() => handleEditTecnica(tecnica)}
                >
                  <IconSymbol name="pencil" size={16} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.actionButton, { backgroundColor: tecnica.status === 'ativo' ? '#F44336' : '#4CAF50' }]}
                  onPress={() => handleToggleStatus(tecnica)}
                >
                  <IconSymbol 
                    name={tecnica.status === 'ativo' ? 'pause.fill' : 'play.fill'} 
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
  tecnicasContainer: {
    marginBottom: 24,
  },
  tecnicaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tecnicaInfo: {
    flex: 1,
  },
  tecnicaNome: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  tecnicaDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
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
  actionButtons: {
    flexDirection: 'row',
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
