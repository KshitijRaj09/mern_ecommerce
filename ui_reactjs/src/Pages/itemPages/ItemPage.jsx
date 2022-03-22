import React, { useState } from 'react';
import {
  CartCount,
  MainProductCard,
  ProductDetails,
  ProductImageCard,
  ProductOptions,
  ProductPrice,
} from '../../styledComponents/styledProductCart.style';
import {
  CartUpdateButton,
  AddToCartButton,
} from '../../styledComponents/styledButton.style';
import { addToCart, deleteCartItem } from '../../redux/actions/cartAction';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkForFavourite, fetchLocalStorageOrDB } from '../../util/util';
import { quantityOfCart } from '../../redux/selectors/cartSelector';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  addToFavourite,
  removeFromFavourite,
} from '../../redux/actions/favouriteAction';

const ItemPage = ({ item }) => {
  const itemQuatity = useSelector((state) => quantityOfCart(state, item));

  const { user } = useSelector((state) => state.authReducer);

  const [cartUpdate, setCartUpdate] = useState(
    fetchLocalStorageOrDB(item, user?.id, itemQuatity)
  );

  const status = useSelector((state) =>
    checkForFavourite(state.favouriteReducer, item)
  );

  const dispatch = useDispatch();

  const addCartHandler = () => {
    setCartUpdate(1);
  };

  const updateCartHandler = ({ target }) => {
    if (target.name === 'increment') {
      setCartUpdate((cartUpdate) => cartUpdate + 1);
    } else if (target.name === 'decrement' && cartUpdate <= 1 && user?.id) {
      setCartUpdate((cartUpdate) => cartUpdate - 1);
      dispatch(deleteCartItem(user.id, item._id));
    } else {
      setCartUpdate((cartUpdate) => cartUpdate - 1);
    }
  };

  const favouriteHandler = (name) => {
    if (name === 'addFavourite') dispatch(addToFavourite(item));
    else {
      dispatch(removeFromFavourite(item._id));
    }
  };

  useEffect(() => {
    if (cartUpdate !== null)
      dispatch(
        addToCart(item._id, cartUpdate, user?.id, item.productName, item.price)
      );
  }, [cartUpdate]);

  return (
    <MainProductCard>
      <ProductImageCard>
        <img src={item.imageURL} alt={item.productName} />
      </ProductImageCard>
      <ProductDetails>
        <h5>{item.category}</h5>
        <h4>{item.productName}</h4>
        <p>{item.description}</p>
        <div>
          <ProductPrice>₹ {item.price}</ProductPrice>
          <ProductOptions>
            {cartUpdate ? (
              <>
                <CartUpdateButton
                  name='decrement'
                  onClick={(event) => updateCartHandler(event, item._id)}
                >
                  -
                </CartUpdateButton>
                <CartCount>{cartUpdate}</CartCount>
                <CartUpdateButton
                  name='increment'
                  onClick={(event) => updateCartHandler(event, item._id)}
                >
                  +
                </CartUpdateButton>
              </>
            ) : (
              <AddToCartButton onClick={() => addCartHandler(item._id)}>
                AddtoCart
              </AddToCartButton>
            )}
            {status ? (
              <FavoriteIcon
                sx={{ cursor: 'pointer', color: 'tomato' }}
                name='removeFavourite'
                onClick={() => favouriteHandler('removeFavourite')}
              />
            ) : (
              <FavoriteBorderIcon
                sx={{ cursor: 'pointer', color: 'tomato' }}
                name='addFavourite'
                onClick={() => favouriteHandler('addFavourite')}
              />
            )}
          </ProductOptions>
        </div>
      </ProductDetails>
    </MainProductCard>
  );
};

export default ItemPage;
