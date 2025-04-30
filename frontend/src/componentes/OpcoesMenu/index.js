import { useMemo } from "react";

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
    return useMemo(() => {
        const tipoFuncao = MAPEAMENTO_FUNCOES[funcao] || 'PADRAO';
        return TODAS_AS_OPCOES[tipoFuncao];
    }, [funcao]);
}

export default OpcoesMenu;