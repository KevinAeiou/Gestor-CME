import DatePicker from "react-datepicker";
import styled from "styled-components";

const CampoTextoContainer = styled.div`
    margin: 24px 0;

`
const CampoTextoLabel = styled.label`
    display: block;
    margin-bottom: 8px;
    font-size: 24px;
`
function CampoData({ label, data, aoAlterado }) {
    const dataSelecionada = data ? new Date(data) : null;
    const aoDigitado = (date) => {
        aoAlterado(date)
    }
    
    return (
        <CampoTextoContainer>
            <CampoTextoLabel>
                {label}
            </CampoTextoLabel>
            <DatePicker
                selected={dataSelecionada}
                onChange={aoDigitado}
                onSelect={aoDigitado}
                dateFormat="dd/MM/yyyy"
                placeholderText="DD/MM/AAAA"
                required
                showYearDropdown
                dropdownMode="select"
                locale="pt-BR"
            />
        </CampoTextoContainer>
    )
}

export default CampoData;