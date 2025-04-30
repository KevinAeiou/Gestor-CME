

export const normalizarTexto =(texto) => {
    if (!texto || typeof texto !== 'string') return ''
    return (
        texto.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/ç/g, 'c')
        .replace(/Ç/g, 'C')
    )
}

export default normalizarTexto;