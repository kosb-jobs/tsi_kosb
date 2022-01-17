

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
            <button class="btn" id="finalizar_publicacion">Finalizar la publicación</button>
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
    let btn_fin_pub = document.querySelector("#finalizar_publicacion");
    btn_fin_pub.addEventListener("click",finalizarPublicacion);
    btn_fin_pub.id_pub = id_pub;
    console.log(id_pub);
    btn_fin_pub.largo = cant_trab;
    
}

const finalizarPublicacion = async function(){
    let publicacion = await getPublicacionCodigo(this.id_pub);
    console.log(publicacion.fecha_fin > cargarFechaActual());

    if (publicacion.fecha_fin > cargarFechaActual()){
        Swal.fire({
            title: "No se puede finalizar la publicación antes de la fecha esperada",
            icon: "error",
            text: "Publicación no finalizada",
        });
    }else if(publicacion.fecha_fin == cargarFechaActual() || publicacion.fecha_fin < cargarFechaActual()){
        let publicacion = {};
        publicacion.id = publicacion.id;
        publicacion.estado = 'FPT';
        let cambio_estado_respuesta = await cambiarEstadoPublic(publicacion);

        let respuesta = await cambiarEstadoPublic(publicacion);
        console.log(respuesta);
        if (respuesta == 'Proceso de trabajo finalizado con exito') {
            await Swal.fire({
                title: "Cambio de estado exitoso",
                icon: "warning",
                text: 'Se ha cambiado el estado de la publicación con éxito',
            });
        }else{
            await Swal.fire({
                title: "Proceso no finalizado",
                icon: "error",
                text: 'Hubo un error externo y no se finalizó el proceso de trabajo',
            });
        }
    }
}

const cargarFechaActual = ()=>{
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
  
    if (dd < 10) {
      dd = '0' + dd;
    }
  
    if (mm < 10) {
      mm = '0' + mm;
    }
  
    today = yyyy + '-' + mm + '-' + dd ;
    return today;
}

const evaluarTrabajador = async function(){  
    let contenido_pub = document.querySelector('#contenido-de-publicacion');
    let id_pub = this.id_pub;
    let trabajadores = await getPostulAceptadasPorPublicacion(id_pub);
    let cantidad = this.largo;   

    console.log(trabajadores);
    console.log(cantidad);
    let tabla = document.querySelector("#tabla_trabajadores");
    tabla.classList.remove("d-none");
    contenido_pub.classList.add("d-none");
//     let html = `   
//     <div class="tabla_trabajadores" id="tabla_trabajadores">
//        <table class="tabla_puntuacion" id="tabla_puntuacion">
//            <thead>
//                <tr>
//                    <td>ID</td>
//                    <td>Nombre</td>
//                    <td>Correo</td>
//                    <td>Puntuaciones</td>
//                    <td>Acciones</td>                   
//                </tr>
//            </thead>
//            <tbody> 

//            </tbody>
//        </table>
//    </div>
//     ` 
    // contenido_pub.innerHTML=html;
    let tbody = document.querySelector("#tabla_puntuacion");

    trabajadores.forEach(async u => {
        let usuario = u.cod_usuario;
        let datos = await getDatosCompletosPorUser(usuario); 
        let tr = document.createElement('tr');
        let td_usuario = document.createElement('td');
        td_usuario.textContent = usuario;
        let td_nombre = document.createElement('td');
        td_nombre.textContent = datos.name;        
        let td_correo = document.createElement('td');
        td_correo.textContent = datos.email; 
        let td_puntuacion= document.createElement('td');
        td_puntuacion.textContent = datos.puntuacion_trabajador;  


           
                    

        /* td_correo = datos.email; */        
        
        let td_acciones = document.createElement('td');
        let span = document.createElement('span');
        span.classList.add("btn_editar_datos"); 
        let btn_evaluar = document.createElement('a');
        btn_evaluar.classList.add("btn");
        
        btn_evaluar.setAttribute('href',"#");
        btn_evaluar.textContent = 'Puntuar';
        btn_evaluar.addEventListener("click",BtnPuntuarUsuario);
        btn_evaluar.cod_usuario = u.cod_usuario;
        btn_evaluar.cod_publicacion = u.cod_publicacion;
        btn_evaluar.cod_postulacion = u.id;;
        span.appendChild(btn_evaluar);              
        
        td_acciones.appendChild(span);
        tr.appendChild(td_usuario);
        tr.appendChild(td_nombre);               
        tr.appendChild(td_correo); 
        tr.appendChild(td_puntuacion);       
        tr.appendChild(td_acciones);        
        tbody.appendChild(tr);
  
    });

    


}

