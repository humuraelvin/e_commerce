import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { CartProvider } from '@/hooks/use-cart';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { AuthProvider } from '../contexts/auth';
import { AuthProtection } from '../components/auth-protection';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <AuthProtection>
        <CartProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Tabs
              screenOptions={{
                headerStyle: {
                  backgroundColor: Colors[colorScheme ?? 'light'].background,
                },
                headerTintColor: Colors[colorScheme ?? 'light'].text,
                tabBarStyle: {
                  backgroundColor: Colors[colorScheme ?? 'light'].background,
                },
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].text,
              }}>
              <Tabs.Screen
                name="(tabs)/home"
                options={{
                  title: 'Home',
                  tabBarIcon: ({ color, size }) => (
                    <IconSymbol name="house.fill" size={size} color={color} />
                  ),
                }}
              />
              <Tabs.Screen
                name="(tabs)/products"
                options={{
                  title: 'Products',
                  tabBarIcon: ({ color, size }) => (
                    <IconSymbol name="list.bullet" size={size} color={color} />
                  ),
                }}
              />
              <Tabs.Screen
                name="(tabs)/cart"
                options={{
                  title: 'Cart',
                  tabBarIcon: ({ color, size }) => (
                    <IconSymbol name="cart.fill" size={size} color={color} />
                  ),
                }}
              />
              <Tabs.Screen
                name="(tabs)/profile"
                options={{
                  title: 'Profile',
                  tabBarIcon: ({ color, size }) => (
                    <IconSymbol name="person.fill" size={size} color={color} />
                  ),
                }}
              />
              <Tabs.Screen
                name="(tabs)/settings"
                options={{
                  title: 'Settings',
                  tabBarIcon: ({ color, size }) => (
                    <IconSymbol name="gear" size={size} color={color} />
                  ),
                }}
              />
              <Tabs.Screen
                name="(auth)"
                options={{
                  href: null, // This makes the auth screens not show up in the tab bar
                }}
              />
              <Tabs.Screen
                name="product/[id]"
                options={{
                  href: null, // This makes the product detail screen not show up in the tab bar
                  headerShown: true,
                  title: 'Product Details',
                }}
              />
            </Tabs>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          </ThemeProvider>
        </CartProvider>
      </AuthProtection>
    </AuthProvider>
  );