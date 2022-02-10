import styled from "styled-components";


export const ModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  background-color: var(--modal-bgColor);
  border: 2px solid #000;
  border-radius: 20px;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap:10px;
`

export const FormStyled = styled.form`
 gap: 10px;
 display: flex;
 justify-content: center;
 align-items: center;
 flex-direction: column;
`