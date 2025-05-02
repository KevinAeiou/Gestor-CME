import styled from "styled-components"

const Titulo = styled.h2`
    // width: 100%;
    padding: 30px 0;
    color: ${props => props.cor || '#000'};
    font-size: ${props => props.tamanho || '24xp'};
    text-align: ${props => props.alinhamento || 'center'};
    margin: 0;
`

export default Titulo;