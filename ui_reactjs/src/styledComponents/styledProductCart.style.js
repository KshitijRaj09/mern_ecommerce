import styled from 'styled-components';

export const ProductGrid = styled.div`
    max-width: 1200px;
    padding: 20px 0;
    margin: 0 auto;
    display: grid;
    gap: 30px 10px;
    grid-template-columns: repeat(auto-fit,minmax(350px,1fr));
    justify-items: center;
    align-content: center;
`

export const MainProductCard = styled.div`
    box-shadow : 0 2px 7px #dfdfdf;
    background-color: whitesmoke;
    width : 90%;
    max-width: 400px;
`

export const ProductImageCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${props => props.width || '100%'};
    height: ${props => props.height || '300px'};
    padding: ${props => props.padding || '35px'};
    background: ${props => props.background || 'bisque'};
    margin-right: ${props => props.marginRight};
    &>img{
        width:100%;
        height: 100%;
    }
`

export const ProductDetails = styled.div`
    padding : 20px;
    &>h4{
        display: block;
        margin: 8px 0;
        text-transform: uppercase;
        color: var(--product-name-color);
        text-decoration: none;
        transition: 0.3s;
    }
    &>div{
        overflow: hidden;
        border-top: 1px solid #eee;
        padding-top: 20px;
        display: flex;
        justify-content: space-between;
    }
    &>h5{
        text-transform: capitalize;
        margin: 8px 0;
    }
    &>p{
        margin : 5px 0;
        text-align: justify;
    }

`

export const ProductPrice = styled.div`
    font-size: ${props => props.fontSize || '18px'};
    color: var(--product-price-color);
    font-weight: 600;
    flex: 1;
    text-align: center;
    `

export const ProductOptions = styled.div`
    display: flex;
    flex: 1.5;
    justify-content : space-around;
`

export const CartCount = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ivory;
    border-radius: 10px;
    padding: 7px;
    width : 30px;
`