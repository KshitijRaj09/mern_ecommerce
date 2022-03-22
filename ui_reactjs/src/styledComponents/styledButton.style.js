import styled from 'styled-components';
import './color.css';

const StyledButton = styled.button`
  background-color: ${(props) => props.color || 'var(--primaryColor)'};
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: ${(props) => (props.color ? '#FBF7F0' : 'black')};
  cursor: pointer;
  display: inline-block;
  font-family: 'Haas Grot Text R Web', 'Helvetica Neue', Helvetica, Arial,
    sans-serif;
  font-size: 16px;
  font-weight: 500;
  height: 40px;
  width: ${(props) => props.width || '100px'};
  line-height: 20px;
  list-style: none;
  margin: 0;
  outline: none;
  padding: 10px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: color 100ms;
  vertical-align: baseline;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  &:hover,
  &:focus {
    background-color: #f082ac;
  }
`;

export const CartUpdateButton = styled.button`
  width: 30px;
  height: 30px;
  font-size: 18px;
  text-align: center;
  border-radius: 10px;
  cursor: pointer;
  background-color: ${(props) =>
    props.color || '#E1E8EE' || 'var(--primaryColor)'};
`;

export const AddToCartButton = styled.button`
  padding: 5px;
  background-color: #e1e8ee;
  border-radius: 5px;
  &:hover,
  &:focus {
    background-color: #b4babe;
    cursor: pointer;
    transition: 0.5s;
  }
`;

export { StyledButton };
