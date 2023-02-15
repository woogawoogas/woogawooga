import React from "react";
import styled from "styled-components";

function Modal({ visible, closeModal, children }) {
  return (
    <div className="Modal">
      <ModalWrap visible={visible} onClick={closeModal}></ModalWrap>
      <ModalBody visible={visible}>{children}</ModalBody>
    </div>
  );
}

export default Modal;

const ModalWrap = styled.div`
  width: 100%;
  height: 100%;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 99;
  cursor: pointer;
`;
const ModalBody = styled.div`
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  background-color: white;
  width: 600px;
  height: 500px;
  padding-left: 10px;
  z-index: 100;
`;