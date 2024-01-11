//@ts-nocheck
export const cartReducer = (cart, action) => {
  if (action.type === "ADD") {
    const newCartItems = [...cart.cartItems];
    const itemIndex = newCartItems.findIndex(
      (cartItem) => cartItem.product.id === action.payload.product.id
    );
    if (itemIndex > -1) {
      return { ...cart };
    }
    newCartItems.push({ ...action.payload });
    return { ...cart, cartItems: newCartItems };
  }

  if (action.type === "INCREMENT") {
    const newCartItems = [...cart.cartItems];
    const itemIndex = newCartItems.findIndex(
      (cartItem) => cartItem.product.id === action.payload
    );
    if (itemIndex === -1) {
      return { ...cart };
    }
    const newItem = { ...newCartItems[itemIndex] };
    newItem.quantity++;
    newCartItems[itemIndex] = newItem;
    return { ...cart, cartItems: newCartItems };
  }

  if (action.type === "DECREMENT") {
    const newCartItems = [...cart.cartItems];
    const itemIndex = newCartItems.findIndex(
      (cartItem) => cartItem.product.id === action.payload
    );
    if (itemIndex === -1) {
      return { ...cart };
    }
    const newItem = { ...newCartItems[itemIndex] };
    newItem.quantity--;
    newCartItems[itemIndex] = newItem;
    if (newCartItems[itemIndex].quantity === 0) {
      newCartItems.splice(itemIndex, 1);
    }
    return { ...cart, cartItems: newCartItems };
  }

  if (action.type === "DELETE") {
    const newCartItems = [...cart.cartItems];
    const itemIndex = newCartItems.findIndex(
      (cartItem) => cartItem.product.id === action.payload
    );
    if (itemIndex === -1) {
      return { ...cart };
    }
    newCartItems.splice(itemIndex, 1);
    return { ...cart, cartItems: newCartItems };
  }

  if(action.type === "EMPTYCART") {
    return { ...cart, cartItems: [] }
  }

  if(action.type === "SAVEDCART") {
    return {...action.payload}
  }
};
