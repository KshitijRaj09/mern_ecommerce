import React from 'react';
import { useCartUpdate } from '../hooks/useCartUpdate';
import {
    CartOptions,
    SingleCartItem,
} from '../styledComponents/cartDetails.style';
import { CartUpdateButton, StyledButton } from '../styledComponents/styledButton.style';
import { CartCount, ProductPrice } from '../styledComponents/styledProductCart.style';

const SingleCartDetails = ({ cartDetails }) => {
    const { cartAdded: cartUpdate, setCartAdded: setCartUpdate,
        updateCartHandler, totalCartItems
    } = useCartUpdate();
    return (
        <SingleCartItem>
            <CartOptions direction='row' flexGrow="2" width="30px" height="100px">
                <img src={cartDetails.imageURL} alt={cartDetails.productName} />
                <CartOptions flexGrow='0' width="100px">
                    <ProductPrice fontSize='14px'>{cartDetails.productName}</ProductPrice>
                    <ProductPrice fontSize='14px'>
                        ₹ {cartDetails.price}
                        {console.log('productName: ', cartDetails.productName)}
                    </ProductPrice>
                </CartOptions>
            </CartOptions>
            <CartOptions flexGrow="1.5" width="30px" direction="column">
                <CartOptions direction="row" width="30px" height="40px">
                    <p
                        name='increment'
                        onClick={(event) => updateCartHandler(event, cartDetails._id)}
                    >
                        +
                    </p>
                    <p>{cartUpdate[cartDetails._id]}</p>
                    <p
                        name='decrement'
                        onClick={(event) => updateCartHandler(event, cartDetails._id)}
                    >
                        -
                    </p>
                </CartOptions>
                <ProductPrice fontSize='14px'>
                    ₹ {cartDetails.price}
                </ProductPrice>
            </CartOptions>
            <CartOptions flexGrow="0.5">
                <button>Remove</button>
            </CartOptions>
        </SingleCartItem>
    );
};

export default SingleCartDetails;
