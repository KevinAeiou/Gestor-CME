import styled from "styled-components";

const UsuarioConteiner = styled.div`
    width: 280px;
    background: #FFFFFF;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.08);
    border-radius: 0px 0px 10px 10px;
    padding-top: 90px;
    padding-bottom: 40px;
`
const UsuarioNome = styled.h4`
    color: #6278F7;
    font-size: 18px;
    line-height: 22px;
    font-weight: bold;
    margin-bottom: 8px;
`
const UsuarioFuncao = styled.h5`
    font-size: 18px;
    line-height: 22px;
    color: #212121;
    padding: 0 16px;
`

function Usuario({nome, funcao}) {
    return (
        <UsuarioConteiner>
            <UsuarioNome>{nome}</UsuarioNome>
            <UsuarioFuncao>{funcao}</UsuarioFuncao>
        </UsuarioConteiner>
    )
}

export default Usuario;