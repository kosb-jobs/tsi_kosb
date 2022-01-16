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
            <button class="btn btn-info" id="evaluar_trabajador">Evaluar Trabajador(es)</button>
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
    let btn_evaluar=document.querySelector("#evaluar_trabajador");
    btn_evaluar.addEventListener("click",evaluarTrabajador);
    btn_evaluar.id_pub=id_pub;
    btn_evaluar.largo = cant_trab;
    
    
}

const evaluarTrabajador = async function(){    
    let id_pub = this.id_pub;
    let trabajadores = await getPostulAceptadasPorPublicacion(id_pub);
    let cantidad = this.largo;
    console.log(trabajadores);
    console.log(cantidad);
    
    for (let i=0; i < cantidad; i++){
        console.log(trabajadores[i]);
        let usuario = trabajadores[i].cod_usuario;
        let datos = await getDatosCompletosPorUser(usuario);
        await Swal.fire({
            title: `Evaluando Trabajador`,
            html: ` 
            <table>
                <tr>
                    <td><a style="font-size: 1.5em; padding-right: 2px ;"><b><ion-icon name="person-circle-outline"></ion-icon></b></a></td>
                </tr>
                <tr>
                    <td id="alertas"><a><b>Nombre: </b>${datos.name} ${datos.apellido}</a></td>
                </tr>
                
                <tr>
                    <td><a style="font-size: 1.5em; padding-right: 2px ;"><b><ion-icon name="mail-outline"></ion-icon></b></a></td>
                </tr>
                <tr>
                    <td><a><b>Email: </b>${datos.email} </a></td>
                </tr>
        
                <tr>
                    <td><a style="font-size: 1.5em; padding-right: 2px ;"><ion-icon name="star-half-outline"></ion-icon></b></a></td>
                </tr>
                <tr>
                    <td><a><b>Puntuación Total Ofertante: </b> ${datos.puntuacion_trabajador}</a></td>
                </tr>    

                <tr>
                    <td>
                    <div class="container_star" >
                        <div class="star-widget" id="star-widget">

                            <input type="radio" name="rate" id="rate-5">
                            <label for="rate-5" class="fas fa-star"></label>

                            <input type="radio" name="rate" id="rate-4">
                            <label for="rate-4" class="fas fa-star"></label>

                            <input type="radio" name="rate" id="rate-3">
                            <label for="rate-3" class="fas fa-star"></label>

                            <input type="radio" name="rate" id="rate-2">
                            <label for="rate-2" class="fas fa-star"></label>

                            <input type="radio" name="rate" id="rate-1">
                            <label for="rate-1" class="fas fa-star"></label>

                        </div>
                    </div>
                    </td>
                </tr>
            


            
            
            </table>
        
            `,
            confirmButtonText: "Evaluar",
            width: 600,
            
            padding: '1em',
            color: '#5089C3',
            
            backdrop: `
            rgba(0,0,123,0.4)                            
            left top
            no-repeat
            `
        }) .then  
        let opcion5 = document.querySelector('#rate-5');
        let opcion4 = document.querySelector('#rate-4');
        let opcion3 = document.querySelector('#rate-3');
        let opcion2 = document.querySelector('#rate-2');
        let opcion1 = document.querySelector('#rate-1');
        
        document.querySelector('#star-widget').addEventListener('change',()=>{
            if (opcion1.checked){
                console.log('La opcion seleccionada es 1');
            }else if(opcion2.checked){
                console.log('La opcion seleccionada es 2');
            }else if(opcion3.checked){
                console.log('La opcion seleccionada es 3');
            }else if(opcion4.checked){
                console.log('La opcion seleccionada es 4');
            }
            else if(opcion5.checked){
                console.log('La opcion seleccionada es 5');
            }else{
                console.log('No se ha seleccionado nada');
            }
        })
    }
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
        <h5 class="card-title">No Tienes Publicaciones en proceso de trabajo</h5>
        <h6 class="card-subtitle mb-2 text-muted">🧐👌</h6>
        <p class="card-text">Si tienes publicaciones que tienen postulantes aceptados debes finalizar el proceso de postulación para poder verlas en esta página</p>
        <a href="perfil#postulaciones-mis-publicaciones" class="card-link">Ir a Crear Publicación</a>
    </div>
</div>
`;
    lista_group.innerHTML = elemento;
}

//Boton Evaluar Usuario



document.addEventListener('DOMContentLoaded',async()=>{
    let id_usuario = document.querySelector('#id_usuario').name;
    let publicaciones = await getPublicacionCodAcep(id_usuario);
    let contenido_pub = document.querySelector('#contenido-de-publicacion');
    if(publicaciones.length == 0){
        cargar_lista_vacia();
        contenido_pub.innerHTML = `<code class="">No tienes Publicaciones</code>`;
        Swal.fire({
            title: "No tienes publicaciones en proceso",
            icon: "info",
            text: "Puedes esperar a que personas postulen a tu publicación o puedes crear una publicación nueva"
        });
    }else{
        contenido_pub.innerHTML = `<code class="">Seleccione una publicación</code>`;
        cargar_lista_pub(publicaciones);
    }
});