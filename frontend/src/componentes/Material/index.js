import { useState } from "react";
import styled from "styled-components";
import Modal from "../Modal";
import { patchMaterial } from "../../servicos/materiais";

const MaterialConteiner = styled.div`
    width: 280px;
    background: #FFFFFF;
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

function Material({ serial, nome, tipo, data, etapa_material, funcao }) {
    const [modalEstaAberto, setModalEstaAberto] = useState(false);
    const etapas = [
        {
            nome: 'Recebimento',
            quantidade: etapa_material.quant_recebido
        },
        {
            nome: 'Lavagem',
            quantidade: etapa_material.quant_lavagem
        },
        {
            nome: 'Esterilização',
            quantidade: etapa_material.quant_esterilizacao
        },
        {
            nome: 'Distribuição',
            quantidade: etapa_material.quant_distribuicao
        }
    ]
    const aoMaterialModificado = async (material) => {
        try {
            const materialModificado = await patchMaterial(serial, material)
            console.log('Material modificado: ', materialModificado)
            setModalEstaAberto(false)
            alert('Material modificado com sucesso!')
        } catch (erro) {
            const menssagem = erro.response?.data || erro.message || 'Erro ao modificar material!'
            console.error('Erro ao atualizar material: ', menssagem);
            alert(menssagem.error)
        }
    }
    return (
        <>
            <MaterialConteiner onClick={() => setModalEstaAberto(true)}>
                <MaterialSerial>{serial}</MaterialSerial>
                <MaterialNome>{nome}</MaterialNome>
                <MaterialTipo>{tipo}</MaterialTipo>
            </MaterialConteiner>
            <Modal 
                estaAberto = {modalEstaAberto}
                aoFechar= {() => setModalEstaAberto(false)}
                titulo={serial}
                nome= {nome}
                tipo= {tipo}
                data= {data}
                etapas= {etapas}
                etapaAtual={etapa_material.etapa}
                aoMaterialModificado= {material => aoMaterialModificado(material)}
                funcao= {funcao}
            />
        </>
    )
}

export default Material;