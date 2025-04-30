import styled from "styled-components";
import FormularioUsuario from "../componentes/FormularioUsuario"


const AppContainer = styled.div`
width: 100vw;
height: 100vw;
background-image: linear-gradient(90deg, #fff, #ff6616 165%);
`

function CadastrarUsuarios() {
    return (
        <AppContainer>
            <FormularioUsuario />
        </AppContainer>
    );
};

export default CadastrarUsuarios;