import styled from "styled-components";

const CampoTextoContainer = styled.div`
    margin: 24px 0;
`
const CampoTextoLabel = styled.label`
    display: block;
    margin-bottom: 8px;
    font-size: 24px;
`
const CampoTextoInput = styled.input`
    background-color: #FFF;
    box-shadow: 2px 2px 10px rgba(0, 0, 0.06);
    width: 100%;
    border: none;
    font-size: 24px;
    padding: 24px;
    box-sizing: border-box;
`
const MensagemErro = styled.span`
    color: red;
    font-size: 16px;
    margin-top: 8px;
    display: block;
`

function CampoTexto({tipo= 'text', obrigatorio= false, label, placeholder, valor, aoAlterado, erro}) {
    const aoDigitado = (evento) => {
        aoAlterado(evento.target.value)
    }
    return (
        <CampoTextoContainer>
            <CampoTextoLabel>
                {label}
            </CampoTextoLabel>
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