import styled from 'styled-components';
import {materiais} from './dadosUtimosMatariais'
import {Titulo} from '../Titulo'
import Card from '../Card';


const UltimosMateriaisContainer = styled.section`
    background-color:rgb(39, 40, 43);
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    `
    
    const NovosMatariaisContainer = styled.div`
    margin-left: 30px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    cursor: pointer;
`

function UltimosMateriais() {
    return (
        <UltimosMateriaisContainer>
            <Titulo cor= '#EB9B00' tamanho= '36px'>Ultimos materiais</Titulo>
            <NovosMatariaisContainer>
                {materiais.map( material => (
                    <a color='#FFF' id={material.id}>{material.nome}</a>
                ))}
            </NovosMatariaisContainer>
            <Card 
                titulo= 'Título teste'
                subtitulo= 'Sub título teste'
                descricao= 'Descrição teste' 
            />
        </UltimosMateriaisContainer>
    )
}

export default UltimosMateriais;