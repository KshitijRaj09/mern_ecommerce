import styled from "styled-components";

export const MainCartPage = styled.div`
    display : flex;
    justify-content: space-evenly;
    padding: 10px;
    align-items: start;
    background-color: brown;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    gap: 15px;
    text-transform: capitalize;
`

export const CartCard = styled.div`
    display : flex;
    flex-direction: column;
    padding: 5px;
    background-color: aqua;
    width:max(40vw, 300px);
`

export const SingleCartItem = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    & img{
        width: 100%;
        height: 100%;
        padding: 5px;
    }   
`

export const CartOptions = styled.div`
    display: flex;
    flex-direction: ${props => props.direction || 'column'};
    flex-grow: ${props => props.flexGrow || 1};
    width: ${props => props.width || '50px'};
    height: ${props => props.height || '70px'};
    padding: 3px;
    justify-content: end;
`

export const CheckoutCart = styled.div`
    display : inherit;
    justify-content: space-around;
    flex-direction: column;
    
    width:max(20vw, 300px);
    height: 100px;
    background-color: blue;
    /* &:nth-child(1){
        display: inherit;
        flex-direction: row;
        justify-content: space-evenly;
    }
    &:nth-child(2){
        display: inherit;
        justify-content: center;
    } */
`

