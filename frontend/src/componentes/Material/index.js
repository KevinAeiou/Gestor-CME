import { useState } from "react";
import ModalDetalhesMaterial from "../ModalDetalhesMaterial";
import { patchMaterial } from "../../servicos/materiais";
import CardMaterial from "../CardMaterial";


function Material({ serial, nome, tipo, data, etapa_material, funcao, aoMaterialListaModificado }) {
    const [modalEstaAberto, setModalEstaAberto] = useState(false)
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
            aoMaterialListaModificado && aoMaterialListaModificado()
        } catch (erro) {
            const menssagem = erro.response?.data || erro.message || 'Erro ao modificar material!'
            console.error('Erro ao atualizar material: ', menssagem);
            alert(menssagem.error)
        }
    }

    return (
        <>
            <CardMaterial 
                serial= {serial}
                nome= {nome}
                tipo= {tipo}
                aoFechar= {() => setModalEstaAberto(true)}
                aoMaterialListaModificado= {aoMaterialListaModificado}
            />
            <ModalDetalhesMaterial
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