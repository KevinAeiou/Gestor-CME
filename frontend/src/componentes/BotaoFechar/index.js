import styled from "styled-components";

const BotaoFechar = styled.button`
    background: none;
    border: none;
    color: ${props => props.cor || 'white'};
    font-size: 1.5rem;
    cursor: pointer;
`

export default BotaoFechar;