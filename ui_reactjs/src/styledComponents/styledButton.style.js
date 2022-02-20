import styled from "styled-components";
import "./color.css";

const StyledButton = styled.button`
  background-color: ${props => props.color || 'var(--primaryColor)'};
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: ${props => props.color ? '#FBF7F0' : 'black'};
  cursor: pointer;
  display: inline-block;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 500;
  height: 40px;
  width: 100px;
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
  background-color: #F082AC;
}`

export const CartUpdateButton = styled.button`
  padding: 7px;
  font-size: 16px;
  border-radius: 50%;
  background-color: ${props => props.color || 'var(--primaryColor)'};
`

export { StyledButton };

