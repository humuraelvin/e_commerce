import { CustomDrawerContent } from '@/components/custom-drawer';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { CartProvider } from '@/hooks/use-cart';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Add Reanimated's babel plugin to babel.config.js:
// plugins: ['react-native-reanimated/plugin']

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CartProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
              headerStyle: {
                backgroundColor: Colors[colorScheme ?? 'light'].background,
              },
              headerTintColor: Colors[colorScheme ?? 'light'].text,
              drawerStyle: {
                backgroundColor: Colors[colorScheme ?? 'light'].background,
              },
              drawerActiveTintColor: Colors[colorScheme ?? 'light'].tint,
              drawerInactiveTintColor: Colors[colorScheme ?? 'light'].text,
            }}>
            <Drawer.Screen
              name="(tabs)"
              options={{
                title: 'Home',
                drawerIcon: ({ color }) => <IconSymbol name="house.fill" size={24} color={color} />,
                headerShown: false,
              }}
            />
            <Drawer.Screen
              name="product/[id]"
              options={{
                title: 'Product Details',
                drawerItemStyle: { display: 'none' },
              }}
            />
          </Drawer>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        </ThemeProvider>
      </CartProvider>
    </GestureHandlerRootView>
  );
}