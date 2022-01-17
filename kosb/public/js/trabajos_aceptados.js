tinymce.init({
    selector: '#descripcion-txt',
    language: 'es',
    height: 200,
    menubar: false,
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
  
let id_publicacion = null;
let id_usuario_creador = null;
let id_post = null;
const cargar_postulacion = async function(){
    let id_post_ = this.idPost;
    let post = await getPostulacionInfoCompleta(id_post_);
    
    let string = String(post['publicacion'].descripcion);
    
    
    let descripcion = string.substring(3,string.length-4);
    let sexo_user = post["usuario_creador"].sexo;
    if(post["usuario_creador"].sexo == "F"){
        sexo_user = "Femenino";
    }else if(post["usuario_creador"].sexo == "M"){
        sexo_user = "Masculino";
    }else if(post["usuario_creador"].sexo == null){
        sexo_user = "No asignado";
    }else{
        sexo_user = "Otro";
    }

    let tipo_oferta;
    if(post["publicacion"].tipo_oferta == "C"){
        tipo_oferta = "Corto plazo";
    }else if(post["usuario_creador"].sexo == "E"){
        tipo_oferta = "Esporádico";
    }else if(post["usuario_creador"].sexo == "L"){
        tipo_oferta = "Largo plazo";
    }else{
        tipo_oferta = "No asignado";
    }

    let contenido_pub = document.querySelector('#contenido-de-publicacion');
    //contenido_pub.innerText = pub.id;
    let elemento = `
    <div class="text-end mb-3">
        <button class="btn btn-info text-sm" id="evaluar_ofertante">Evaluar Al Ofertante</button>
    </div>

    
<div class="card">
    <div class="card-header">
        <code>Código de la postulación: ${post["postulacion"].id}</code>
    </div>
    <div class="card-body">
        <div class="row">
            <div class="col-12 col-md-6 col-lg-6">
                <p class="text-sm">Publicación</p></br>
            </div>
            <div class="col-12 col-md col-lg ms-5"><p class="text-sm">Usuario Ofertante</p></div>
            <div class="col-12 col-md-6 col-lg-6 border border-secondary pt-3 pb-3 ps-3 ms-2 me-5" style="border-radius: 5px">
                <h5 class="card-title mb-4">${post["publicacion"].titulo_publicacion}</h5>
                <p class="">Fechas: desde ${post["publicacion"].fecha_ini} hasta ${post["publicacion"].fecha_fin}</p>
                <p >Descripción: ${descripcion}</p>
                <p class="">Tipo de Oferta: ${tipo_oferta}</p>
            </div>
            
            <div class="col-12 col-md col-lg border border-secondary p-3" style="border-radius: 5px">
                <h5 class="card-title mb-4">Nombre: ${post["usuario_creador"].name} ${post["usuario_creador"].apellido == null? "": post["usuario_creador"].apellido}</h5>
                <p class="">Correo: ${post["usuario_creador"].email}</p>
                <p >Sexo: ${sexo_user}</p>
            </div>
            
        </div>
    </div>
</div>
`;
    contenido_pub.innerHTML = elemento;
    let btn_evaluar = document.querySelector("#evaluar_ofertante");
    btn_evaluar.addEventListener("click", evaluarTrabajador);
    id_usuario_creador = post["usuario_creador"].id;
    id_post = post["postulacion"].id;
    id_publicacion = post["publicacion"].id;
    //btn_evaluar.largo = cant_trab;
    
    
}

const evaluarTrabajador = async function(){    

    let tabla = document.querySelector("#contenido-de-publicacion");
    tabla.classList.add("d-none");
    document.querySelector("#puntuar_container").classList.remove("d-none");
      

        let opcion5 = document.querySelector('#rate-5');
        let opcion4 = document.querySelector('#rate-4');
        let opcion3 = document.querySelector('#rate-3');
        let opcion2 = document.querySelector('#rate-2');
        let opcion1 = document.querySelector('#rate-1');
        let numero = 0;


        document.querySelector('#star-widget').addEventListener('change',()=>{
            console.log("ENTRA EN QUERY SELECTOR");
            if (opcion1.checked){
                console.log('La opcion seleccionada es 1');
                numero = 1;
            }else if(opcion2.checked){
                console.log('La opcion seleccionada es 2');
                numero = 2;
            }else if(opcion3.checked){
                console.log('La opcion seleccionada es 3');
                numero = 3;
            }else if(opcion4.checked){
                console.log('La opcion seleccionada es 4');
                numero = 4;
            }
            else if(opcion5.checked){
                console.log('La opcion seleccionada es 5');
                numero = 5;
            }else{
                console.log('No se ha seleccionado nada');
                numero = 0;
            }  

        });  

        document.querySelector('#btn_crear_puntuacion').addEventListener('click',async function(){
            let validador=0;  
            let respuesta = await getPuntuacionPorPublicacion(id_publicacion);
            console.log("HolaSoyLaRespuesta");
            console.log(respuesta);
            let input_descr = tinymce.get("descripcion-txt").getContent();
            let puntuacion ={}; 
            puntuacion.id_user=id_usuario_creador;
            puntuacion.id_publicaciones=id_publicacion;
            puntuacion.id_postulaciones=id_post;
            puntuacion.puntuacion=numero;
            puntuacion.comentario=input_descr; 
            console.log(puntuacion);

            respuesta.forEach(async u => {
                if (u.id_user==id_usuario_creador && u.id_postulaciones==id_post){
                    validador=1;
                    console.log(u.id_user);
                    console.log(id_usuario_creador);
                    console.log(u.id_postulaciones);
                    console.log(id_post);

                }
    
            });
    
            if (numero==0){
                await Swal.fire({
                    title: "Error al Puntuar",
                    icon: "warning",
                    text: "Debe Ingresar Los Datos Superiores ¡Las Estrellas!",
                });
                
            }else if(input_descr==" " || input_descr=="" ||input_descr==null){
                await Swal.fire({
                    title: "Error al Puntuar",
                    icon: "warning",
                    text: "Debe Ingresar una descripción",
                });
            }else{
                if (respuesta !=false && validador==1) {
                    await Swal.fire({
                        title: "Error al Puntuar",
                        icon: "error",
                        text: "Puntuación Ya Asignada ¡Genial!",
                    });
    
                }else{
                    let resp = await Swal.fire({title:"Puntuación A Asignar", text:`Se va a puntuar al usuario con ${numero} estrellas`, icon:"question", showCancelButton:true});
                    if(resp.isConfirmed){
                        if (await crearPuntuacion(puntuacion) != false){
                            
                            Swal.fire("Usuario Puntuado","Se han dado las estrellas exitosamente", "info");
                            location.reload();

                            /* EDITAR OFERTANTE*/

                            let puntuaciones_user=await getPuntuacionPorUsuario(id_usuario_creador);
                            console.log("SOY EL PUNTUACIONES USER LARGO");                                        
                            let puntuacion_total = puntuaciones_user.length;   /*Se guarda el largo*/
                            console.log(puntuacion_total); 
                            console.log("DATOS EDL TRABAJADOR"); 
                            let ofertante_datos = await getPuntuacionOfertante(id_usuario_creador); 
                            console.log(ofertante_datos);   
                            console.log("PUNTUACION ACTUAL");
                            let puntuacion_actual = ofertante_datos.puntuacion_ofertante;
                            console.log(puntuacion_actual);

                            let nueva_puntuacion = (puntuacion_actual+numero)/puntuacion_total;
                            console.log("SOY EL TOTAL DE LA NUEVA PUNTUACION");
                            console.log(nueva_puntuacion);

                             /*Actualiza la puntuacion*/
                            let obj_puntuacion ={};
                            obj_puntuacion.cod_usuario=id_usuario_creador;
                            obj_puntuacion.puntuacion=nueva_puntuacion;
                            console.log(obj_puntuacion);
                            await actualizarPuntuacionOfertante(obj_puntuacion);
                            
                            
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


const cargar_lista_post = (publicaciones)=>{

    let lista_group = document.querySelector('#lista-publicaciones');
    lista_group.innerHTML = "";
    for (let i = 0; i < publicaciones.length; i++) {
        let p = publicaciones[i];
        let boton = document.createElement('button');
        boton.classList.add("list-group-item","list-group-item-action");
        boton.textContent = "Código de postulación ~ " + p.id ;
        boton.idPost = p.id;
        boton.addEventListener('click',cargar_postulacion);
        lista_group.appendChild(boton);
    }
}

const cargar_lista_vacia = ()=>{
    let lista_group = document.querySelector('#lista-publicaciones');
    let elemento = `
<div class="card text-center">
    <div class="card-body">
        <h5 class="card-title">No Tienes Postulaciones en proceso de trabajo o Aceptadas</h5>
        <h6 class="card-subtitle mb-2 text-muted">🧐👌</h6>
        <p class="card-text">Si tienes postulaciones a publicaciones puedes esperar a que las acepten, o también puedes seguir postulando a otras publicaciones</p>
        <a href="buscar_trabajo" class="card-link">Ir a buscar trabajo</a>
    </div>
</div>
`;
    lista_group.innerHTML = elemento;
}

//Boton Evaluar Usuario



document.addEventListener('DOMContentLoaded',async()=>{
    let id_usuario = document.querySelector('#id_usuario').name;
    let postulaciones = await getPostulacionesAceptUser(id_usuario);
    let contenido_pub = document.querySelector('#contenido-de-publicacion');
    if(postulaciones.length == 0){
        cargar_lista_vacia();
        contenido_pub.innerHTML = `<code class="">No Tienes postulaciones aceptadas</code>`;
        Swal.fire({
            title: "No tienes postulaciones aceptadas",
            icon: "info",
            text: "Postula a un trabajo o espera a que una postulación tuya sea aceptada"
        });
    }else{
        contenido_pub.innerHTML = `<code class="">Seleccione una postulación</code>`;
        cargar_lista_post(postulaciones);
    }
});