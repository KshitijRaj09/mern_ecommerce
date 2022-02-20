import React, { useEffect, useState } from 'react';
import { ProductGrid } from "../../styledComponents/styledProductCart.style";
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from "../../redux/actions/itemsAction";
import { Loader } from '../../styledComponents/Loader.style';
import ItemPage from "./ItemPage";

const ProductPage = () => {
    const { items, loading } = useSelector(state => state.itemReducer);
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.authReducer);

    useEffect(() => {
        dispatch(getItems());
        console.log('inside useffect productpage');
    }, []);


    const renderItems = () => {
        return items.map(item => <ItemPage item={item} key={item._id} />)
    }

    return (
        <>
            {loading ?
                <Loader /> :
                (<ProductGrid>
                    {renderItems()}
                </ProductGrid>)
            }
        </>
    )
}

export default ProductPage;