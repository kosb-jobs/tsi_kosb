const cargar_publicacion = async function(){
    let id_pub = this.idPub
    let pub = await getPublicacionCodigo(id_pub);
    let trabajadores = await getPostulAceptadasPorPublicacion(id_pub);//editando esta linea
    let cant_trab = trabajadores.length;
    let contenido_pub = document.querySelector('#contenido-de-publicacion');
    //contenido_pub.innerText = pub.id;
    let elemento = `
<div class="card text-center">
    <div class="card-header">
        <ul class="nav nav-pills card-header-pills">
            <li class="nav-item">
                <a class="nav-link btn" href="#">Dar por finalizada</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Evaluar a trabajador</a>
            </li>
            <li class="nav-item">
                <a class="nav-link disabled">Disabled</a>
            </li>
        </ul>
    </div>
    <div class="card-body">
        <h5 class="card-title">${pub.titulo_publicacion}</h5>
        <span class="text-end">Cantidad de trabajadores: ${cant_trab}</span>
        <p class="card-text">${pub.descripcion}</p>
        
    </div>
</div>
`;
    contenido_pub.innerHTML = elemento;
}
//<a href="#" class="btn btn-primary">Go somewhere</a>

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
    let contenido_pub = document.querySelector('#contenido-de-publicacion');
    if(publicaciones.length == 0){
        console.log('ta en 0 jeje');
        cargar_lista_vacia();
        contenido_pub.innerHTML = `<small class="code">No tienes Publicaciones</small>`;
    }else{
        contenido_pub.innerHTML = `<small class="code">Seleccione una publicación</small>`;
        cargar_lista_pub(publicaciones);
    }
});