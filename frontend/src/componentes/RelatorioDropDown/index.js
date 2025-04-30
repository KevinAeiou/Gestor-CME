import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { gerarRelatorio } from '../../servicos/materiais';
import { FaFilePdf, FaFileExcel } from 'react-icons/fa';
import { saveAs } from 'file-saver';


const RelatorioButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    background: #fff;
    color: #ff6616;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: bold;
    transition: all 0.3s ease;

    &:hover {
        background: #f0f0f0;
    }
`
const DropdownWrapper = styled.div`
    position: absolute;
    top: 100px;
    right: 60px;
    z-index: 100;
`

const DropdownMenu = styled.div`
    position: absolute;
    display: ${props => props.open ? 'block' : 'none'};
    opacity: ${props => props.open ? 1 : 0};
    visibility: ${props => props.open ? 'visible' : 'hidden'};
    transition: opacity 0.3s ease, visibility 0.3s ease;
    top: 100%;
    right: 0;
    background: white;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    z-index: 10;
`
const DropdownItem = styled.div`
    padding: 8px 16px;
    color: #333;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;

    &:hover {
        background: #f5f5f5;
    }
`

function RelatorioDropDrown() {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)
    useEffect(() => {
        const aoClicarFora = (evento) => {
            if (dropdownRef.current && !dropdownRef.current.contains(evento.target)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', aoClicarFora)
        return () => {
            document.removeEventListener('mousedown', aoClicarFora)
        }
    }, [])
    async function aoGerarRelatorio(formato) {
        try {
            const response = await gerarRelatorio(formato)
            const blob = new Blob([response.data], {
                type: formato === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });
            
            const fileName = `relatorio_cme_${new Date().toISOString().split('T')[0]}.${formato}`;
            
            saveAs(blob, fileName);
        } catch (erro) {
            console.error('Erro ao gerar relatório: ', erro)
            alert('Erro ao gerar relatório. Por favor, tente novamente.')
        }
    }
    
    return (
        <DropdownWrapper ref={dropdownRef}>
            <RelatorioButton onClick={() => setDropdownOpen(!dropdownOpen)}>
                Gerar Relatório
                <span>▼</span>
            </RelatorioButton>
            
            <DropdownMenu open= {dropdownOpen}>
                <DropdownItem onClick={() => {
                    aoGerarRelatorio('pdf');
                    setDropdownOpen(false);
                }}>
                    <FaFilePdf /> PDF
                </DropdownItem>
                <DropdownItem onClick={() => {
                    aoGerarRelatorio('xlsx');
                    setDropdownOpen(false);
                }}>
                    <FaFilePdf /> Excel (XLSX)
                </DropdownItem>
            </DropdownMenu>
        </DropdownWrapper>
    )
}

export default RelatorioDropDrown;