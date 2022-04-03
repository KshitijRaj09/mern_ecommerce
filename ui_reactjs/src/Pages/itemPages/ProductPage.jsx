import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProductGrid } from '../../styledComponents/styledProductCart.style';
import { useDispatch, useSelector } from 'react-redux';
import { getItems, getItemsOnScroll } from '../../redux/actions/itemsAction';
import { Loader, LoaderMore } from '../../styledComponents/Loader.style';
import ItemPage from './ItemPage';
import PageNotFound from '../PageNotFound';
import { SearchTermContext } from '../../App';

const options = {
  threshold: 1,
  rootMargin: '0px 0px -2% 0px',
};

let timerId = null;
const ProductPage = () => {
  const { items, loading, hasMoreData } = useSelector(
    (state) => state.itemReducer
  );
  const error = useSelector((state) => state.errorReducer);
  const dispatch = useDispatch();
  const endOfPage = useRef(null);
  const { searchTerm, pageNumber, setPageNumber } =
    useContext(SearchTermContext);

  const observerCallback = (enteries) => {
    const [firstEntry] = enteries;
    if (firstEntry.isIntersecting) setPageNumber((prevState) => prevState + 1);
  };

  const debouncedFetchProducts = () => {
    if (pageNumber === 0) {
      dispatch(getItems(searchTerm, pageNumber));
      return;
    }
    dispatch(getItemsOnScroll(searchTerm, pageNumber));
  };

  useEffect(() => {
    timerId = setTimeout(() => {
      debouncedFetchProducts();
    }, 1000);
    return () => clearTimeout(timerId);
  }, [pageNumber, searchTerm]);

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, options);
    if (endOfPage.current) observer.observe(endOfPage.current);
    if (!hasMoreData && endOfPage.current)
      observer.unobserve(endOfPage.current);
    return () => {
      if (endOfPage.current) return observer.unobserve(endOfPage.current);
    };
  }, [loading, hasMoreData]);

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
        <>
          <ProductGrid>{renderItems()}</ProductGrid>
          <p ref={endOfPage}></p>
          {hasMoreData ? (
            <LoaderMore />
          ) : (
            <p style={{ textAlign: 'center' }}>
              All products have been listed above
            </p>
          )}
        </>
      )}
    </>
  );
};

export default ProductPage;
