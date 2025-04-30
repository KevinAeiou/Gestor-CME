import styled from "styled-components";
import { FaChevronDown } from 'react-icons/fa';

const ListaSuspensaContainer = styled.div`
    margin: 20px 0;
    width: 100%;
`
const ListaSuspensaLabel = styled.label`
    display: block;
    color: #666;
    margin-bottom: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`
const ListaSuspensaSelect = styled.select`
    width: 100%;
    padding: 12px 16px;
    padding-right: 40px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: white;
    font-size: 1rem;
    color: #333;
    appearance: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    
    &:focus {
        outline: none;
        border-color: #ff6616;
        box-shadow: 0 0 0 2px rgba(255, 102, 22, 0.2);
    }
`
const SelectWrapper = styled.div`
    position: relative;
    width: 100%;
`
const DropdownIcon = styled.span`
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: #666;
`

function ListaSuspensa({ titulo, obrigatorio, valor, itens, corLabel, aoAlterado}) {
    return (
        <ListaSuspensaContainer>
            <ListaSuspensaLabel corLabel= {corLabel} >{titulo}</ListaSuspensaLabel>
            <SelectWrapper>
                <ListaSuspensaSelect 
                    required={obrigatorio}
                    onChange={evento => aoAlterado(evento.target.value)}
                    value={valor}
                >
                    {itens.map(item => (
                        <option key={item}>
                            {item}
                        </option>
                    ))}
                </ListaSuspensaSelect>
                <DropdownIcon>
                    <FaChevronDown />
                </DropdownIcon>
            </SelectWrapper>
        </ListaSuspensaContainer>
    )
}

export default ListaSuspensa;