import { Link } from 'react-router-dom'
import styled from 'styled-components'
import OpcoesMenu from '../OpcoesMenu'

const Opcoes = styled.ul`
    display: flex;
`
const Opcao = styled.li`
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height:  100%;
    padding: 0 5px;
    cursor: pointer;
    min-width: 120px;
`
const OpcaoLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 0 15px;
`

function OpcoesHeader() {
    const opcoesCompletas = OpcoesMenu();

    return (
        <Opcoes>
            {opcoesCompletas.map((texto) => (
                <Opcao key={texto}>
                    <OpcaoLink to= {`/${texto.normalize("NFD").replace(/[\u0300-\u036f\s]/g, "").toLocaleLowerCase()}`}>
                        {texto}
                    </OpcaoLink>
                </Opcao>
            ))}
        </Opcoes>
    )
}

export default OpcoesHeader