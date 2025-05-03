import styled from "styled-components"
import BotaoFechar from "../BotaoFechar";


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

function CardMaterial({ serial, nome, tipo, aoMaterialDeletado, aoFechar }) {
    const aoDeletar = async(evento) => {
        evento.stopPropagation()
        aoMaterialDeletado({serial})
    }
    return (
        <MaterialConteiner onClick= {aoFechar}>
                <BotaoFecharConteiner>
                    <BotaoFechar 
                        onClick= {aoDeletar} 
                        cor= '#000'
                    >
                        ×
                    </BotaoFechar>
                </BotaoFecharConteiner>
                <MaterialSerial>{serial}</MaterialSerial>
                <MaterialNome>{nome}</MaterialNome>
                <MaterialTipo>{tipo}</MaterialTipo>
            </MaterialConteiner>
    )
}

export default CardMaterial;