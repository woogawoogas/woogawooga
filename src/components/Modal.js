import styled from "styled-components";

export default function Modal({ visible, children }) {
  return (
    <div className="Modal">
      <ModalBody visible={visible}>{children}</ModalBody>
    </div>
  );
}

const ModalBody = styled.div`
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: white;
  width: 100vw;
  height: 100vh;
  z-index: 100;
`;
