import styled from "styled-components";
import FormularioUsuario from "../componentes/FormularioUsuario"
import { useState } from "react";
import { postUsuario } from "../servicos/usuarios";


const AppContainer = styled.div`
    width: 100vw;
    height: 100vw;
    background-image: linear-gradient(90deg, #fff, #ff6616 165%);
`

function CadastrarUsuarios() {
    const [usuarios, setUsuarios] = useState([])
    const aoUsuarioAdicionado = async (usuario) => {
        try {
            const { data: novoUsuario } = await postUsuario(usuario);
            setUsuarios([...usuarios, novoUsuario])
            alert('Usuário cadastrado com sucesso!')
      
        } catch (erro) {
            console.error('Erro: ', erro);
            alert(erro.response?.data?.message || 'Erro ao cadastrar usuário')
        }
    }

    return (
        <AppContainer>
            <FormularioUsuario 
                aoUsuarioAdicionado= {usuario => aoUsuarioAdicionado(usuario)}
            />
        </AppContainer>
    );
};

export default CadastrarUsuarios;