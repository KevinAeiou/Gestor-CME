import styled from "styled-components";

const CampoTextoContainer = styled.div`
    margin: 1.5rem 0;
    position: relative;
`
const CampoTituloTexto = styled.label`
    display: block;
    margin-bottom: 0.75rem;
    font-size: 1.125rem;
    front-weight: 500;
    color: #333;
    transition: all 0.2s ease;
`
const CampoTextoInput = styled.input`
    background-color: #FFF;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    padding: 1rem 1.25rem;
    box-sizing: border-box;
    transition: all 0.3s ease;
    
    &:focus {
        outline: none;
        border-color: #ff6616;
        box-shadow: 0 0 0 3px rgba(255, 102, 22, 0.2);
    }

    &:hover {
        border-color: #b3b3b3;
    }

    &::placeholder {
        color: #999;
        font-weight: 300;
    }

    ${props => props.erro && `
        border-color: #e74c3c;
        &:focus {
            border-color: #e74c3c;
            box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.2);
        }
    `}
`
const MensagemErro = styled.span`
    color: #e74c3c;
    font-size: 0.875rem;
    margin-top: 0.5rem;
    display: block;
    font-weight: 500;
`
const CampoRequerido = styled.span`
    color: #ff6616;
    margin-left: 0.25rem;
`

function CampoTexto({tipo= 'text', obrigatorio= false, label, placeholder, valor, aoAlterado, erro}) {
    const aoDigitado = (evento) => {
        aoAlterado(evento.target.value)
    }
    return (
        <CampoTextoContainer>
            <CampoTituloTexto>
                {label}
            </CampoTituloTexto>
            <CampoTextoInput
                type={tipo}
                value={valor}
                onChange={aoDigitado}
                required={obrigatorio}
                placeholder= {placeholder}
                erro={erro}
            />
            {erro && <MensagemErro>{erro}</MensagemErro>}
        </CampoTextoContainer>
    )
}

export default CampoTexto;