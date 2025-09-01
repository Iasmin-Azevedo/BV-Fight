import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface Atleta {
  id: string;
  nome: string;
  categoria: string;
  peso: string;
  faixa: string;
  tecnicas: number;
  vitorias: number;
  derrotas: number;
  descricao: string;
  avatar: string;
  especialidade: string;
}

export default function AtletasScreen() {
  const colorScheme = useColorScheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  
  const [atletas] = useState<Atleta[]>([
    {
      id: '1',
      nome: 'André Galvão',
      categoria: 'Peso Médio',
      peso: '84kg',
      faixa: 'Preta 3º Grau',
      tecnicas: 25,
      vitorias: 45,
      derrotas: 8,
      descricao: 'Mestre de jiu-jitsu brasileiro, campeão mundial',
      avatar: 'https://picsum.photos/200/200?random=10',
      especialidade: 'Guarda'
    },
    {
      id: '2',
      nome: 'Bernardo Faria',
      categoria: 'Peso Pesado',
      peso: '94kg',
      faixa: 'Preta 5º Grau',
      tecnicas: 30,
      vitorias: 52,
      derrotas: 12,
      descricao: 'Especialista em guarda fechada e passagem',
      avatar: 'https://picsum.photos/200/200?random=11',
      especialidade: 'Passagem'
    },
    {
      id: '3',
      nome: 'Leandro Lo',
      categoria: 'Peso Leve',
      peso: '76kg',
      faixa: 'Preta 4º Grau',
      tecnicas: 28,
      vitorias: 38,
      derrotas: 15,
      descricao: 'Atleta conhecido por sua guarda aberta',
      avatar: 'https://picsum.photos/200/200?random=12',
      especialidade: 'Guarda Aberta'
    },
    {
      id: '4',
      nome: 'Rodolfo Vieira',
      categoria: 'Peso Pesado',
      peso: '100kg',
      faixa: 'Preta 2º Grau',
      tecnicas: 22,
      vitorias: 42,
      derrotas: 6,
      descricao: 'Especialista em finalizações e posições dominantes',
      avatar: 'https://picsum.photos/200/200?random=13',
      especialidade: 'Finalização'
    },
    {
      id: '5',
      nome: 'Felipe Pena',
      categoria: 'Peso Médio',
      peso: '82kg',
      faixa: 'Preta 1º Grau',
      tecnicas: 18,
      vitorias: 28,
      derrotas: 10,
      descricao: 'Atleta com estilo agressivo e técnico',
      avatar: 'https://picsum.photos/200/200?random=14',
      especialidade: 'Competição'
    },
    {
      id: '6',
      nome: 'Lucas Lepri',
      categoria: 'Peso Leve',
      peso: '74kg',
      faixa: 'Preta 6º Grau',
      tecnicas: 35,
      vitorias: 58,
      derrotas: 9,
      descricao: 'Mestre com técnica refinada e estratégia',
      avatar: 'https://picsum.photos/200/200?random=15',
      especialidade: 'Técnica'
    }
  ]);

  const categories = ['todas', 'Peso Leve', 'Peso Médio', 'Peso Pesado'];

  const handleBack = () => {
    router.back();
  };

  const handleAtletaPress = (atleta: Atleta) => {
    console.log('Atleta selecionado:', atleta.nome);
  };

  const filteredAtletas = atletas.filter(atleta => {
    const matchesSearch = atleta.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         atleta.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         atleta.especialidade.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todas' || atleta.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getWinRate = (vitorias: number, derrotas: number) => {
    const total = vitorias + derrotas;
    if (total === 0) return '0%';
    return `${Math.round((vitorias / total) * 100)}%`;
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <IconSymbol name="chevron.left" size={24} color={Colors[theme].text} />
          </TouchableOpacity>
          <ThemedText style={styles.title}>Atletas</ThemedText>
          <View style={styles.placeholder} />
        </View>

        {/* Campo de busca */}
        <View style={[styles.searchContainer, { backgroundColor: Colors[theme].card }]}>
          <IconSymbol name="magnifyingglass" size={20} color={Colors[theme].icon} />
          <TextInput
            style={[styles.searchInput, { color: Colors[theme].text }]}
            placeholder="Buscar atletas..."
            placeholderTextColor={Colors[theme].icon}
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>

        {/* Filtros de categoria */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && { backgroundColor: Colors[theme].accent }
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <ThemedText style={[
                styles.categoryText,
                selectedCategory === category && { color: '#FFFFFF' }
              ]}>
                {category === 'todas' ? 'Todas' : category}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Lista de atletas */}
        <View style={styles.atletasContainer}>
          {filteredAtletas.map((atleta) => (
            <TouchableOpacity
              key={atleta.id}
              style={[styles.atletaCard, { backgroundColor: Colors[theme].card }]}
              onPress={() => handleAtletaPress(atleta)}
            >
              <Image source={{ uri: atleta.avatar }} style={styles.atletaAvatar} />
              <View style={styles.atletaInfo}>
                <View style={styles.atletaHeader}>
                  <ThemedText style={styles.atletaNome}>{atleta.nome}</ThemedText>
                  <View style={styles.faixaBadge}>
                    <ThemedText style={styles.faixaText}>{atleta.faixa}</ThemedText>
                  </View>
                </View>
                
                <ThemedText style={styles.atletaDescricao}>{atleta.descricao}</ThemedText>
                
                <View style={styles.atletaStats}>
                  <View style={styles.statItem}>
                    <IconSymbol name="scalemass.fill" size={12} color={Colors[theme].icon} />
                    <ThemedText style={styles.statText}>{atleta.categoria} ({atleta.peso})</ThemedText>
                  </View>
                  <View style={styles.statItem}>
                    <IconSymbol name="figure.martial.arts" size={12} color={Colors[theme].icon} />
                    <ThemedText style={styles.statText}>{atleta.tecnicas} técnicas</ThemedText>
                  </View>
                  <View style={styles.statItem}>
                    <IconSymbol name="star.fill" size={12} color={Colors[theme].icon} />
                    <ThemedText style={styles.statText}>{atleta.especialidade}</ThemedText>
                  </View>
                </View>
                
                <View style={styles.performanceContainer}>
                  <View style={styles.performanceItem}>
                    <ThemedText style={styles.performanceLabel}>Vitórias</ThemedText>
                    <ThemedText style={[styles.performanceValue, { color: '#4CAF50' }]}>{atleta.vitorias}</ThemedText>
                  </View>
                  <View style={styles.performanceItem}>
                    <ThemedText style={styles.performanceLabel}>Derrotas</ThemedText>
                    <ThemedText style={[styles.performanceValue, { color: '#F44336' }]}>{atleta.derrotas}</ThemedText>
                  </View>
                  <View style={styles.performanceItem}>
                    <ThemedText style={styles.performanceLabel}>Taxa de Vitória</ThemedText>
                    <ThemedText style={[styles.performanceValue, { color: Colors[colorScheme].accent }]}>
                      {getWinRate(atleta.vitorias, atleta.derrotas)}
                    </ThemedText>
                  </View>
                </View>
                
                <View style={styles.viewProfileButton}>
                  <IconSymbol name="eye.circle.fill" size={20} color={Colors[colorScheme].accent} />
                  <ThemedText style={styles.viewProfileText}>Ver Perfil</ThemedText>
                </View>
              </View>
            </TouchableOpacity>
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
  },
  placeholder: {
    width: 40,
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
  categoriesContainer: {
    marginBottom: 24,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  atletasContainer: {
    marginBottom: 24,
  },
  atletaCard: {
    flexDirection: 'row',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  atletaAvatar: {
    width: 100,
    height: 100,
  },
  atletaInfo: {
    flex: 1,
    padding: 16,
  },
  atletaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  atletaNome: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  faixaBadge: {
    backgroundColor: Colors.light.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  faixaText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  atletaDescricao: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 12,
  },
  atletaStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
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
  performanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  performanceItem: {
    alignItems: 'center',
    flex: 1,
  },
  performanceLabel: {
    fontSize: 10,
    opacity: 0.7,
    marginBottom: 4,
  },
  performanceValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  viewProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  viewProfileText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
    color: Colors.light.accent,
  },
});
