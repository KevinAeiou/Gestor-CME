import { useState } from "react";
import CampoTexto from "../CampoTexto";
import Botao from "../Botao";
import FormularioConteiner from "../FormularioConteiner";
import FormularioCampos from "../FormularioCampos";
import Titulo from "../Titulo";


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
        <FormularioConteiner>
            <FormularioCampos onSubmit={aoSubmeter}>
                <Titulo>Entrar</Titulo>
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
        </FormularioConteiner>
    )
}

export default FormularioEntrar;