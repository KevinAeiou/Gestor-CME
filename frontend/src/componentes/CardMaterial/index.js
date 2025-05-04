import styled from "styled-components"
import BotaoFechar from "../BotaoFechar";
import { deleteMaterial } from "../../servicos/materiais";
import { useState } from "react";
import ModalMensagem from "../ModalMensagem";


const MaterialConteiner = styled.div`
    position: relative;
    width: 280px;
    background: white;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.08);
    border-radius: 0px 0px 10px 10px;
    padding-top: 90px;
    padding-bottom: 40px;
`
const MaterialNome = styled.h4`
    color: #6278F7;
    font-size: 18px;
    line-height: 22px;
    font-weight: bold;
    margin-bottom: 8px;
`
const MaterialTipo = styled.h5`
    font-size: 18px;
    line-height: 22px;
    color: #212121;
    padding: 0 16px;
`
const MaterialSerial = styled.h5`
    font-size: 18px;
    line-height: 22px;
    color: #212121;
    padding: 0 16px;
`
const BotaoFecharConteiner = styled.div`
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 1;
`

function CardMaterial({ serial, nome, tipo, aoFechar, aoMaterialListaModificado }) {
    const [modalConfirmacaoEstaAberto, setModalConfirmacaoEstaAberto] = useState(false)
    const aoMaterialRemovido = async () => {
        try {
            const materialDeletado = await deleteMaterial(serial)
            console.log('Material removido com sucesso: ', materialDeletado)
            alert('Material removido com sucesso!')
            setModalConfirmacaoEstaAberto(false)
            aoMaterialListaModificado && aoMaterialListaModificado()
        } catch (erro) {
            const menssagem = erro.response?.data || erro.message || 'Erro ao remover material!'
            console.error('Erro ao deletar material: ', menssagem);
            alert(menssagem.error)
        }
    }
    const aoRemover = async(evento) => {
        evento.stopPropagation()
        setModalConfirmacaoEstaAberto(true)
    }
    const aoCancelar = async(evento) => {
        evento.stopPropagation()
        setModalConfirmacaoEstaAberto(false)
    }
    const aoConfirmar = async(evento) => {
        evento.stopPropagation()
        aoMaterialRemovido()
    }

    return (
        <MaterialConteiner onClick= {aoFechar}>
            <BotaoFecharConteiner>
                <BotaoFechar 
                    onClick= {aoRemover} 
                    cor= '#000'
                >
                    &times;
                </BotaoFechar>
            </BotaoFecharConteiner>
                <MaterialSerial>{serial}</MaterialSerial>
                <MaterialNome>{nome}</MaterialNome>
                <MaterialTipo>{tipo}</MaterialTipo>

            <ModalMensagem 
                estaAberto= {modalConfirmacaoEstaAberto}
                aoCancelar= {aoCancelar}
                aoConfirmar= {aoConfirmar}
                titulo= "Confirmar remoção"
                mensagem= {'Tem certeza que deseja excluir o material?'}
            />
        </MaterialConteiner>
    )
}

export default CardMaterial;