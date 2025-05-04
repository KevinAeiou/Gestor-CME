import styled from "styled-components";
import { ModalBody, ModalContent, ModalHeader, ModalOverlay, ModalTitle } from "../ModalOverlay";
import BotaoFechar from "../BotaoFechar";

const MensagemConfirmacao = styled.p`
    color: #555;
    line-height: 1.5;
    margin: 0;
`
const BotoesConteiner = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
`
const BotaoCancelar = styled.button`
    padding: 10px;
    background: #f0f0f0;
    color: #333;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
        background: #e0e0e0;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(255, 102, 22, 0.3);
    }
`
const BotaoConfirmar = styled.button`
    padding: 10px 16px;
    background: #ff3b30;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
        background: #e0352b;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(255, 102, 22, 0.3);
    }
`

function ModalMensagem({ estaAberto, aoCancelar, aoConfirmar, titulo, mensagem }) {
    if(!estaAberto) return null
    return (
        <ModalOverlay onClick={aoCancelar}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <ModalHeader>
                    <ModalTitle>{titulo}</ModalTitle>
                    <BotaoFechar onClick={aoCancelar}>&times;</BotaoFechar>
                </ModalHeader>
                <ModalBody>
                    <MensagemConfirmacao>{mensagem}</MensagemConfirmacao>
                    <BotoesConteiner>
                        <BotaoCancelar onClick={aoCancelar}>Cancelar</BotaoCancelar>
                        <BotaoConfirmar onClick={aoConfirmar}>Confirmar</BotaoConfirmar>
                    </BotoesConteiner>
                </ModalBody>
            </ModalContent>
        </ModalOverlay>        
    )
}

export default ModalMensagem;