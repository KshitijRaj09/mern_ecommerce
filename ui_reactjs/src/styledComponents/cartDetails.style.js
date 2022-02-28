import styled from "styled-components";

export const MainCartPage = styled.div`
    display : flex;
    justify-content: space-evenly;
    padding: 20px 10px;
    align-items: start;
    width: max(100%, 340px);
    min-height: 100vh;
    flex-wrap: wrap;
    gap: 15px;
    text-transform: capitalize;
`

export const CartCard = styled.div`
    display : flex;
    flex-direction: column;
    padding: 5px;
    width:max(40vw, 340px);
    border-radius: 20px;
    box-shadow : 0 0 10px 2px;
`

export const SingleCartItem = styled.div`
    display: flex;
    padding: 20px;
    height: 120px;
    gap: 0px 10px;
    border-bottom: 1px solid #406882;
    @media (max-width: 800px){
    height: auto;
    flex-wrap: wrap;
    justify-content: center;
    }
`

export const CartDescription = styled.div`
    width : ${props => props.width || '120px'};
    height : ${props => props.height};
    display : flex;
    flex-direction: ${props => props.direction || 'column'};
    gap: ${props => props.gap || '12px 0'};
    justify-content: center;
    align-items: ${props => props.align};
    text-align: center;
`
export const CartOptions = styled.div`
    display: flex;
    flex-direction: ${props => props.direction || 'column'};
    flex-grow: ${props => props.flexGrow || 1};
    width: ${props => props.width || '50px'};
    height: ${props => props.height || '70px'};
    padding: ${props => props.padding || '3px'};
    justify-content: center;
`

export const CheckoutCart = styled.div`
    display : flex;
    flex-direction: column;
    padding : 20px;
    width:max(20vw, 340px);
    border-radius: 20px;
    box-shadow : 0 0 10px 2px;
    & h4{
        margin: 10px 0;
        font-weight: 500;
        padding: 0;
    }
`

