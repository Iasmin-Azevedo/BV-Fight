import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme || 'light';
  const [userType, setUserType] = useState<'aluno' | 'admin'>('aluno');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    // Simulação de validação de login
    if (userType === 'admin') {
      if (email === 'admin@admin.com' && password === 'admin123') {
        router.replace('/(admin)/dashboard');
      } else {
        Alert.alert('Erro', 'Credenciais de administrador inválidas');
      }
    } else {
      if (email === 'aluno@aluno.com' && password === 'aluno123') {
        router.replace('/(aluno)/home');
      } else {
        Alert.alert('Erro', 'Credenciais de aluno inválidas');
      }
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Recuperar Senha', 'Funcionalidade em desenvolvimento');
  };

  const handleDemoLogin = () => {
    if (userType === 'admin') {
      setEmail('admin@admin.com');
      setPassword('admin123');
    } else {
      setEmail('aluno@aluno.com');
      setPassword('aluno123');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Logo e título */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={[styles.logo, { backgroundColor: Colors[theme].accent }]}>
                <IconSymbol name="figure.martial.arts" size={60} color="#FFFFFF" />
              </View>
            </View>
            <ThemedText style={styles.appTitle}>BV Fight Team</ThemedText>
            <ThemedText style={styles.appSubtitle}>Aprenda Jiu-Jitsu de forma digital</ThemedText>
          </View>

          {/* Seletor de tipo de usuário */}
          <View style={styles.userTypeContainer}>
            <TouchableOpacity 
              style={[
                styles.userTypeButton, 
                userType === 'aluno' && { backgroundColor: Colors[theme].accent }
              ]}
              onPress={() => setUserType('aluno')}
            >
              <IconSymbol 
                name="person.fill" 
                size={20} 
                color={userType === 'aluno' ? '#FFFFFF' : Colors[theme].text} 
              />
              <ThemedText 
                style={[
                  styles.userTypeText, 
                  userType === 'aluno' && { color: '#FFFFFF' }
                ]}
              >
                Aluno
              </ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.userTypeButton, 
                userType === 'admin' && { backgroundColor: Colors[theme].accent }
              ]}
              onPress={() => setUserType('admin')}
            >
              <IconSymbol 
                name="person.badge.key.fill" 
                size={20} 
                color={userType === 'admin' ? '#FFFFFF' : Colors[theme].text} 
              />
              <ThemedText 
                style={[
                  styles.userTypeText, 
                  userType === 'admin' && { color: '#FFFFFF' }
                ]}
              >
                Administrador
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* Formulário de login */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <IconSymbol name="envelope.fill" size={20} color={Colors[theme].icon} />
              <TextInput
                style={[styles.input, { color: Colors[theme].text }]}
                placeholder="Email"
                placeholderTextColor={Colors[theme].icon}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <IconSymbol name="lock.fill" size={20} color={Colors[theme].icon} />
              <TextInput
                style={[styles.input, { color: Colors[theme].text }]}
                placeholder="Senha"
                placeholderTextColor={Colors[theme].icon}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <IconSymbol 
                  name={showPassword ? "eye.slash.fill" : "eye.fill"} 
                  size={20} 
                  color={Colors[theme].icon} 
                />
              </TouchableOpacity>
            </View>

            {/* Botão de login */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <ThemedText style={styles.loginButtonText}>Entrar</ThemedText>
              <IconSymbol name="arrow.right" size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <ThemedText style={styles.loginButtonText}>Cadastrar</ThemedText>
              <IconSymbol name="arrow.right" size={20} color="#FFFFFF" />
            </TouchableOpacity>


            {/* Esqueci a senha */}
            <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
              <ThemedText style={styles.forgotPasswordText}>Esqueci minha senha</ThemedText>
            </TouchableOpacity>
          </View>



          
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  appSubtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
  userTypeContainer: {
    flexDirection: 'row',
    marginBottom: 32,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 12,
    padding: 4,
  },
  userTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  userTypeText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  formContainer: {
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 56,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: Colors.light.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  demoButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  demoButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  forgotPasswordButton: {
    alignItems: 'center',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: Colors.light.accent,
    textDecorationLine: 'underline',
  },
  demoInfoContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 12,
    padding: 16,
  },
  demoInfoTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  demoCredentials: {
    gap: 8,
  },
  credentialItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  credentialLabel: {
    fontSize: 12,
    fontWeight: '500',
    opacity: 0.7,
  },
  credentialValue: {
    fontSize: 12,
    fontFamily: 'monospace',
    opacity: 0.8,
  },
});