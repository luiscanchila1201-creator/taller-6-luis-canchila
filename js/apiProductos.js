const urlAPI = 'https://dummyjson.com/products';

function extraerProductos() {
    console.info("Consultando API de productos: " + urlAPI);
    fetch(urlAPI)
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error("Error al conectar con la API de productos.");
            }
            return respuesta.json();
        })
        .then(respuestaJSON => {
            // Se eliminan los últimos 10 productos usando slice(0, -10)
            let productosFiltrados = respuestaJSON.products.slice(0, -10);
            mostrarProductos(productosFiltrados);
        })
        .catch(error => {
            console.error("Error:", error);
            const contenedor = document.getElementById("gridContainer");
            contenedor.innerHTML = '<p class="errorMensaje">No se pudieron cargar los productos. Intente más tarde.</p>';
        });
}

function mostrarProductos(productos) {
    const divPadre = document.getElementById("gridContainer");
    divPadre.innerHTML = "";

    if (!productos || productos.length === 0) {
        divPadre.innerHTML = '<p class="errorMensaje">No hay productos disponibles.</p>';
        return;
    }

    productos.forEach(producto => {
        let divProducto = crearDivProducto(producto);
        adicionarElementoAContenedor(divProducto, divPadre);
    });
}

function crearDivProducto(producto) {
    let div = crearElemento('div');
    div.classList.add('colorDivHijo');

    // Imagen
    let imagenProducto = crearImagen(producto.thumbnail, producto.title);
    imagenProducto.classList.add('imagenProducto');
    adicionarElementoAContenedor(imagenProducto, div);

    // Contenedor de información interna
    let infoContainer = crearElemento('div');
    infoContainer.classList.add('infoProductoContainer');

    // Categoría
    let pCategoria = crearNodoConTexto('p', producto.category);
    pCategoria.classList.add('categoriaTexto');
    adicionarElementoAContenedor(pCategoria, infoContainer);

    // Nombre
    let pNombre = crearNodoConTexto('p', producto.title);
    pNombre.classList.add('colorLetraTitulo');
    adicionarElementoAContenedor(pNombre, infoContainer);

    // Precio y Calificación
    let divPrecioCalificacion = crearElemento('div');
    divPrecioCalificacion.classList.add('precioYCalificacion');

    let pPrecio = crearNodoConTexto('p', `$${producto.price.toFixed(2)}`);
    pPrecio.classList.add('precioTexto');
    adicionarElementoAContenedor(pPrecio, divPrecioCalificacion);

    let pCalificacion = crearNodoConTexto('p', `★ ${producto.rating}`);
    pCalificacion.classList.add('calificacionTexto');
    adicionarElementoAContenedor(pCalificacion, divPrecioCalificacion);

    adicionarElementoAContenedor(divPrecioCalificacion, infoContainer);

    // Stock
    let pStock = crearNodoConTexto('p', `Stock: ${producto.stock}`);
    pStock.classList.add('stockTexto');
    adicionarElementoAContenedor(pStock, infoContainer);

    // Botón Ver producto (Envío parámetro GET)
    let botonVer = crearNodoConTexto('button', 'Ver producto');
    botonVer.classList.add('botonVerProducto');
    botonVer.addEventListener('click', function() {
        window.location.href = `producto.html?id=${producto.id}`;
    });
    adicionarElementoAContenedor(botonVer, infoContainer);

    adicionarElementoAContenedor(infoContainer, div);

    return div;
}

function extraerDatosProducto(idProducto) {
    let endPoint = `${urlAPI}/${idProducto}`;
    console.info("Consultando detalle de producto: " + endPoint);

    fetch(endPoint)
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error("Producto no encontrado o identificador inválido.");
            }
            return respuesta.json();
        })
        .then(productoJSON => {
            mostrarDatosProducto(productoJSON);
        })
        .catch(error => {
            console.error("Error:", error);
            const contenedor = document.getElementById("detalleCard");
            contenedor.innerHTML = '<p class="errorMensaje">El producto solicitado no existe o hubo un error al cargar su información.</p>';
        });
}

function mostrarDatosProducto(producto) {
    const contenedorDetalle = document.getElementById("detalleCard");
    contenedorDetalle.innerHTML = "";

    // Contenedor imagen grande
    let divImagenContainer = crearElemento('div');
    divImagenContainer.classList.add('detalleImagenContainer');

    let imgGrande = crearImagen(producto.thumbnail, producto.title);
    imgGrande.classList.add('detalleImagenGrande');
    adicionarElementoAContenedor(imgGrande, divImagenContainer);
    adicionarElementoAContenedor(divImagenContainer, contenedorDetalle);

    // Contenedor texto detallado
    let divInfoContainer = crearElemento('div');
    divInfoContainer.classList.add('detalleInfoContainer');

    // Categoría
    let pCategoria = crearNodoConTexto('p', producto.category);
    pCategoria.classList.add('detalleCategoria');
    adicionarElementoAContenedor(pCategoria, divInfoContainer);

    // Título
    let h2Titulo = crearNodoConTexto('h2', producto.title);
    h2Titulo.classList.add('detalleTitulo');
    adicionarElementoAContenedor(h2Titulo, divInfoContainer);

    // Precio
    let pPrecio = crearNodoConTexto('p', `$${producto.price.toFixed(2)}`);
    pPrecio.classList.add('detallePrecio');
    adicionarElementoAContenedor(pPrecio, divInfoContainer);

    // Descripción
    let pDescripcion = crearNodoConTexto('p', producto.description);
    pDescripcion.classList.add('detalleDescripcion');
    adicionarElementoAContenedor(pDescripcion, divInfoContainer);

    // Grid de atributos (Calificación, Stock, Marca, Descuento)
    let gridCajas = crearElemento('div');
    gridCajas.classList.add('detalleGridCajas');

    let cajaCalificacion = crearCajaAtributo("Calificación", `★ ${producto.rating}`);
    adicionarElementoAContenedor(cajaCalificacion, gridCajas);

    let cajaStock = crearCajaAtributo("Stock", producto.stock);
    adicionarElementoAContenedor(cajaStock, gridCajas);

    let cajaMarca = crearCajaAtributo("Marca", producto.brand ? producto.brand : "Genérica");
    adicionarElementoAContenedor(cajaMarca, gridCajas);

    let cajaDescuento = crearCajaAtributo("Descuento", `${producto.discountPercentage}%`);
    adicionarElementoAContenedor(cajaDescuento, gridCajas);

    adicionarElementoAContenedor(gridCajas, divInfoContainer);
    adicionarElementoAContenedor(divInfoContainer, contenedorDetalle);
}

function crearCajaAtributo(titulo, valor) {
    let caja = crearElemento('div');
    caja.classList.add('cajaAtributo');

    let pTitulo = crearNodoConTexto('p', titulo);
    pTitulo.classList.add('cajaAtributoTitulo');
    adicionarElementoAContenedor(pTitulo, caja);

    let pValor = crearNodoConTexto('p', valor);
    pValor.classList.add('cajaAtributoValor');
    adicionarElementoAContenedor(pValor, caja);

    return caja;
}