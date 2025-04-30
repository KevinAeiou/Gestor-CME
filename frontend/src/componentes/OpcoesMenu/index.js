import { useMemo } from "react";
import normalizarTexto from "../../utilitarios/stringUtils";

function OpcoesMenu() {
    const TODAS_AS_OPCOES = {
        ADMINISTRADOR: ['Cadastrar usuários', 'Cadastrar materiais', 'Processamento', 'Sair'],
        TECNICO: ['Cadastrar materiais', 'Processamento', 'Sair'],
        ENFERMAGEM: ['Processamento', 'Sair'],
        PADRAO: ['Sair']
    };
      
    const MAPEAMENTO_FUNCOES = {
        'Administrador': 'ADMINISTRADOR',
        'Tecnico': 'TECNICO',
        'Enfermagem': 'ENFERMAGEM'
    };
    const funcao = localStorage.getItem('user_funcao')
    const funcaoNormalizada = funcao ? normalizarTexto(funcao) : null;

    return useMemo(() => {
        const tipoFuncao = MAPEAMENTO_FUNCOES[funcaoNormalizada] || 'PADRAO';
        return TODAS_AS_OPCOES[tipoFuncao];
    }, [funcaoNormalizada]);
}

export default OpcoesMenu;