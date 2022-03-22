import React, { useEffect, useState } from 'react';
import { ProductGrid } from '../../styledComponents/styledProductCart.style';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../redux/actions/itemsAction';
import { Loader } from '../../styledComponents/Loader.style';
import ItemPage from './ItemPage';
import PageNotFound from '../PageNotFound';

const ProductPage = () => {
  const { items, loading } = useSelector((state) => state.itemReducer);
  const error = useSelector((state) => state.errorReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, []);

  const renderItems = () => {
    return items.map((item) => <ItemPage item={item} key={item._id} />);
  };

  return (
    <>
      {error?.status === 404 ? (
        <PageNotFound text='Product Not Found' />
      ) : loading ? (
        <Loader />
      ) : (
        <ProductGrid>{renderItems()}</ProductGrid>
      )}
    </>
  );
};

export default ProductPage;
