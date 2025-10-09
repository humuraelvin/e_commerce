import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ThemedText } from './themed-text';

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const colorScheme = useColorScheme();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <ThemedText style={styles.title}>E-Commerce App</ThemedText>
      </View>
      <View style={[
        styles.drawerContent,
        { backgroundColor: Colors[colorScheme ?? 'light'].background }
      ]}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  drawerContent: {
    flex: 1,
  },
});