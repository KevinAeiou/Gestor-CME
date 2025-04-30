import styled from "styled-components";
import { useState } from "react";
import CampoTexto from "../CampoTexto";
import Botao from "../Botao";

const FormularioLoginContainer = styled.section`
    display: flex;
    justify-content: center;
`

const FormularioContainer = styled.section`
    display: flex;
    justify-content: center;
    margin: 80px 0;
`

const FormularioCampos = styled.form`
    max-width: 80%;
    background-color: #F2F2F2;
    border-radius: 20px;
    padding: 36px 64px;
    box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.08);
`

function FormularioEntrar({aoEntrar, erro}) {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [carregando, setCarregando] = useState(false);

    const aoSubmeter = (evento) => {
        evento.preventDefault()
        setCarregando(true)
        if (!email || !senha) {
            alert('Por favor, preencha todos os campos')
            setCarregando(false)
            return
        }
        
        if (!email.includes('@') || !email.includes('.')) {
            alert('Por favor, insira um e-mail válido');
            setCarregando(false)
            return;
        }
        
        aoEntrar({
            email,
            senha
        })
        
        setEmail('')
        setSenha('')
        setCarregando(false)
    }

    return (
        <FormularioLoginContainer>
            <FormularioContainer>
                <FormularioCampos onSubmit={aoSubmeter}>
                    <h2>Entrar</h2>
                    <CampoTexto 
                        erro = {erro}
                        obrigatorio={true} 
                        label="E-mail" 
                        placeholder="Digite seu e-mail"
                        valor={email}
                        aoAlterado={valor => setEmail(valor)}
                        tipo="email"
                    />
                    <CampoTexto 
                        erro = {erro}
                        obrigatorio={true} 
                        label="Senha" 
                        placeholder="Digite sua senha"
                        valor={senha}
                        aoAlterado={valor => setSenha(valor)}
                        tipo="password"
                    />
                    <Botao disabled= {carregando}>
                        {carregando ? 'Autenticando...' : 'Entrar'}
                    </Botao>
                </FormularioCampos>
            </FormularioContainer>
        </FormularioLoginContainer>
    )
}

export default FormularioEntrar;