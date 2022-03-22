export const quantityOfCart = (state, item) => {
  const { cart } = state.cartReducer;
  const cartItem = cart?.items?.find(
    (itemCart) => itemCart.productId === item._id
  );
  return cartItem?.quantity;
};
