export const favouriteLoadFromLocalStorage = () =>
  JSON.parse(localStorage.getItem('favouriteAdded')) || {};

export const favouriteSetToLocalStorage = (
  favouriteInLocalStorage,
  id,
  item
) => {
  localStorage.setItem(
    'favouriteAdded',
    JSON.stringify({ ...favouriteInLocalStorage, [id]: item })
  );
};
