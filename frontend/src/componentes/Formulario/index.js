import styled from "styled-components";
import CampoTexto from "../CampoTexto";
import ListaSuspensa from "../ListaSuspensa";
import Botao from "../Botao"
import { useState } from "react";


const FormularioContainer = styled.section`
    display: flex;
    justify-content: center;
    margin: 40px 0;
`
const FormularioCampos = styled.form`
    max-width: 80%;
    background-color: #F2F2F2;
    border-radius: 20px;
    padding: 36px 64px;
    box-shadow: 8px 8px 16px rgba(0, 0 ,0, 0.08);
`

function Formulario(props) {
    const aoCriar = (evento) => {
        evento.preventDefault()
        console.log(nome, email, funcao);
        props.aoUsuarioAdicionado({
            nome,
            email,
            funcao
        })
        setNome('')
        setEmail('')
        setFuncoes('')
    }
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [funcao, setFuncoes] = useState(props.funcoes[0])

    return (
        <FormularioContainer>
            <FormularioCampos onSubmit={aoCriar}>
                <h2>Cadastrar novo usuário</h2>
                <CampoTexto 
                    obrigatorio={true} 
                    label= 'Nome' 
                    placeholder= 'Nome do usuário'
                    valor= {nome}
                    aoAlterado= {valor => setNome(valor)}
                    />
                <CampoTexto 
                    obrigatorio={true} 
                    label= 'Email'
                    placeholder= 'Email do usuário'
                    valor= {email}
                    aoAlterado= {valor => setEmail(valor)}
                />
                <ListaSuspensa 
                    obrigatorio={true} 
                    titulo= 'Funções' 
                    itens= {props.funcoes}
                    valor= {funcao}
                    aoAlterado= {valor => setFuncoes(valor)}
                />
                <Botao>
                    Criar usuário
                </Botao>
            </FormularioCampos>
        </FormularioContainer>
    )
}

export default Formulario;