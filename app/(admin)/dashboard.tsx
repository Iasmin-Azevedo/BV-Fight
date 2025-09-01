import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function AdminDashboardScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme || 'light';

  const navigateToScreen = (screen: string) => {
    if (screen === 'gerenciar-tecnicas') {
      router.push('/(admin)/gerenciar-check-in');
    } else if (screen === 'gerenciar-treinos') {
      router.push('/(admin)/gerenciar-treinos');
    } else if (screen === 'gerenciar-atletas') {
      router.push('/(admin)/gerenciar-atletas');
    } else if (screen === 'gerenciar-alunos') {
      router.push('/(admin)/gerenciar-alunos');
    }
  };

  const handleLogout = () => {
    router.replace('/login');
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header com perfil */}
        <View style={styles.header}>
          <View>
            <ThemedText style={styles.greeting}>Painel Administrativo</ThemedText>
            <ThemedText style={styles.subtitle}>Gerencie o conteúdo do aplicativo</ThemedText>
          </View>
          <TouchableOpacity style={styles.profileButton} onPress={handleLogout}>
            <IconSymbol name="person.circle.fill" size={40} color={Colors[theme].accent} />
          </TouchableOpacity>
        </View>

        {/* Estatísticas */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: Colors[theme].card }]}>
            <IconSymbol name="person.3.fill" size={24} color={Colors[theme].accent} />
            <ThemedText style={styles.statValue}>42</ThemedText>
            <ThemedText style={styles.statLabel}>Alunos</ThemedText>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: Colors[theme].card }]}>
            <IconSymbol name="book.fill" size={24} color={Colors[theme].accent} />
            <ThemedText style={styles.statValue}>156</ThemedText>
            <ThemedText style={styles.statLabel}>Técnicas</ThemedText>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: Colors[theme].card }]}>
            <IconSymbol name="figure.martial.arts" size={24} color={Colors[theme].accent} />
            <ThemedText style={styles.statValue}>28</ThemedText>
            <ThemedText style={styles.statLabel}>Treinos</ThemedText>
          </View>
        </View>

        {/* Botões de gerenciamento */}
        <ThemedText style={styles.sectionTitle}>Gerenciamento</ThemedText>
        <View style={styles.managementGrid}>
          <TouchableOpacity 
            style={[styles.managementButton, { backgroundColor: Colors[theme].card }]}
            onPress={() => navigateToScreen('gerenciar-tecnicas')}
          >
            <IconSymbol name="book.fill" size={32} color={Colors[theme].accent} />
            <ThemedText style={styles.buttonText}>Gerenciar Técnicas</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.managementButton, { backgroundColor: Colors[theme].card }]}
            onPress={() => navigateToScreen('gerenciar-treinos')}
          >
            <IconSymbol name="figure.martial.arts" size={32} color={Colors[theme].accent} />
            <ThemedText style={styles.buttonText}>Gerenciar Treinos</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.managementButton, { backgroundColor: Colors[theme].card }]}
            onPress={() => navigateToScreen('gerenciar-check-in')}
          >
            <IconSymbol name="person.2.fill" size={32} color={Colors[theme].accent} />
            <ThemedText style={styles.buttonText}>Gerenciar Check-in</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.managementButton, { backgroundColor: Colors[theme].card }]}
            onPress={() => navigateToScreen('gerenciar-alunos')}
          >
            <IconSymbol name="person.3.fill" size={32} color={Colors[theme].accent} />
            <ThemedText style={styles.buttonText}>Gerenciar Alunos</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Atividade recente */}
        <ThemedText style={styles.sectionTitle}>Atividade Recente</ThemedText>
        <View style={styles.activityContainer}>
          {[1, 2, 3, 4, 5].map((item) => (
            <View 
              key={item} 
              style={[styles.activityItem, { backgroundColor: Colors[theme].card }]}
            >
              <View style={styles.activityIconContainer}>
                <IconSymbol 
                  name={item % 2 === 0 ? "person.fill.badge.plus" : "video.fill.badge.plus"} 
                  size={20} 
                  color={Colors[theme].accent} 
                />
              </View>
              <View style={styles.activityContent}>
                <ThemedText style={styles.activityTitle}>
                  {item % 2 === 0 ? "Novo aluno cadastrado" : "Nova técnica adicionada"}
                </ThemedText>
                <ThemedText style={styles.activityTime}>Há {item * 2} horas</ThemedText>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  profileButton: {
    padding: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '30%',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  managementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  managementButton: {
    width: '48%',
    aspectRatio: 1.5,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  activityContainer: {
    marginBottom: 24,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(230, 57, 70, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  activityTime: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
  },
});