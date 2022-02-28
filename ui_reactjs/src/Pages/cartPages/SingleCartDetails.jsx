import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCartUpdate } from '../../hooks/useCartUpdate';
import { addToCart } from '../../redux/actions/cartAction';
import {
    CartDescription,
    CartOptions,
    SingleCartItem,
} from '../../styledComponents/cartDetails.style';
import { CartUpdateButton, StyledButton } from '../../styledComponents/styledButton.style';
import { CartCount, ProductImageCard, ProductPrice } from '../../styledComponents/styledProductCart.style';

const SingleCartDetails = ({ cartDetails }) => {

    const { productName, price, quantity, productId, imageURL, category } = cartDetails;

    const [cartUpdate, setCartUpdate] = useState(null);
    const { user } = useSelector(state => state.authReducer);

    const dispatch = useDispatch();

    const updateCartHandler = ({ target }) => {
        if (target.name === 'increment') {
            setCartUpdate(cartUpdate => cartUpdate + 1)
        }
        else if (target.name === 'decrement') {
            setCartUpdate(cartUpdate => cartUpdate - 1)
        }
    }

    useEffect(() => {
        if (cartUpdate !== null)
            dispatch(addToCart(productId, cartUpdate, user?.id, productName, price));
    }, [cartUpdate])

    return (
        <SingleCartItem>
            <ProductImageCard height="80px" width="150px" padding="5px">
                <img src={imageURL} alt={productName} />
            </ProductImageCard>
            <CartDescription width="100px" >
                <span>{productName}</span>
                <span>
                    {category}
                </span>
            </CartDescription>
            <CartDescription direction="row" width="120px" gap="0 10px" height="80px" align="center">
                <CartUpdateButton name='decrement' onClick={(event) => updateCartHandler(event.target)}>-</CartUpdateButton>
                <CartCount>{quantity}</CartCount>
                <CartUpdateButton name='increment' onClick={(event) => updateCartHandler(event.target)}>+</CartUpdateButton>
            </CartDescription>
            <CartDescription align="center" direction="row" width="100px">
                <ProductPrice>
                    ₹ {price}
                </ProductPrice>
            </CartDescription>
        </SingleCartItem>
    );
};

export default SingleCartDetails;
