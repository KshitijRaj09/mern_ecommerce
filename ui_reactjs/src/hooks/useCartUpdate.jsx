import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, setCartCount } from '../redux/actions/cartAction';

const cartFromLocalStorage = JSON.parse(localStorage.getItem('cartAdded')) || {};

const useCartUpdate = () =>{
   const [cartAdded, setCartAdded] = useState(cartFromLocalStorage);
   const {user} = useSelector(state=>state.authReducer);
   const userId = user?.id;

   const dispatch = useDispatch()

   useEffect(()=>{
      localStorage.setItem('cartAdded', JSON.stringify(cartAdded));
      if(userId){
         console.log('Inside usecartupdate useEffect');
      }
      console.log("Inside useEffect", userId);
 },[cartAdded, userId])

 const updateCartHandler = ({target}, productId) => {
   let {[productId]: temp, ...rest} = cartAdded;
   if(target.name==='increment'){
       temp++;
   }
   else if(target.name==='decrement' && temp > 1){
       temp--;
   }
   else{
       temp--;
       //dispatch(addToCart(productId, temp, user?.id));
       return setCartAdded(rest);
   }
   //dispatch(addToCart(productId, temp, user?.id));
   setCartAdded({...cartAdded, [productId]: temp});
}
   let totalCartItems = 0;
   for(let item in cartAdded){
      totalCartItems = parseInt(totalCartItems, 10) + cartAdded[item];
   }
   dispatch(setCartCount(totalCartItems));

   return {cartAdded, setCartAdded, updateCartHandler, totalCartItems};
}

export {useCartUpdate};