const cargar_publicacion = async function(){
    let id_pub = this.idPub
    let pub = await getPublicacionCodigo(id_pub);
    let trabajadores = await getPostulAceptadasPorPublicacion(id_pub);//editando esta linea
    pub = await reajusteDeContenidoPubs(pub);
    let cant_trab = trabajadores.length;
    let contenido_pub = document.querySelector('#contenido-de-publicacion');
    //contenido_pub.innerText = pub.id;
    let elemento = `
    <div class="row">
        <div class="col-12 col-md-6 col-lg-6 mb-3">
            <button class="btn">Finalizar la publicación</button>
        </div>
        <div class="col-12 col-md col-lg text-end mb-3">
            <button class="btn btn-info">Evaluar Trabajador(es)</button>
        </div>
    </div>

    
<div class="card">
    <div class="card-header">
        <code>Código de la publicación: ${pub.id}</code>
    </div>
    <div class="card-body">
        <div class="row">
            <div class="col-12 col-md-6 col-lg-6">
                <h5 class="card-title mb-4">${pub.titulo_publicacion}</h5>
                <p class="">Cantidad de trabajadores: ${cant_trab}</p>
                <p class="">Fecha inicio: ${pub.fecha_ini}</p>
                <p class="">Fecha fin: ${pub.fecha_fin}</p>
            </div>
            <div class="col-12 col-md col-lg">
                <p>Zonas: ${pub.cod_zona}</p>
                <p>Rubro: ${pub.cod_rubro}</p>
                <p>Duración: ${pub.cod_duracion}</p>
                <p class="">Tipo de Oferta: ${pub.tipo_oferta}</p>
            </div>
            <p style="color: black" class="ms-2">Descripción ${pub.descripcion}</p>
        </div>
    </div>
</div>
`;
    contenido_pub.innerHTML = elemento;
}

const reajusteDeContenidoPubs = async (publicaciones)=>{
    //INTENTA CAMBIAR EL CONTENIDO DE ALGUNOS ATRIBUTOS DE PUBLICACION
    let zonas = await getZonas();
    let duraciones = await getDuraciones();
    let rubros = await getRubros();
    
    zonas.forEach(z => {
        if(publicaciones.cod_zona == z.id){
            publicaciones.cod_zona = z.nom_zona;
        }
    });
    rubros.forEach(r => {
        if(publicaciones.cod_rubro == r.id){
            publicaciones.cod_rubro = r.nom_rubro;
        }
    });
    duraciones.forEach(d => {
        if(publicaciones.cod_duracion == d.id){
            publicaciones.cod_duracion = d.titulo_duracion;
        }
    });

    return publicaciones;
}
//<a href="#" class="btn btn-primary">Go somewhere</a>
//<li class="nav-item">
//<a class="nav-link disabled">Disabled</a>
//</li>

/*
<ul class="nav nav-pills card-header-pills">
        <div class="row">
            <div class="col-12 col-md-8 col-lg-8">
                <li class="nav-item">
                    <button class="btn">Dar por finalizada</button>
                </li>
            </div>
            <div class="col-12 col-md col-lg">
                <li class="nav-item">
                    <button class="btn btn-info">Evaluar</button>
                </li>
            </div>
        </div>
    </ul> */


const cargar_lista_pub = (publicaciones)=>{

    let lista_group = document.querySelector('#lista-publicaciones');
    lista_group.innerHTML = "";
    for (let i = 0; i < publicaciones.length; i++) {
        let p = publicaciones[i];
        let boton = document.createElement('button');
        boton.classList.add("list-group-item","list-group-item-action");
        boton.textContent = p.id + "  ~  " + p.titulo_publicacion ;
        boton.idPub = p.id;
        boton.addEventListener('click',cargar_publicacion);
        lista_group.appendChild(boton);
    }
}

const cargar_lista_vacia = ()=>{
    let lista_group = document.querySelector('#lista-publicaciones');
    let elemento = `
<div class="card text-center">
    <div class="card-body">
        <h5 class="card-title">No Tienes Publicaciones Creadas</h5>
        <h6 class="card-subtitle mb-2 text-muted">🧐👌</h6>
        <p class="card-text">Puedes crear alguna entrando a Crear Publicación</p>
        <a href="crear_publicacion" class="card-link">Ir a Crear Publicación</a>
    </div>
</div>
`;
    lista_group.innerHTML = elemento;
}


document.addEventListener('DOMContentLoaded',async()=>{
    let id_usuario = document.querySelector('#id_usuario').name;
    let publicaciones = await getPublicacionesUsuario(id_usuario);
    let zonas = await getZonas();
    let duraciones = await getDuraciones();
    let rubros = await getRubros();
    let contenido_pub = document.querySelector('#contenido-de-publicacion');
    if(publicaciones.length == 0){
        cargar_lista_vacia();
        contenido_pub.innerHTML = `<code class="">No tienes Publicaciones</code>`;
    }else{
        contenido_pub.innerHTML = `<code class="">Seleccione una publicación</code>`;
        cargar_lista_pub(publicaciones);
    }
});