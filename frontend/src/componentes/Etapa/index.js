import styled from "styled-components";
import Materiais from '../Materiais'


const EtapaConteiner = styled.div`
`

function Etapa({ etapa, materiais_pesquisados, etapas_api, funcao, aoMaterialListaModificado }) {
    
    return (
        <EtapaConteiner>
            <Materiais
                key= {etapa.nome}
                nome= {etapa.nome}
                cor_primaria= {etapa.corPrimaria}
                cor_secundaria= {etapa.corSecundaria}
                materiais= {materiais_pesquisados}
                etapas_api={etapas_api}
                funcao= {funcao}
                aoMaterialListaModificado= {aoMaterialListaModificado}
            />
        </EtapaConteiner>
    )
}

export default Etapa;