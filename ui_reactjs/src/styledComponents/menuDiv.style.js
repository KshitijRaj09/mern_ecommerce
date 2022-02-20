import styled from 'styled-components';

export const MenuDiv = styled.div`
    background-color: #456268;
    color: #FBF7F0;
    width: ${props => props.width || '110px'};
    display: flex;
    justify-Content: center;
    align-items: center;
    padding: 3px;
    margin: ${props => props.margin};
`