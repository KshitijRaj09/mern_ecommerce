import React from 'react';
import { useCartUpdate } from '../../hooks/useCartUpdate';
import {
    CartDescription,
    CartOptions,
    SingleCartItem,
} from '../../styledComponents/cartDetails.style';
import { CartUpdateButton, StyledButton } from '../../styledComponents/styledButton.style';
import { CartCount, ProductImageCard, ProductPrice } from '../../styledComponents/styledProductCart.style';

const SingleCartDetails = ({ cartDetails }) => {
    const { cartAdded: cartUpdate, setCartAdded: setCartUpdate,
        updateCartHandler, totalCartItems
    } = useCartUpdate();
    return (
        <SingleCartItem>
            <ProductImageCard height="80px" width="150px" padding="5px">
                <img src={cartDetails.imageURL} alt={cartDetails.productName} />
            </ProductImageCard>
            <CartDescription width="100px" >
                <span>{cartDetails.productName}</span>
                <span>
                    {cartDetails.category}
                </span>
            </CartDescription>
            <CartDescription direction="row" width="120px" gap="0 10px" height="80px" align="center">
                <CartUpdateButton name='decrement' onClick={(event) => updateCartHandler(event.target)}>-</CartUpdateButton>
                <CartCount>{cartUpdate[cartDetails._id]}</CartCount>
                <CartUpdateButton name='increment' onClick={(event) => updateCartHandler(event.target)}>+</CartUpdateButton>
            </CartDescription>
            <CartDescription align="center" direction="row" width="100px">
                <ProductPrice>
                    ₹ {cartDetails.price}
                </ProductPrice>
            </CartDescription>
        </SingleCartItem>
    );
};

export default SingleCartDetails;
