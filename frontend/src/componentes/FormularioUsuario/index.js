import styled from "styled-components";
import Formulario from "../Formulario";
import { useState } from "react";
import { postUsuario } from "../../servicos/usuarios";

const FormularioContainer = styled.div`
    display: flex;
    justify-content: center;

`
function FormularioUsuario() {
    
    const [usuarios, setUsuarios] = useState([])
    const funcoes = [
        {
        nome: 'Técnico',
        corPrimaria: '#82CFFA',
        corSecundaria: '#E8F8FF'
        },
        {
        nome: 'Enfermagem',
        corPrimaria: '#A6D157',
        corSecundaria: '#F0F8E2'
        },
        {
        nome: 'Administrador',
        corPrimaria: '#E06B69',
        corSecundaria: '#FDE7E8'
        },
    ]  
    
    const aoNovoUsuarioAdicionado = async (usuario) => {
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
        <FormularioContainer>
            <Formulario 
              funcoes= {funcoes.map(funcao => funcao.nome)} 
              aoUsuarioAdicionado= {usuario => aoNovoUsuarioAdicionado(usuario)}
            />
        </FormularioContainer>
    )
}

export default FormularioUsuario;