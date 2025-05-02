import { useState } from "react";
import CampoTexto from "../CampoTexto";
import ListaSuspensa from "../ListaSuspensa";
import Botao from "../Botao";
import FormularioConteiner from "../FormularioConteiner";
import FormularioCampos from "../FormularioCampos";
import Titulo from "../Titulo";


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
        <FormularioConteiner>
            <FormularioCampos onSubmit={aoCriar}>
                <Titulo>Cadastrar novo material</Titulo>
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
        </FormularioConteiner>
    )
}

export default FormularioMaterial;