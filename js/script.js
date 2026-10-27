function crearElemento(tag) {
    let nodo = document.createElement(tag);
    return nodo;
}

function crearNodoConTexto(tag, texto) {
    let nodo = crearElemento(tag);
    nodo.textContent = texto;
    return nodo;
}

function adicionarElementoABody(elemento) {
    document.body.appendChild(elemento);
}

function adicionarElementoAContenedor(elemento, contenedor) {
    contenedor.appendChild(elemento);
}

function crearImagen(src, alt) {
    let nodo = crearElemento('img');
    nodo.src = src;
    nodo.alt = alt;
    return nodo;
}