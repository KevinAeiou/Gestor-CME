import styled from "styled-components";
import FormularioEntrar from "../componentes/FormularioEntrar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { autenticaUsuario } from "../servicos/usuarios";


const ConteinerEntrar = styled.div`
    
`

function Entrar() {
    const [erro, setErro] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();
    const fazerAutenticacao = async (credenciais) => {
        setCarregando(true);
        setErro(null);
        try {
            const {access: access_token, user_funcao: funcao } = await autenticaUsuario({
                email: credenciais.email,
                senha: credenciais.senha
            })

            sessionStorage.setItem('access_token', access_token);
            localStorage.setItem('user_funcao', funcao);
            navigate('/');
        } catch (erro) {
            console.error('Erro na autenticação: ', erro)
            setErro(erro.response?.data?.erro || 'Credenciais inválidas')
        } finally {
            setCarregando(false);
        }
    }
    return (
        <ConteinerEntrar>
            <FormularioEntrar 
                aoEntrar= {fazerAutenticacao}
                erro= {erro}
                carregando = {carregando}
            />
        </ConteinerEntrar>
    );
}

export default Entrar;