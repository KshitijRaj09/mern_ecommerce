import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteCartItem } from '../../redux/actions/cartAction';
import {
  CartDescription,
  SingleCartItem,
} from '../../styledComponents/cartDetails.style';
import { CartUpdateButton } from '../../styledComponents/styledButton.style';
import {
  CartCount,
  ProductImageCard,
  ProductPrice,
} from '../../styledComponents/styledProductCart.style';
import { singleItemTotalPrice } from '../../util/util';

let timerId;
const SingleCartDetails = ({ cartDetails }) => {
  const { productName, price, quantity, productId, imageURL, category } =
    cartDetails;

  const [cartUpdate, setCartUpdate] = useState(quantity);
  const { user } = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();

  const updateCartHandler = ({ name }) => {
    if (timerId) {
      return;
    }
    timerId = setTimeout(() => {
      if (name === 'increment') {
        setCartUpdate((cartUpdate) => cartUpdate + 1);
      } else if (name === 'decrement' && cartUpdate > 1) {
        setCartUpdate((cartUpdate) => cartUpdate - 1);
      } else {
        dispatch(deleteCartItem(user.id, productId));
      }
      timerId = null;
    }, 500);
  };

  useEffect(() => {
    if (cartUpdate !== null)
      dispatch(addToCart(productId, cartUpdate, user?.id, productName, price));
  }, [cartUpdate]);

  return (
    <SingleCartItem>
      <ProductImageCard height='80px' width='150px' padding='5px'>
        <img src={imageURL} alt={productName} />
      </ProductImageCard>
      <CartDescription width='100px'>
        <span>{productName}</span>
        <span>{category}</span>
      </CartDescription>
      <CartDescription
        direction='row'
        width='120px'
        gap='0 10px'
        height='80px'
        align='center'
      >
        <CartUpdateButton
          name='decrement'
          onClick={(event) => updateCartHandler(event.target)}
        >
          -
        </CartUpdateButton>
        <CartCount>{quantity}</CartCount>
        <CartUpdateButton
          name='increment'
          onClick={(event) => updateCartHandler(event.target)}
        >
          +
        </CartUpdateButton>
      </CartDescription>
      <CartDescription align='center' direction='row' width='100px'>
        <ProductPrice>₹ {singleItemTotalPrice(price, quantity)}</ProductPrice>
      </CartDescription>
    </SingleCartItem>
  );
};

export default SingleCartDetails;
