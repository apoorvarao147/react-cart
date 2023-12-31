//@ts-nocheck
export const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const newCartItems = [...state.cartItems];
    const itemIndex = newCartItems.findIndex(
      (cartItem) => cartItem.product.id === action.payload.product.id
    );
    if (itemIndex > -1) {
      return { ...state };
    }
    newCartItems.push({ ...action.payload });
    return { ...state, cartItems: newCartItems };
  }

  if (action.type === "INCREMENT") {
    const newCartItems = [...state.cartItems];
    const itemIndex = newCartItems.findIndex(
      (cartItem) => cartItem.product.id === action.payload
    );
    if (itemIndex === -1) {
      return { ...state };
    }
    const newItem = { ...newCartItems[itemIndex] };
    newItem.quantity++;
    newCartItems[itemIndex] = newItem;
    return { ...state, cartItems: newCartItems };
  }

  if (action.type === "DECREMENT") {
    const newCartItems = [...state.cartItems];
    const itemIndex = newCartItems.findIndex(
      (cartItem) => cartItem.product.id === action.payload
    );
    if (itemIndex === -1) {
      return { ...state };
    }
    const newItem = { ...newCartItems[itemIndex] };
    newItem.quantity--;
    newCartItems[itemIndex] = newItem;
    if (newCartItems[itemIndex].quantity === 0) {
      newCartItems.splice(itemIndex, 1);
    }
    return { ...state, cartItems: newCartItems };
  }

  if (action.type === "DELETE") {
    const newCartItems = [...state.cartItems];
    const itemIndex = newCartItems.findIndex(
      (cartItem) => cartItem.product.id === action.payload
    );
    if (itemIndex === -1) {
      return { ...state }
    }
    newCartItems.splice(itemIndex, 1)
    return { ...state, cartItems: newCartItems }
  }
};