import React, { useState } from 'react';
import {
    CartCount, MainProductCard, ProductDetails,
    ProductImageCard, ProductOptions,
    ProductPrice
} from '../../styledComponents/styledProductCart.style';
import { CartUpdateButton } from '../../styledComponents/styledButton.style';
import { addToCart } from '../../redux/actions/cartAction';
import { useCartUpdate } from '../../hooks/useCartUpdate';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const ItemPage = ({ item }) => {
    let cartInLocalStorage = JSON.parse(localStorage.getItem('cartAdded')) || null;

    cartInLocalStorage ? cartInLocalStorage = cartInLocalStorage[item._id] : cartInLocalStorage = null;

    const [cartUpdate, setCartUpdate] = useState(cartInLocalStorage);

    const { user } = useSelector(state => state.authReducer);

    const dispatch = useDispatch();

    const addCartHandler = (productId) => {
        setCartUpdate(1);
    }

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
            dispatch(addToCart(item._id, cartUpdate, user?.id, item.productName, item.price));
    }, [cartUpdate])

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
                    <ProductPrice>
                        ₹ {item.price}
                    </ProductPrice>
                    <ProductOptions>
                        {cartUpdate ?
                            <>
                                <CartUpdateButton name='increment' onClick={(event) => updateCartHandler(event, item._id)}>+</CartUpdateButton>
                                <CartCount>{cartUpdate}</CartCount>
                                <CartUpdateButton name='decrement' onClick={(event) => updateCartHandler(event, item._id)}>-</CartUpdateButton>
                            </>
                            :
                            <button onClick={() => addCartHandler(item._id)}>AddtoCart</button>}
                        <button>Favourite</button>
                    </ProductOptions>
                </div>
            </ProductDetails>
        </MainProductCard>
    )
}

export default ItemPage;