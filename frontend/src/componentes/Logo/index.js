import logo from '../../imagens/logo.svg'
import styled from 'styled-components';

const LogoContainer = styled.div`
    display: flex;
    align-items: center;  /* Alinha itens verticalmente ao centro */
    gap: 10px;            /* Espaço entre os itens */
    font-size: 30px;
    padding: 10px;        /* Espaçamento interno para o hover */
    border-radius: 8px;
    transition: all 0.3s ease;
    &:hover {
      background-color: #f0f0f0;
    }
    &:active {
      transform: scale(0.98);
    }
`
const LogoImagem = styled.img`
  width: 80px;          /* Tamanho consistente para a imagem */
  height: 80px;
  margin-right: 10px;
  src: {logo}
`
const TextoLogo = styled.span`
  font-size: 24px
  font-weight: bold;
  white-space: nowrap;
`

function Logo() {
    return (
        <LogoContainer>
          <LogoImagem 
            src= {logo} 
            alt='Logo'/>
          <TextoLogo>CME</TextoLogo>
        </LogoContainer>
    )
}

export default Logo;