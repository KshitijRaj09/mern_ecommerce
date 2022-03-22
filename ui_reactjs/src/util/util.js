// File for Util functions

export const calculateTotalItems = (items = []) => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  //setCartCount(totalItems);
  return totalItems;
};
export const singleItemTotalPrice = (price = 0, quantity = 0) =>
  price * quantity;

export const fetchLocalStorageOrDB = (product, user, quantity = null) => {
  let fetchedCart;
  if (user) {
    fetchedCart = quantity || null;
  } else {
    let cartInLocalStorage =
      JSON.parse(localStorage.getItem('cartAdded')) || null;

    cartInLocalStorage
      ? (cartInLocalStorage = cartInLocalStorage[product._id])
      : (cartInLocalStorage = null);
    fetchedCart = cartInLocalStorage;
  }
  return fetchedCart;
};

export const checkForFavourite = (state, item) => {
  const { favourite } = state;
  let status = false;
  if (item._id in favourite) {
    status = true;
  }
  return status;
};
