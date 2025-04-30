import styled from 'styled-components';
import Inicio from '../componentes/Home';

const AppContainer = styled.div`
width: 100vw;
height: 100vw;
background-image: linear-gradient(90deg, #fff, #ff6616 165%);
`

function Home() {
  return (
    <AppContainer>
      <Inicio />
    </AppContainer>
  );
}

export default Home;