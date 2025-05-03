import axios from "axios"

const baseURL = window.location.hostname === 'localhost' 
  ? 'http://localhost:8000' 
  : process.env.REACT_APP_API_URL;

const processamentoAPI = axios.create({ baseURL: baseURL })
const cadastroAPI = axios.create({ baseURL: baseURL })

async function getMateriais() {
    try{
        const response = await processamentoAPI.get('/processamento/')
        console.log('Materiais recuperados com sucesso!')
        return response.data
    } catch {
        console.error('Erro ao recuperar materiais!')
        return []
    }
}

async function postMaterial(novoMaterial) {
    try {
        const response = await cadastroAPI.post('/cadastrarmateriais/', novoMaterial);
        console.log('Material cadastrado com sucesso!', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao cadastrar material: ', error.response ?. data || error.message);
        throw error;
    }
}

async function patchMaterial(id, material) {
    try {
        const response = await processamentoAPI.patch(`/processamento/alterar/${id}/`, material)
        console.log('Material atualizado com sucesso: ', response.data)
        return response.data
    } catch (error) {
        console.error('Erro ao atualizar material: ', error.response?.data || error.message);
        throw error;
    }
}

async function deleteMaterial(id) {
    try {
        const response = await processamentoAPI.delete(`/processamento/deletar/${id}/`)
        console.log('Material deletado com sucesso: ', response.data)
        return response.data
    } catch (erro) {
        console.error('Erro ao deletar material: ', erro.response?.data || erro.message)
        throw erro
    }
}
async function gerarRelatorio(formato) {
    try {
        const response = await processamentoAPI.get('/processamento/relatorio/gerar', {
            params: { formato },
            responseType: 'blob'
        })
        return response
    } catch (erro) {
        console.error('Erro ao gerar relatório: ', erro)
        throw erro
    }
}

export {
    getMateriais,
    postMaterial,
    patchMaterial,
    deleteMaterial,
    gerarRelatorio,
}