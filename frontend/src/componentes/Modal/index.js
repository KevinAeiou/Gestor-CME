import styled from "styled-components";
import ListaSuspensa from "../ListaSuspensa";
import Botao from "../Botao";
import { useState } from "react";
import { FaBoxOpen } from 'react-icons/fa';

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

const ModalHeader = styled.div`
    background: #ff6616;
    color: white;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const ModalTitle = styled.h2`
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
`

const CloseButton = styled.button`
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
`
const MaterialNome = styled.h3`
    color: #333;
    font-size: 1.3rem;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
`
const EtapasHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    font-weight: 600;
    color: #666;
`
const EtapaItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
`
const EtapaNome = styled.span`
    color: #333;
    display: flex;
    align-items: center;
`
const EtapaQuantidade = styled.span`
    color: ${props => props.$destaque ? '#ff6616' : '#666'};
    font-weight: ${props => props.$destaque ? '600' : 'normal'};
`
const MaterialInfo = styled.div`
    padding: 20px;
    border-bottom: 1px solid #eee;
`
const EtapasContainer = styled.div`
    padding: 20px;
`
const LinhaInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  color: #555;
`
const TituloInfo = styled.span`
    font-weight: 500;
    margin-right: 5px;
`;
const ModalBody = styled.div`
  padding: 20px;
`
const ControlesConteiner = styled.div`
    padding: 0 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`
    
function Modal({estaAberto, aoFechar, titulo, nome, tipo, data, etapas, etapaAtual, aoMaterialModificado, funcao }) {
    const [etapa, setEtapa] = useState(etapaAtual)
    if(!estaAberto) return null;
    const aoModficar = async (evento) => {
        evento.preventDefault()
        aoMaterialModificado({etapa})
    }
    const mostrarComponente = (componente) => {
        switch (funcao) {
            case 'Administrador':
                return true
            case 'Tecnico':
                return componente !== 'etapas'
            case 'Enfermagem':
                return componente !== 'controles'
            default:
                return false
        }
    }
    return (
        <ModalOverlay onClick={aoFechar}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <ModalHeader>
                    <ModalTitle>{titulo}</ModalTitle>
                    <CloseButton onClick={aoFechar}>&times;</CloseButton>
                </ModalHeader>
                <ModalBody>
                    <MaterialInfo>
                        <MaterialNome><FaBoxOpen />{nome}</MaterialNome>
                        <LinhaInfo>
                            <TituloInfo>Tipo:</TituloInfo> {tipo}
                        </LinhaInfo>
                        <LinhaInfo>{`Validade: ${data ? new Date(data).toLocaleDateString('pt-BR') : 'Data inválida'}`}</LinhaInfo>
                    </MaterialInfo>
                    {mostrarComponente('etapas') && (
                        <EtapasContainer>
                            <EtapasHeader>
                                <span>ETAPA</span>
                                <span>QUANTIDADE</span>
                            </EtapasHeader>
                            {etapas.map(etapaItem => (
                                <EtapaItem key={etapaItem.nome}>
                                    <EtapaNome>{etapaItem.nome}</EtapaNome>
                                    <EtapaQuantidade $destaque= {etapaItem.nome === etapaAtual}>{etapaItem.quantidade}</EtapaQuantidade>
                                </EtapaItem>
                            ))}
                        </EtapasContainer>
                    )}
                    {mostrarComponente('controles') && (
                        <ControlesConteiner>
                            <ListaSuspensa 
                                obrigatorio= {true}
                                titulo= 'Etapa atual'
                                valor= {etapa}
                                itens= {etapas.map(etapa => etapa.nome)}
                                aoAlterado= {valor => setEtapa(valor)}
                            />
                            <Botao onClick= {aoModficar}>
                                Modificar
                            </Botao>
                        </ControlesConteiner>
                    )}
                </ModalBody>
            </ModalContent>
        </ModalOverlay>
    )
}

export default Modal;