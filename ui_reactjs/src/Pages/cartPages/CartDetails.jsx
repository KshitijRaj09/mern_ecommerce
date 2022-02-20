import React from 'react';
import { useSelector } from 'react-redux';
import { CartCard, CheckoutCart, MainCartPage } from '../../styledComponents/cartDetails.style';
import { StyledButton } from '../../styledComponents/styledButton.style';
import SingleCartDetails from './SingleCartDetails';

const CartDetails = () => {

    const { items, loading } = useSelector(state => state.itemReducer);

    const renderItems = () => items.map(singleCart => <SingleCartDetails cartDetails={singleCart}
        key={singleCart._id} />)

    return (
        <MainCartPage>
            <CartCard>
                {renderItems()}
            </CartCard>
            <Checkout />
        </MainCartPage>)
}

export const Checkout = () => {
    return (
        <CheckoutCart>
            <h4>Total Items : {20} </h4>
            <h4>Total Price : ₹ {2000}</h4>
            <StyledButton width="140px">Checkout</StyledButton>
        </CheckoutCart>
    )
}

export default CartDetails;