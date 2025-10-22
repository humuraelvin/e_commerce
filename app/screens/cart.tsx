import React from 'react';
import { StyleSheet, FlatList, View, Pressable, ViewStyle, TextStyle } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useCart } from '@/hooks/use-cart';
import { Product } from '@/constants/types';
import { useThemeColor } from '@/hooks/use-theme-color';
import { IconSymbol } from '@/components/ui/icon-symbol';

type Styles = {
  screen: ViewStyle;
  header: ViewStyle;
  title: TextStyle;
  clearButton: ViewStyle;
  clearButtonText: TextStyle;
  listContainer: ViewStyle;
  row: ViewStyle;
  itemInfo: ViewStyle;
  rowText: TextStyle;
  priceText: TextStyle;
  deleteButton: ViewStyle;
  emptyText: TextStyle;
  footer: ViewStyle;
  totalContainer: ViewStyle;
  totalLabel: TextStyle;
  totalAmount: TextStyle;
  checkoutButton: ViewStyle;
  checkoutButtonText: TextStyle;
};

export default function Cart() {
  const { items, removeFromCart, clearCart } = useCart();
  const primaryColor = useThemeColor({}, 'tint');

  const totalAmount = items.reduce((sum, item) => sum + item.price, 0);

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.row}>
      <View style={styles.itemInfo}>
        <ThemedText style={styles.rowText}>{item.name}</ThemedText>
        <ThemedText style={[styles.priceText, { color: primaryColor }]}>
          ${item.price.toFixed(2)}
        </ThemedText>
      </View>
      <Pressable style={styles.deleteButton} onPress={() => removeFromCart(item.id)}>
        <IconSymbol name="trash" size={20} color="#FF3B30" />
      </Pressable>
    </View>
  );

  return (
    <ThemedView style={styles.screen}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Shopping Cart</ThemedText>
        {items.length > 0 && (
          <Pressable style={styles.clearButton} onPress={clearCart}>
            <ThemedText style={styles.clearButtonText}>Clear All</ThemedText>
          </Pressable>
        )}
      </View>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        ListEmptyComponent={
          <ThemedText style={styles.emptyText}>Your cart is empty</ThemedText>
        }
        contentContainerStyle={styles.listContainer}
      />

      {items.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <ThemedText style={styles.totalLabel}>Total:</ThemedText>
            <ThemedText style={[styles.totalAmount, { color: primaryColor }]}>
              ${totalAmount.toFixed(2)}
            </ThemedText>
          </View>
          <Pressable style={[styles.checkoutButton, { backgroundColor: primaryColor }]}>
            <ThemedText style={styles.checkoutButtonText}>Checkout</ThemedText>
          </Pressable>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create<Styles>({
  screen: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  clearButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  clearButtonText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '600',
  },
  listContainer: {
    paddingVertical: 8,
    flexGrow: 1,
  },
  row: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
    marginRight: 12,
  },
  rowText: {
    fontSize: 16,
    marginBottom: 4,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '600',
  },
  deleteButton: {
    padding: 8,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 16,
    opacity: 0.6,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#ffffff',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  checkoutButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});
