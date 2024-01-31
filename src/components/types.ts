
export type Product = {
  id: string;
  productName: string;
  url: string;
  price: number;
};

export type CartItems = {
  product: Product; 
  quantity: number;
}[];

export type Cart = {
  cartItems: CartItems;
}