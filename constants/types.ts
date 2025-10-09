export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: number;
  delivery: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type RootStackParamList = {
  Home: undefined;
  Products: undefined;
  Cart: undefined;
  ProductDetail: { product: Product };
};
