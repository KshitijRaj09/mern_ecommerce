import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, setCartCount } from '../redux/actions/cartAction';


const cartFromLocalStorage = JSON.parse(localStorage.getItem('cartAdded2')) || {};
const useCartUpdate = () => {

   const [cartAdded, setCartAdded] = useState(cartFromLocalStorage);
   console.log('cartAdded', cartAdded, cartFromLocalStorage);
   const { user } = useSelector(state => state.authReducer);
   const userId = user?.id;

   const dispatch = useDispatch()

   useEffect(() => {
      localStorage.setItem('cartAdded2', JSON.stringify(cartAdded));
      console.log('cartAdded', cartAdded);
      if (userId) {

      }

   }, [cartAdded, userId])

   const updateCartHandler = ({ target }, productId) => {
      console.log(cartAdded, 'inside useCartUpdate cartAdded')
      let { [productId]: temp, ...rest } = cartAdded;
      if (target.name === 'increment') {
         temp++;
      }
      else if (target.name === 'decrement' && temp > 1) {
         temp--;
      }
      else {
         temp--;
         //dispatch(addToCart(productId, temp, user?.id));
         return setCartAdded(rest);
      }
      //dispatch(addToCart(productId, temp, user?.id));
      console.log("inside useCartUpdate cartAdded", cartAdded);
      setCartAdded({ ...cartAdded, [productId]: temp });
   }
   let totalCartItems = 0;
   for (let item in cartAdded) {
      totalCartItems = parseInt(totalCartItems, 10) + cartAdded[item];
   }
   //setTotalCartCount(totalCartItems);
   console.log('totalCartItems inside custom hook', totalCartItems)
   //dispatch(setCartCount(totalCartItems));

   return { cartAdded, setCartAdded, updateCartHandler, totalCartItems };
}

export { useCartUpdate };