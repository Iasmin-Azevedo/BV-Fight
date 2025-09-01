import { Stack } from 'expo-router';
import React from 'react';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function AlunoLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme || 'light';

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors[theme].primary,
        },
        headerTintColor: Colors[theme].text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: Colors[theme].background,
        },
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="home"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="tecnicas"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="treinos"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="check-in"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="progresso"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="perfil"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
