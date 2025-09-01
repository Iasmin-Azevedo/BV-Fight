import { Stack } from 'expo-router';
import React from 'react';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function AdminLayout() {
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
        name="dashboard"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="gerenciar-tecnicas"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="gerenciar-treinos"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="gerenciar-atletas"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="gerenciar-alunos"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}