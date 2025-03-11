import { StateProvider } from '@/store/StateContext';
import { Stack } from 'expo-router';

export default function RootLayout() {

  return (
    <StateProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </StateProvider>
  );
}
