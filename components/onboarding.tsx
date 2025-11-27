import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const slides = [
  {
    key: 'slide1',
    title: 'Welcome to E-Commerce!',
    text: 'Shop the best products at the best prices.',
    image: require('../assets/images/react-logo.png'),
  },
  {
    key: 'slide2',
    title: 'Fast Delivery',
    text: 'Get your orders delivered quickly and safely.',
    image: require('../assets/images/partial-react-logo.png'),
  },
  {
    key: 'slide3',
    title: 'Easy Payments',
    text: 'Multiple payment options for your convenience.',
    image: require('../assets/images/splash-icon.png'),
  },
];

export default function Onboarding({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0);

  const next = () => {
    if (index < slides.length - 1) setIndex(index + 1);
    else onDone();
  };

  return (
    <View style={styles.container}>
      <Image source={slides[index].image} style={styles.image} />
      <Text style={styles.title}>{slides[index].title}</Text>
      <Text style={styles.text}>{slides[index].text}</Text>
      <TouchableOpacity style={styles.button} onPress={next}>
        <Text style={styles.buttonText}>{index === slides.length - 1 ? 'Get Started' : 'Next'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 32,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
