import { useState } from "react";
import FormularioConteiner from "../FormularioConteiner";
import FormularioCampos from "../FormularioCampos";
import Titulo from "../Titulo";
import CampoTexto from "../CampoTexto";
import ListaSuspensa from "../ListaSuspensa";
import Botao from "../Botao";


function FormularioUsuario({ aoUsuarioAdicionado }) {
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
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [funcao, setFuncoes] = useState(funcoes[0].nome)

    const aoCriar = (evento) => {
        evento.preventDefault()
        console.log('Nome: ', nome, ' | Email: ', email, ' | Função: ', funcao)
        aoUsuarioAdicionado({
            nome,
            email,
            funcao
        })
        setNome('')
        setEmail('')
        setFuncoes(funcoes[0].nome)
    }
    
    return (
        <FormularioConteiner>
            <FormularioCampos onSubmit={aoCriar}>
                <Titulo>Cadastrar novo usuário</Titulo>
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
                    itens= {funcoes.map(funcao => funcao.nome)}
                    valor= {funcao}
                    aoAlterado= {valor => setFuncoes(valor)}
                />
                <Botao>
                    Criar usuário
                </Botao>
            </FormularioCampos>
        </FormularioConteiner>
    )
}

export default FormularioUsuario;