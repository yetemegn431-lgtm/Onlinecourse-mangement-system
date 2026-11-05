import { Stack } from 'expo-router';
import React from 'react';
import { BookmarkProvider } from './BookmarkContext';

export default function RootLayout() {
  return (
    <BookmarkProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="details" options={{ presentation: 'modal' }} />
        <Stack.Screen name="reader" />
      </Stack>
    </BookmarkProvider>
  );
}