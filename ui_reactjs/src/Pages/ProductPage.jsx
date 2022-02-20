import React, { useEffect, useState } from 'react';
import { ProductGrid } from "../styledComponents/styledProductCart.style";
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from "../redux/actions/itemsAction";
import { Loader } from '../styledComponents/Loader.style';
import ItemPage from "./ItemPage";
import getBrowserPushSettings from '../hooks/browserPushCustom';



const ProductPage = () => {
    const { items, loading } = useSelector(state => state.itemReducer);
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.authReducer);

    const [notificationPermission, setNotificationPermission] = useState('default');
    const { isPushAllowed, isSafari, permissionState } = getBrowserPushSettings(notificationPermission);

    useEffect(() => {
        dispatch(getItems());
        console.log('inside useffect productpage');
    }, []);


    const renderItems = () => {
        return items.map(item => <ItemPage item={item} key={item._id} />)
    }

    const handleAllowBtnClick = async () => {
        // const allowNotificationsLink = getLink();
        // window.location = allowNotificationsLink;

        const x = await Notification.requestPermission();
        console.log('inside handleallow click', x);
        setNotificationPermission(x);
    };

    return (
        <>
            {/* {loading ?
                <Loader /> :
                (<ProductGrid>
                    {renderItems()}
                    {console.log("visibility 1", document.visibilityState)}
                </ProductGrid>)
            } */}
            <button onClick={handleAllowBtnClick}>Open</button>
        </>
    )
}

export default ProductPage;