import styled from "styled-components";
import ListaSuspensa from "../ListaSuspensa";
import Botao from "../Botao";
import { useState } from "react";
import { FaBoxOpen } from 'react-icons/fa';
import { ModalBody, ModalContent, ModalHeader, ModalOverlay, ModalTitle } from "../ModalOverlay";
import BotaoFechar from "../BotaoFechar";
    
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
`
const ControlesConteiner = styled.div`
    padding: 0 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`
const MaterialNome = styled.h3`
    color: #333;
    font-size: 1.3rem;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
`
    
function ModalDetalhesMaterial({ estaAberto, aoFechar, titulo, nome, tipo, data, etapas, etapaAtual, aoMaterialModificado, funcao }) {
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
                    <BotaoFechar onClick={aoFechar}>&times;</BotaoFechar>
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

export default ModalDetalhesMaterial;