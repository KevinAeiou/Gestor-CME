import { ModalContent, ModalOverlay } from "../ModalOverlay";

function ModalMensagem({ aoFechar }) {
    return (
        <ModalOverlay onClick={aoFechar}>
            <ModalContent onClick={e => e.stopPropagation()}>

            </ModalContent>
        </ModalOverlay>        
    )
}

export default ModalMensagem;