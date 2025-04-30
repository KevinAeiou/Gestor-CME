
import axios from "axios";

const baseURL = window.location.hostname === 'localhost' 
  ? 'http://localhost:8000' 
  : process.env.REACT_APP_API_URL;

const autenticaAPI = axios.create({ baseURL : baseURL });
const cadastroAPI = axios.create({ baseURL: baseURL });

async function autenticaUsuario(credenciais) {
        try {
            const response = await autenticaAPI.post('/entrar/', credenciais);
            console.log('Usuário autenticado com sucesso!');
            return response.data;
        } catch (erro) {
            console.error('Erro na autenticação: ', erro.response?.data || erro.messagem);
            throw erro;
        }
}

async function postUsuario(novoUsuario) {
    try {
        const response = await cadastroAPI.post('/cadastrarusuario/', novoUsuario)
        console.log('Usuário cadastrado com sucesso!')
        return response.data
    } catch (erro){
        throw erro;
    }
    
}

export {
    autenticaUsuario,
    postUsuario,
}