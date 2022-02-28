import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoginModal from '../../components/authComponents/LoginModal';
import { CartCard, CheckoutCart, MainCartPage } from '../../styledComponents/cartDetails.style';
import { Message } from '../../styledComponents/modalBox.style';
import { StyledButton } from '../../styledComponents/styledButton.style';
import SingleCartDetails from './SingleCartDetails';
import { getCart, localStorageCartToDB } from '../../redux/actions/cartAction';

const CartDetails = () => {

    const { cart, loading } = useSelector(state => state.cartReducer);
    const { user } = useSelector(state => state.authReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user?.id) {
            dispatch(localStorageCartToDB(user?.id));
            console.log("hellooo")
            dispatch(getCart(user.id));
        }
    }, [user?.id])

    const renderItems = () => cart?.items.map(singleCart => <SingleCartDetails cartDetails={singleCart}
        key={singleCart.productId} />)


    return (
        <>
            {!user?.id ?
                <Message>
                    <h3>Please login to Continue</h3>
                    <span>
                        <LoginModal />
                    </span>

                </Message>
                :
                <>{!!cart ?
                    <MainCartPage>
                        <CartCard>
                            {renderItems()}
                        </CartCard>
                        <Checkout />
                    </MainCartPage> :
                    <Message>
                        <h3>Your Cart is Empty</h3>
                    </Message>
                }</>}
        </>)
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