import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const ConteinerSair = styled.div`

`

function Sair() {
    const navegador = useNavigate();
    useEffect(() => {
        sessionStorage.clear();
        localStorage.removeItem('user_funcao');
        navegador('/entrar');
        window.location.reload();
    }, [navegador]);
    return (
        <ConteinerSair>
            <h1>Saindo...</h1>
        </ConteinerSair>
    );
}

export default Sair;