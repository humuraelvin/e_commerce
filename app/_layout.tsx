import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { CartProvider } from '@/hooks/use-cart';
import { AuthProtection } from '../components/auth-protection';
import { AuthProvider, useAuth } from '../contexts/auth';

// ========================
// Custom Drawer Component
// ========================
function CustomDrawerContent(props: DrawerContentComponentProps) {
  const colorScheme = useColorScheme();
  const { signOut } = useAuth();
  const isDark = colorScheme === 'dark';

  // Define the main navigation routes
  const mainRoutes = [
    { name: '(tabs)/home', label: 'Home', icon: 'house' as const },
    { name: '(tabs)/products', label: 'Products', icon: 'bag' as const },
    { name: '(tabs)/cart', label: 'Cart', icon: 'cart' as const },
    { name: '(tabs)/profile', label: 'Profile', icon: 'person.circle' as const },
    { name: '(tabs)/settings', label: 'Settings', icon: 'gearshape' as const },
  ];

  return (
    <View style={[styles.drawerContainer, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: isDark ? '#333' : '#eee' }]}>
        <Text style={[styles.headerText, { color: Colors[colorScheme ?? 'light'].text }]}>
          E-Commerce App
        </Text>
      </View>

      {/* Drawer Content */}
      <DrawerContentScrollView {...props} style={styles.scrollView}>
        <View>
          {mainRoutes.map((route) => {
            const isFocused = props.state.routeNames[props.state.index] === route.name;
            return (
              <DrawerItem
                key={route.name}
                label={route.label}
                focused={isFocused}
                onPress={() => props.navigation.navigate(route.name)}
                icon={({ size, color }) => (
                  <IconSymbol name={route.icon} size={size} color={color} />
                )}
                activeTintColor={Colors[colorScheme ?? 'light'].tint}
                inactiveTintColor={Colors[colorScheme ?? 'light'].text}
                style={styles.drawerItem}
              />
            );
          })}
        </View>
      </DrawerContentScrollView>

      {/* Footer - Logout */}
      <View style={[styles.footer, { borderTopColor: isDark ? '#333' : '#eee' }]}>
        <Pressable style={styles.logoutButton} onPress={signOut}>
          <IconSymbol
            name="rectangle.portrait.and.arrow.right"
            size={24}
            color={Colors[colorScheme ?? 'light'].text}
          />
          <Text style={[styles.logoutText, { color: Colors[colorScheme ?? 'light'].text }]}>
            Logout
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

// ========================
// Styles
// ========================
const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  drawerItem: {
    marginHorizontal: 8,
    marginVertical: 4,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    gap: 12,
  },
  logoutText: {
    fontSize: 16,
  },
});

// ========================
// Root Layout
// ========================
export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <AuthProtection>
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
              }}
            >
              {/* Main Tabs */}
              <Drawer.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                  drawerItemStyle: { display: 'none' },
                }}
              />

              {/* Hidden Screens */}
              <Drawer.Screen
                name="login"
                options={{
                  headerShown: false,
                  drawerItemStyle: { display: 'none' },
                }}
              />
              <Drawer.Screen
                name="signup"
                options={{
                  headerShown: false,
                  drawerItemStyle: { display: 'none' },
                }}
              />
              <Drawer.Screen
                name="product/[id]"
                options={{
                  headerTitle: 'Product Details',
                  drawerItemStyle: { display: 'none' },
                }}
              />
            </Drawer>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          </ThemeProvider>
        </CartProvider>
      </AuthProtection>
    </AuthProvider>
  );
}
