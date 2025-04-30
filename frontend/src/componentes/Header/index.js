import { Link } from 'react-router-dom'
import Logo from '../Logo'
import OpcoesHeader from '../OpcoesHeader'
import styled from 'styled-components'

const HeaderContainer = styled.header`
    background-color: #FFF;
    display: flex;
    justify-content: center;
`
const OpcaoLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0 15px;
`

function Header() {
    return (
        <HeaderContainer>
            <OpcaoLink to={'/'}>
                <Logo/>
            </OpcaoLink>
            <OpcoesHeader />
        </HeaderContainer>
    )
}

export default Header;