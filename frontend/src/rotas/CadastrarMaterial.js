import styled from "styled-components";
import FormularioMaterial from "../componentes/FormularioMaterial";
import { useState } from "react";
import { postMaterial } from "../servicos/materiais";


const AppContainer = styled.div`
    width: 100vw;
    height: 100vw;
    background-image: linear-gradient(90deg, #fff, #ff6616 165%);
`

function CadastrarMaterial() {
    const tipos = [
        'Tesoura cirúrgica',
        'Hemostato',
        'Pinça',
        'Bisturi',
    ]
    const [materiais, setMateriais] = useState([])

    const aoNovoMaterialAdicionado = async (material) => {
        try {
            const { data: novoMaterial } = await postMaterial(material);
            setMateriais([...materiais, novoMaterial])
            alert('Material cadastrado com sucesso!')
        } catch (erro) {
            console.error('Erro: ', erro);
            alert(erro.response?.data?.message || 'Erro ao cadastrar material!')
        }
    }

    return (
        <AppContainer>
            <FormularioMaterial 
                tipos= {tipos} 
                aoMaterialAdicionado= {material => aoNovoMaterialAdicionado(material)}
            />
        </AppContainer>
    );
}

export default CadastrarMaterial;