import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function IndexScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1515168833906-d2a3b82b1e1e?auto=format&fit=crop&w=800&q=80' }}
        style={styles.hero}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to ShopX</Text>
        <Text style={styles.subtitle}>Discover amazing products, exclusive deals, and seamless shopping.</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/home')}>
          <Text style={styles.buttonText}>Start Shopping</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  hero: {
    position: 'absolute',
    width: width,
    height: 350,
    top: 0,
    left: 0,
  },
  overlay: {
    position: 'absolute',
    width: width,
    height: 350,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  content: {
    marginTop: 200,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 6,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 32,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  button: {
    backgroundColor: '#ff6f61',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 30,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