const BtnPuntuarUsuario = async function(){

       
    let cod_usuario=this.cod_usuario;
    let cod_publicacion = this.cod_publicacion;
    let cod_postulacion = this.cod_postulacion;
    let tabla = document.querySelector("#tabla_trabajadores");
    tabla.classList.add("d-none");
    document.querySelector("#puntuar_container").classList.remove("d-none");


    /* ola */

    let opcion5 = document.querySelector('#rate-5');
    let opcion4 = document.querySelector('#rate-4');
    let opcion3 = document.querySelector('#rate-3');
    let opcion2 = document.querySelector('#rate-2');
    let opcion1 = document.querySelector('#rate-1');
    let numero = 0;
   
    
    document.querySelector('#star-widget').addEventListener('change',()=>{
        console.log("ENTRA EN QUERY SELECTOR");
        if (opcion1.checked){
            
            numero = 1;
        }else if(opcion2.checked){
            
            numero = 2;
        }else if(opcion3.checked){
            
            numero = 3;
        }else if(opcion4.checked){
            
            numero = 4;
        }
        else if(opcion5.checked){
            
            numero = 5;
        }else{
            
            numero = 0;
        }  

    });  

    document.querySelector('#btn_crear_puntuacion').addEventListener('click',async function(){

        let respuesta = await getPuntuacionPorPublicacion(cod_publicacion);        

        let validador=0;        
        let input_descr = tinymce.get("descripcion-txt").getContent();
        let puntuacion ={}; 
        puntuacion.id_user=cod_usuario;
        puntuacion.id_publicaciones=cod_publicacion;
        puntuacion.id_postulaciones=cod_postulacion;
        puntuacion.puntuacion=numero;
        puntuacion.comentario=input_descr; 
        
        respuesta.forEach(async u => {
            if (u.id_user==cod_usuario){
                validador=1;
            }

        });

        if (numero==0 || input_descr==" " || input_descr=="" ||input_descr==null ){
            await Swal.fire({
                title: "Error al Puntuar",
                icon: "error",
                text: "Debe Ingresar Los Datos Superiores ¡Las Estrellas!",
            });
            
        }else{
            if (respuesta !=false && validador==1) {
                await Swal.fire({
                    title: "Error al Puntuar",
                    icon: "error",
                    text: "Puntuacion Ya Asignada ¡Genial!",
                });

            }else{
                let resp = await Swal.fire({title:"Puntuacion A Asignar", text:`Se va a puntuar al usuario con ${numero} estrellas`, icon:"question", showCancelButton:true});
                if(resp.isConfirmed){
                    if (await crearPuntuacion(puntuacion) != false){
                        
                        Swal.fire("Usuario Puntuado","Se han dado las estrellas exitosamente", "info");
                        /*AQUI SE ACTUALIZARA PUNTUACION DE UNA PUBLICACION*/
                        let puntuaciones_user=await getPuntuacionPorUsuario(cod_usuario); /*Todas las puntuaciones del usuario*/        
                        console.log("SOY EL PUNTUACIONES USER LARGO");                                        
                        let puntuacion_total = puntuaciones_user.length;   /*Se guarda el largo*/
                        console.log(puntuacion_total); 
                        console.log("DATOS EDL TRABAJADOR"); 
                        let trabajador_datos = await getPuntuacionTrabajador(cod_usuario); 
                        console.log(trabajador_datos);   
                        console.log("PUNTUACION ACTUAL");
                        let puntuacion_actual = trabajador_datos.puntuacion_trabajador;
                        console.log(puntuacion_actual);

                        let nueva_puntuacion = (puntuacion_actual+numero)/puntuacion_total;
                        console.log("SOY EL TOTAL DE LA NUEVA PUNTUACION");
                        console.log(nueva_puntuacion);



                        /*Actualiza la puntuacion*/
                        let obj_puntuacion ={};
                        obj_puntuacion.cod_usuario=cod_usuario;
                        obj_puntuacion.puntuacion=nueva_puntuacion;
                        await actualizarPuntuacionTrabajador(obj_puntuacion);
                        
                        
                    }else{
                        Swal.fire("UPS!, Error", "No se pudo atender la solicitud", "error");
                        
                    }
                }

            }
                          
  
        }    


        

    });


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
    tinymce.init({
        selector: '#descripcion-txt',
        height: "150",
        width : "640",
        menubar: false,
        language: 'es',
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar: 'undo redo | formatselect | ' +
        'bold italic backcolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      });
    
});