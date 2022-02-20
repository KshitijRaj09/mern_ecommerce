import React from 'react';
import { useSelector } from 'react-redux';
import { CartCard, CheckoutCart, MainCartPage } from '../styledComponents/cartDetails.style';
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
            Inside checkout details
        </CheckoutCart>
    )
}

export default CartDetails;