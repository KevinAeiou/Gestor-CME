import styled from "styled-components";

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`
const ModalContent = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 500px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    overflow: hidden;
    font-family: 'Segoe UI', sans-serif;
`
const ModalTitle = styled.h2`
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
`
const ModalHeader = styled.div`
    background: #ff6616;
    color: white;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const ModalBody = styled.div`
  padding: 20px;
`

export {
    ModalOverlay,
    ModalContent,
    ModalTitle,
    ModalHeader,
    ModalBody,
} 