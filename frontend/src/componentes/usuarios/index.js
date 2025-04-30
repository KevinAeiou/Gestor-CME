import styled from "styled-components";
import Usuario from "../usuario";

const UsuariosConteiner = styled.section`
    text-align: center;
    padding: 32px;
    background-color: ${props => props.corFundo};
`
const UsuariosTitulo = styled.h3`
    font-size: 32px;
    border-bottom: 4px solid ${props => props.corBorda};
    display: inline-block;
    padding-bottom: 8px;
`
const UsuariosConteinerCards = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 32px;
    flex-wrap: wrap;
`

function Usuarios(props) {
    return (
        (props.usuarios.length > 0) &&  <UsuariosConteiner corFundo= {props.corSecundaria}>
            <UsuariosTitulo 
                corBorda= {props.corPrimaria}
            >{props.nome}
            </UsuariosTitulo>
            <UsuariosConteinerCards>
                {props.usuarios.map(usuario => <Usuario key={usuario.nome} nome= {usuario.nome} funcao= {usuario.funcao}/>)}
            </UsuariosConteinerCards>
        </UsuariosConteiner>
    )
}

export default Usuarios;