
import axios from "axios";

const autenticaAPI = axios.create({baseURL: 'http://localhost:8000/entrar'});
const cadastroAPI = axios.create({baseURL: 'http://localhost:8000/cadastrarusuario'});

async function autenticaUsuario(credenciais) {
        try {
            const response = await autenticaAPI.post('/', credenciais);
            console.log('Usuário autenticado com sucesso!');
            return response.data;
        } catch (erro) {
            console.error('Erro na autenticação: ', erro.response?.data || erro.messagem);
            throw erro;
        }
}

async function postUsuario(novoUsuario) {
    try {
        const response = await cadastroAPI.post('/', novoUsuario)
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