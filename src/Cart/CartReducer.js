
export const initialState = {
  cartItems: [],
};

export const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };

    case "DECREASE_QUANTITY":
      const itemToDecrease = state.cartItems.find(
        (item) => item.id === action.payload
      );

      if (itemToDecrease.quantity === 1) {
        return {
          ...state,
          cartItems: state.cartItems.filter(
            (item) => item.id !== action.payload
          ),
        };
      }

      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        ),
      };

    case "INCREASE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        ),
      };
    case "CLEAR_CART":
      return { ...state, cartItems: [] };

    default:
      return state;
  }
};
