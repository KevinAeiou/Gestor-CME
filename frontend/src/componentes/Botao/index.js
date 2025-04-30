import styled from "styled-components";
import { FaEdit } from 'react-icons/fa';

const BotaoBase = styled.button`
    position: relative;
    background: #ff6616;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px 24px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.2s ease;
    overflow: hidden;
    width: ${props => props.$fullWidth ? '100%' : 'auto'};
    min-width: 120px;

    &:hover {
        background: #e55b14;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(255, 102, 22, 0.3);
    }

    &:active {
        transform: translateY(0);
        box-shadow: 0 2px 4px rgba(255, 102, 22, 0.3);
    }

    &:disabled {
        background: #ccc;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.1);
        opacity: 0;
        transition: opacity 0.2s;
    }

    &:hover::after {
        opacity: 1;
    }
`
const Icone = styled.span`
    display: flex;
    align-items: center;
    font-size: 0.9em;
`

function Botao({ onClick, children, icone: IconeComponent = FaEdit, fullWidth = true, disabled = false }) {
    return (
        <BotaoBase 
            onClick= {onClick}
            $fullWidth= {fullWidth}  
            disabled= {disabled}
        >
            {IconeComponent && <Icone><IconeComponent /></Icone>}
            {children}
        </BotaoBase>
    )
}

export default Botao;