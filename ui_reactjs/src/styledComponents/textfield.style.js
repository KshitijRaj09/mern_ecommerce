import styled from "styled-components";
import "./color.css";

const Textfield = styled.input`
    width : 100%;
    border-radius : 10px;
    padding : 10px;
    font-size : 16px;
    background-color: #FBF8F1;
    border:none;
    &:focus{
        background-color:#F7ECDE;
        
    }
`

export { Textfield };