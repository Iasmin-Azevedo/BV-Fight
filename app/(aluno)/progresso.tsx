import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface Meta {
  id: string;
  titulo: string;
  descricao: string;
  progresso: number;
  dataLimite: string;
  categoria: string;
}

interface Estatistica {
  titulo: string;
  valor: string;
  unidade: string;
  cor: string;
  icone: string;
}

export default function ProgressoScreen() {
  const colorScheme = useColorScheme();
  const [selectedPeriod, setSelectedPeriod] = useState<'semana' | 'mes' | 'ano'>('mes');
  
  const [estatisticas] = useState<Estatistica[]>([
    {
      titulo: 'Treinos Completados',
      valor: '24',
      unidade: 'treinos',
      cor: '#4CAF50',
      icone: 'figure.martial.arts'
    },
    {
      titulo: 'Técnicas Aprendidas',
      valor: '18',
      unidade: 'técnicas',
      cor: '#2196F3',
      icone: 'book.fill'
    },
    {
      titulo: 'Horas de Treino',
      valor: '32',
      unidade: 'horas',
      cor: '#FF9800',
      icone: 'clock.fill'
    },
    {
      titulo: 'Competições',
      valor: '3',
      unidade: 'competições',
      cor: '#9C27B0',
      icone: 'trophy.fill'
    }
  ]);

  const [metas] = useState<Meta[]>([
    {
      id: '1',
      titulo: 'Aprender 5 técnicas de guarda',
      descricao: 'Focar em técnicas de guarda fechada e aberta',
      progresso: 80,
      dataLimite: '15/12/2024',
      categoria: 'Técnica'
    },
    {
      id: '2',
      titulo: 'Completar 30 treinos',
      descricao: 'Treinar pelo menos 3 vezes por semana',
      progresso: 60,
      dataLimite: '31/12/2024',
      categoria: 'Frequência'
    },
    {
      id: '3',
      titulo: 'Participar de 2 competições',
      descricao: 'Ganhar experiência competitiva',
      progresso: 50,
      dataLimite: '30/11/2024',
      categoria: 'Competição'
    },
    {
      id: '4',
      titulo: 'Melhorar defesa pessoal',
      descricao: 'Trabalhar escapes e reversões',
      progresso: 40,
      dataLimite: '20/12/2024',
      categoria: 'Defesa'
    }
  ]);

  const handleBack = () => {
    router.back();
  };

  const handleMetaPress = (meta: Meta) => {
    // Aqui você pode navegar para uma tela de detalhes da meta
    console.log('Meta selecionada:', meta.titulo);
  };

  const getProgressColor = (progresso: number) => {
    if (progresso < 30) return '#F44336';
    if (progresso < 70) return '#FF9800';
    return '#4CAF50';
  };

  const getPeriodLabel = (period: string) => {
    switch (period) {
      case 'semana': return 'Esta Semana';
      case 'mes': return 'Este Mês';
      case 'ano': return 'Este Ano';
      default: return 'Este Mês';
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <IconSymbol name="chevron.left" size={24} color={Colors[theme].text} />
          </TouchableOpacity>
          <ThemedText style={styles.title}>Meu Progresso</ThemedText>
          <View style={styles.placeholder} />
        </View>

        {/* Seletor de período */}
        <View style={styles.periodSelector}>
          {(['semana', 'mes', 'ano'] as const).map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && { backgroundColor: Colors[theme].accent }
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <ThemedText style={[
                styles.periodText,
                selectedPeriod === period && { color: '#FFFFFF' }
              ]}>
                {getPeriodLabel(period)}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Estatísticas principais */}
        <View style={styles.statsContainer}>
          {estatisticas.map((stat, index) => (
            <View 
              key={index} 
              style={[styles.statCard, { backgroundColor: Colors[theme].card }]}
            >
              <View style={[styles.statIcon, { backgroundColor: stat.cor }]}>
                <IconSymbol name={stat.icone as any} size={24} color="#FFFFFF" />
              </View>
              <View style={styles.statInfo}>
                <ThemedText style={styles.statValue}>{stat.valor}</ThemedText>
                <ThemedText style={styles.statUnit}>{stat.unidade}</ThemedText>
                <ThemedText style={styles.statTitle}>{stat.titulo}</ThemedText>
              </View>
            </View>
          ))}
        </View>

        {/* Gráfico de progresso */}
        <View style={[styles.chartContainer, { backgroundColor: Colors[theme].card }]}>
          <ThemedText style={styles.chartTitle}>Progresso Geral</ThemedText>
          <View style={styles.chartBar}>
            <View style={styles.chartBarBackground}>
              <View style={[styles.chartBarFill, { width: '65%', backgroundColor: Colors[theme].accent }]} />
            </View>
            <ThemedText style={styles.chartPercentage}>65%</ThemedText>
          </View>
          <ThemedText style={styles.chartSubtitle}>Você está no caminho certo!</ThemedText>
        </View>

        {/* Metas */}
        <View style={styles.metasContainer}>
          <ThemedText style={styles.metasTitle}>Minhas Metas</ThemedText>
          {metas.map((meta) => (
            <TouchableOpacity
              key={meta.id}
              style={[styles.metaCard, { backgroundColor: Colors[colorScheme].card }]}
              onPress={() => handleMetaPress(meta)}
            >
              <View style={styles.metaHeader}>
                <View style={styles.metaInfo}>
                  <ThemedText style={styles.metaTitulo}>{meta.titulo}</ThemedText>
                  <ThemedText style={styles.metaDescricao}>{meta.descricao}</ThemedText>
                  <View style={styles.metaDetails}>
                    <View style={styles.metaDetail}>
                      <IconSymbol name="tag.fill" size={12} color={Colors[colorScheme].icon} />
                      <ThemedText style={styles.metaDetailText}>{meta.categoria}</ThemedText>
                    </View>
                    <View style={styles.metaDetail}>
                      <IconSymbol name="calendar" size={12} color={Colors[colorScheme].icon} />
                      <ThemedText style={styles.metaDetailText}>{meta.dataLimite}</ThemedText>
                    </View>
                  </View>
                </View>
                <View style={styles.metaProgress}>
                  <View style={styles.progressCircle}>
                    <ThemedText style={[styles.progressText, { color: getProgressColor(meta.progresso) }]}>
                      {meta.progresso}%
                    </ThemedText>
                  </View>
                </View>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { backgroundColor: '#E0E0E0' }]}>
                  <View 
                    style={[
                      styles.progressBarFill, 
                      { 
                        width: `${meta.progresso}%`,
                        backgroundColor: getProgressColor(meta.progresso)
                      }
                    ]} 
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Conquistas */}
        <View style={styles.conquistasContainer}>
          <ThemedText style={styles.conquistasTitle}>Conquistas Recentes</ThemedText>
          <View style={styles.conquistasGrid}>
            {[
              { titulo: 'Primeira Faixa', icone: 'star.fill', cor: '#FFD700' },
              { titulo: '10 Treinos', icone: 'figure.martial.arts', cor: '#4CAF50' },
              { titulo: 'Técnica Perfeita', icone: 'checkmark.circle.fill', cor: '#2196F3' },
              { titulo: 'Competidor', icone: 'trophy.fill', cor: '#FF9800' }
            ].map((conquista, index) => (
              <View key={index} style={styles.conquistaItem}>
                <View style={[styles.conquistaIcon, { backgroundColor: conquista.cor }]}>
                  <IconSymbol name={conquista.icone as any} size={24} color="#FFFFFF" />
                </View>
                <ThemedText style={styles.conquistaTitulo}>{conquista.titulo}</ThemedText>
              </View>
            ))}
          </View>
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
  periodSelector: {
    flexDirection: 'row',
    marginBottom: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 12,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  periodText: {
    fontSize: 14,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statInfo: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statUnit: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.8,
  },
  chartContainer: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  chartBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  chartBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginRight: 12,
  },
  chartBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  chartPercentage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.accent,
  },
  chartSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
  },
  metasContainer: {
    marginBottom: 24,
  },
  metasTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  metaCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  metaHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  metaInfo: {
    flex: 1,
    marginRight: 16,
  },
  metaTitulo: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  metaDescricao: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 8,
  },
  metaDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metaDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  metaDetailText: {
    fontSize: 11,
    marginLeft: 4,
    opacity: 0.7,
  },
  metaProgress: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  conquistasContainer: {
    marginBottom: 24,
  },
  conquistasTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  conquistasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  conquistaItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  conquistaIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  conquistaTitulo: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
});
