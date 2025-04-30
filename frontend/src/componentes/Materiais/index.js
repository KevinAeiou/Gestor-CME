import styled from "styled-components";
import Material from "../Material";

const MateriaisConteiner = styled.section`
    text-align: center;
    padding: 32px;
    background-color: ${props => props.$corfundo};
`
const MaterialNome = styled.h3`
    font-size: 32px;
    color: #000;
    border-bottom: 4px solid ${props => props.$corborda};
    display: inline-block;
    padding-bottom: 8px;
`
const MateriaisConteinerCards = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 32px;
    flex-wrap: wrap;
`

function Materiais({ materiais, nome, cor_primaria, cor_secundaria, etapas_api, funcao }) {
    const encontrarEtapaAPI = (material_etapa, material_serial) => {
        return etapas_api.find(etapa => etapa.etapa == material_etapa && etapa.serial == material_serial) || {}
    }

    return (
        (materiais.length > 0) &&  
        <MateriaisConteiner $corfundo= {cor_secundaria}>
            <MaterialNome 
                $corborda= {cor_primaria}
            >{nome}
            </MaterialNome>
            <MateriaisConteinerCards>
                {materiais.map(material => {
                    const etapa_api_correspondente = encontrarEtapaAPI(material.etapa, material.serial)
                    return (
                        <Material
                            key={material.serial} 
                            serial= {material.serial} 
                            nome= {material.nome} 
                            tipo= {material.tipo} 
                            data= {material.data}
                            etapa_material= {etapa_api_correspondente}
                            funcao= {funcao}
                        />)}
                    )
                }
            </MateriaisConteinerCards>
        </MateriaisConteiner>
    )
}

export default Materiais;