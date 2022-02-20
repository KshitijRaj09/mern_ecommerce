import React, { useState } from 'react';
import {
    CartCount, MainProductCard, ProductDetails,
    ProductImageCard, ProductOptions,
    ProductPrice
} from '../../styledComponents/styledProductCart.style';
import { CartUpdateButton } from '../../styledComponents/styledButton.style';
import { addToCart } from '../../redux/actions/cartAction';
import { useCartUpdate } from '../../hooks/useCartUpdate';


const ItemPage = ({ item }) => {

    const addCartHandler = (productId) => {
        setCartUpdate({ ...cartUpdate, [productId]: 1 });
    }

    const { cartAdded: cartUpdate, setCartAdded: setCartUpdate,
        updateCartHandler, totalCartItems
    } = useCartUpdate();
    return (
        <MainProductCard>
            {console.log({ totalCartItems })}
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
                        {(cartUpdate[item._id]) ?
                            <>
                                <CartUpdateButton name='increment' onClick={(event) => updateCartHandler(event, item._id)}>+</CartUpdateButton>
                                <CartCount>{cartUpdate[item._id]}</CartCount>
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