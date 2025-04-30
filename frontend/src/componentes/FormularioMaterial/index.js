import styled from "styled-components";
import { useState } from "react";
import CampoTexto from "../CampoTexto";
import ListaSuspensa from "../ListaSuspensa";
import Botao from "../Botao";

const FormularioMaterialContainer = styled.section`
    display: flex;
    justify-content: center;
`

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

function FormularioMaterial(props) {
    const aoCriar = (evento) => {
        evento.preventDefault()
        try {
            const [dia, mes, ano] = data.split('/');
            const dataFormadata = `${ano}-${mes}-${dia}`;
            props.aoMaterialAdicionado({
                nome,
                data: dataFormadata,
                tipo
            })
            setNome('')
            setTipo('')
            setData('')
        } catch (erro) {
            alert(`Data inválida: ${erro}`)
        }
    }
    const [nome, setNome] = useState('')
    const [data, setData] = useState('')
    const [tipo, setTipo] = useState(props.tipos[0])

    const formatarData = (valor) => {
        const apenasNumeros = valor.replace(/\D/g, '');
        let formatado = apenasNumeros;
        if (apenasNumeros.length > 2) {
            formatado = `${apenasNumeros.slice(0, 2)}/${apenasNumeros.slice(2, 4)}`;
        }
        if (apenasNumeros.length > 4) {
            formatado = `${formatado}/${apenasNumeros.slice(4, 8)}`;
        }
        return formatado;
    }

    return (
        <FormularioMaterialContainer>
            <FormularioContainer>
                <FormularioCampos onSubmit={aoCriar}>
                    <h2>Cadastrar novo material</h2>
                    <CampoTexto 
                        obrigatorio={true} 
                        label= 'Nome' 
                        placeholder= 'Nome do material'
                        valor= {nome}
                        aoAlterado= {valor => setNome(valor)}
                    />
                    <CampoTexto 
                        obrigatorio={true} 
                        label= 'Validade' 
                        placeholder= 'DD/MM/AAAA'
                        valor= {data}
                        aoAlterado= {valor => setData(formatarData(valor))}
                    />
                    <ListaSuspensa 
                        obrigatorio={true} 
                        titulo= 'Tipos' 
                        itens= {props.tipos}
                        valor= {tipo}
                        aoAlterado= {valor => setTipo(valor)}
                    />
                    <Botao >
                        Cadastrar material
                    </Botao>
                </FormularioCampos>
            </FormularioContainer>
        </FormularioMaterialContainer>
    )
}

export default FormularioMaterial;