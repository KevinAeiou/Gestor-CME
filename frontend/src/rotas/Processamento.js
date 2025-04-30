import styled from 'styled-components';
import Pesquisa from '../componentes/Pesquisa'

const AppContainer = styled.div`
width: 100vw;
height: 100vw;
background-image: linear-gradient(90deg, #fff, #ff6616 165%);
`

function Processamento() {
  return (
    <AppContainer>
      <Pesquisa/>
    </AppContainer>
  );
}

export default Processamento;