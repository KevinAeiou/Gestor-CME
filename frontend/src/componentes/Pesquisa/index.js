import styled from 'styled-components';
import Input from '../Input'
import { useEffect, useState } from 'react';
import { getMateriais } from '../../servicos/materiais';
import Etapa from '../Etapa';
import RelatorioDropDrown from '../RelatorioDropDown';
import normalizarTexto from '../../utilitarios/stringUtils';

const PesquisaContainer = styled.section`
    background-color: #ff6616;
    color: #FFF;
    text-align: center;
    padding: 85px 0;
    height: 270px;
    width: 100%;
`
const Titulo = styled.h2`
    color: #FFF;
    font-size: 36px;
    text-align: center;
    width: 100%;
`
const SubTitulo = styled.h3`
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 40px;
`

function Pesquisa() {
    const etapas = [
        {
          nome: 'Recebimento',
          corPrimaria: '#82CFFA',
          corSecundaria: '#E8F8FF'
        },
        {
            nome: 'Lavagem',
            corPrimaria: '#A6D157',
            corSecundaria: '#F0F8E2'
        },
        {
            nome: 'Esterilizacao',
            corPrimaria: '#E06B69',
            corSecundaria: '#FDE7E8'
        },
        {
          nome: 'Distribuicao',
          corPrimaria: '#82CFFA',
          corSecundaria: '#E8F8FF'
        },
    ]
    const funcao = localStorage.getItem('user_funcao')
    const funcaoNormalizada = funcao ? normalizarTexto(funcao) : '';
    const [materiais_pesquisados, setMateriaisPesquisados] = useState([])
    const [materiais_API, setMateriaisAPI] = useState([])
    const [etapas_API, setEtapasAPI] = useState([])
    const [textoBusca, setTextoBusca] = useState('')
    useEffect(() => {
        fetchMateriais()
    }, [])

    const mostrarRelatorioDropDown = ['enfermagem', 'administrador'].includes(funcao?.toLowerCase())

    const combinarMateriaisComEtapas = (materiais, etapas) => {
        return materiais.map(material => {
            const etapa_correspondente = etapas.find(
                etapa => etapa.serial === material.serial
            )
            return {
                ...material, 
                etapa: etapa_correspondente ? etapa_correspondente.etapa : 'Etapa não definida'
            }
        })
    }

    function realizarBusca() {
        if (textoBusca.trim() === '') {
            setMateriaisPesquisados(combinarMateriaisComEtapas(materiais_API, etapas_API));
        } else {
            const resultado_pesquisa = materiais_API.filter(material => 
                material.serial.toLowerCase().includes(textoBusca.toLowerCase())
            );
            setMateriaisPesquisados(combinarMateriaisComEtapas(resultado_pesquisa, etapas_API));
        }
    }

    function aoTeclaPrecionada(evento) {
        if (evento.key === 'Enter') {
            realizarBusca()
        }
    }
    
    async function fetchMateriais() {
        const dados_API = await getMateriais()
        setMateriaisAPI(dados_API.materiais)
        setEtapasAPI(dados_API.etapas)
        setMateriaisPesquisados(combinarMateriaisComEtapas(dados_API.materiais, dados_API.etapas))
    }
    const aoListaMaterialModificado = () => {
        fetchMateriais()
    }

    return (
        <PesquisaContainer>
            {mostrarRelatorioDropDown && <RelatorioDropDrown />}
            <Titulo>Buscando um material específico?</Titulo>
            <SubTitulo>Encontre pelo número serial.</SubTitulo>
            <Input 
                placeholder="Nº serial"
                value={textoBusca}
                onChange={(e) => setTextoBusca(e.target.value)}
                onKeyUp={aoTeclaPrecionada}
            />
            {etapas.map(etapa_material => {
                return (
                    <Etapa 
                        key={etapa_material.nome}
                        etapa= {etapa_material}
                        etapas_api= {etapas_API}
                        materiais_pesquisados = {materiais_pesquisados.filter(material => material.etapa === etapa_material.nome)}
                        funcao= {funcaoNormalizada}
                        aoMaterialListaModificado= {aoListaMaterialModificado}
                    />
                )}
            )}
        </PesquisaContainer>
    )

}

export default Pesquisa;