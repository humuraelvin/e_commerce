import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { products } from '@/constants/products';
import { Product } from '@/constants/types';
import { useCart } from '@/hooks/use-cart';
import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native';

export default function ProductsScreen() {
  const { addToCart } = useCart();

  const handleAddToCart = (item: Product) => {
    console.log('Added to cart:', item);
    addToCart(item);
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: item.image || 'https://via.placeholder.com/200x200' }} 
          style={styles.productImage}
          resizeMode="cover"
          defaultSource={require('@/assets/images/favicon.png')}
        />
      </View>
      <View style={styles.detailsContainer}>
        <ThemedText style={styles.name}>{item.name}</ThemedText>
        <ThemedText style={styles.price}>${item.price.toFixed(2)}</ThemedText>
        <ThemedText style={styles.delivery}>{item.delivery}</ThemedText>
        <Pressable 
          style={styles.addButton} 
          onPress={() => handleAddToCart(item)}
        >
          <ThemedText style={styles.buttonText}>Add to Cart</ThemedText>
        </Pressable>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  listContainer: {
    padding: 12,
    paddingBottom: 80, // Account for tab bar
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 16,
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 4,
  },
  delivery: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});