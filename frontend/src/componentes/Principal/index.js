import styled from "styled-components";

const PrincipalContainer = styled.main`
    flex: 1;
    padding: 2rem;
`

function Principal(props) {
    return (
        <PrincipalContainer>
            {props.children}
        </PrincipalContainer>
    )
}

export default Principal;