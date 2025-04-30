import styled from "styled-components";


const InicioContainer = styled.section`
    background-color: #ff6616;
    color: #FFF;
    text-align: center;
    padding: 85px 0;
    height: 270px;
    width: 100%;
`
const Titulo = styled.h2`
    color: #FFF;
    font-size: 36px;
    text-align: center;
    width: 100%;
`

function Inicio() {
    return (
        <InicioContainer>
            <Titulo>Bem vindo</Titulo>
        </InicioContainer>
    )
}

export default Inicio;